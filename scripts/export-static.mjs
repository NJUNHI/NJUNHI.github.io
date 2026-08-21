import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "site-dist");
const clientRoot = path.join(projectRoot, "dist", "client");
const workerPath = path.join(projectRoot, "dist", "server", "index.js");
const origin = "https://njunhi.github.io";

const { default: worker } = await import(`${workerPath}?static-export=${Date.now()}`);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(clientRoot, outputRoot, { recursive: true });
await writeFile(path.join(outputRoot, ".nojekyll"), "");

const queue = ["/"];
const discovered = new Set(queue);
const exported = [];

function isPagePath(pathname) {
  return pathname === "/" || pathname.startsWith("/official/") || pathname.startsWith("/wiki/");
}

function discoverLinks(html) {
  const hrefPattern = /href=["']([^"']+)["']/g;
  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1];
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;

    const url = new URL(href, origin);
    if (url.origin !== origin || !isPagePath(url.pathname)) continue;

    const pathname = url.pathname.replace(/\/+$/, "") || "/";
    if (!discovered.has(pathname)) {
      discovered.add(pathname);
      queue.push(pathname);
    }
  }
}

while (queue.length > 0) {
  const pathname = queue.shift();
  const response = await worker.fetch(
    new Request(`${origin}${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) throw new Error(`Unable to export ${pathname}: HTTP ${response.status}`);

  const html = await response.text();
  discoverLinks(html);

  const destination = pathname === "/"
    ? path.join(outputRoot, "index.html")
    : path.join(outputRoot, pathname.slice(1), "index.html");

  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
  exported.push(pathname);
}

await writeFile(path.join(outputRoot, "404.html"), await (await worker.fetch(
  new Request(`${origin}/not-found`, { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
)).text());

console.log(`Exported ${exported.length} pages to ${path.relative(projectRoot, outputRoot)}/`);
