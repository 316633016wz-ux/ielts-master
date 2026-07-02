export function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function uid(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function formValue(form, name, fallback = "") {
  return form.elements[name]?.value?.trim() || fallback;
}

export function formNumber(form, name, fallback = 0) {
  const value = Number(form.elements[name]?.value);
  return Number.isFinite(value) ? value : fallback;
}
