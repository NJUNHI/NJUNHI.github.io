import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "site-dist");
const siteOrigin = "https://njunhi.github.io";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function destinationFor(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded === "/") return path.join(outputRoot, "index.html");
  const relative = decoded.replace(/^\/+/, "");
  if (path.extname(relative)) return path.join(outputRoot, relative);
  return path.join(outputRoot, relative, "index.html");
}

const files = await walk(outputRoot);
const fileSet = new Set(files.map((file) => path.resolve(file)));
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const failures = [];
let totalBytes = 0;

for (const file of files) totalBytes += (await stat(file)).size;

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(outputRoot, file);
  const pagePath = relative === "index.html"
    ? "/"
    : `/${relative.replace(/\/index\.html$/, "")}`;
  const pageUrl = new URL(pagePath, siteOrigin);

  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${relative}: missing title`);
  if (/https?:\/\/(?:localhost|127\.0\.0\.1)/.test(html)) failures.push(`${relative}: contains a local URL`);

  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) failures.push(`${relative}: duplicate id ${[...new Set(duplicateIds)].join(", ")}`);

  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (!reference || reference.startsWith("#") || /^(?:mailto:|tel:|data:|javascript:)/.test(reference)) continue;

    const target = new URL(reference.replaceAll("&amp;", "&"), pageUrl);
    if (target.origin !== siteOrigin) continue;

    const destination = destinationFor(target.pathname);
    if (!fileSet.has(path.resolve(destination))) failures.push(`${relative}: missing ${target.pathname}`);
  }
}

if (totalBytes >= 1024 ** 3) failures.push("published site is at or above the GitHub Pages 1 GiB limit");

if (failures.length > 0) {
  console.error(`Static verification failed with ${failures.length} problem(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${htmlFiles.length} HTML pages and ${files.length} published files (${(totalBytes / 1024 / 1024).toFixed(1)} MiB).`);
}
