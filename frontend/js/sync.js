const TABLE = "sync_states";
const SALT = "ielts-master-sync-v1";

export async function pushStateToCloud(state) {
  const config = readConfig(state);
  const syncId = await sha256(config.passphrase);
  const encrypted = await encryptJSON(stripLocalSyncSecrets(state), config.passphrase);

  const response = await fetch(`${config.url}/rest/v1/${TABLE}?on_conflict=id`, {
    method: "POST",
    headers: supabaseHeaders(config.key, {
      Prefer: "return=minimal,resolution=merge-duplicates",
    }),
    body: JSON.stringify({
      id: syncId,
      payload: encrypted,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) throw new Error(await response.text());
  return new Date().toISOString();
}

export async function pullStateFromCloud(state) {
  const config = readConfig(state);
  const syncId = await sha256(config.passphrase);
  const response = await fetch(`${config.url}/rest/v1/${TABLE}?id=eq.${syncId}&select=payload,updated_at`, {
    headers: supabaseHeaders(config.key),
  });

  if (!response.ok) throw new Error(await response.text());
  const rows = await response.json();
  if (!rows.length) throw new Error("云端没有找到这个同步口令的数据。");
  return decryptJSON(rows[0].payload, config.passphrase);
}

function readConfig(state) {
  const url = normalizeSupabaseUrl(state.sync.supabaseUrl);
  const key = state.sync.supabaseKey;
  const passphrase = state.sync.syncPassphrase;
  if (!url || !key || !passphrase) {
    throw new Error("请先填写 Supabase URL、anon key 和同步口令。");
  }
  return { url, key, passphrase };
}

function normalizeSupabaseUrl(input) {
  if (!input) return "";
  try {
    const parsed = new URL(input.trim());
    if (parsed.pathname.includes("/rest/v1")) return parsed.origin;
    return `${parsed.origin}${parsed.pathname.replace(/\/$/, "") === "" ? "" : parsed.pathname.replace(/\/$/, "")}`;
  } catch {
    return input.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
  }
}

function supabaseHeaders(key, extra = {}) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function stripLocalSyncSecrets(state) {
  const clone = JSON.parse(JSON.stringify(state));
  clone.sync = {
    supabaseUrl: "",
    supabaseKey: "",
    syncPassphrase: "",
    lastPush: state.sync.lastPush,
    lastPull: state.sync.lastPull,
  };
  return clone;
}

async function encryptJSON(value, passphrase) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase);
  const encoded = new TextEncoder().encode(JSON.stringify(value));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded));
  const packed = new Uint8Array(iv.length + cipher.length);
  packed.set(iv, 0);
  packed.set(cipher, iv.length);
  return toBase64(packed);
}

async function decryptJSON(payload, passphrase) {
  const packed = fromBase64(payload);
  const iv = packed.slice(0, 12);
  const cipher = packed.slice(12);
  const key = await deriveKey(passphrase);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
  return JSON.parse(new TextDecoder().decode(plain));
}

async function deriveKey(passphrase) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(SALT),
      iterations: 120000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

async function sha256(value) {
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${SALT}:${value}`)));
  return Array.from(hash).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function toBase64(bytes) {
  let binary = "";
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function fromBase64(value) {
  return Uint8Array.from(atob(value), char => char.charCodeAt(0));
}
