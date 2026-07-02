import { createServer } from "http";
import { readFile } from "fs/promises";
import { extname, join, resolve } from "path";
import { fileURLToPath } from "url";

const PORT = 5173;
const ROOT = resolve(fileURLToPath(import.meta.url), "../frontend");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".ico":  "image/x-icon",
  ".mp3":  "audio/mpeg",
};

createServer(async (req, res) => {
  let url = req.url === "/" ? "/index.html" : req.url;
  // Strip query strings
  url = url.split("?")[0];
  const filePath = join(ROOT, url);

  try {
    const data = await readFile(filePath);
    const mime = MIME[extname(filePath)] ?? "application/octet-stream";
    res.writeHead(200, { "Content-Type": mime });
    res.end(data);
  } catch {
    // SPA fallback: serve index.html for unknown paths
    try {
      const data = await readFile(join(ROOT, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}).listen(PORT, () => {
  console.log(`IELTS Master running at http://localhost:${PORT}`);
});
