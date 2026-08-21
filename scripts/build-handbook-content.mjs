import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const chapterDir = resolve(projectRoot, "content/handbook/chapters");
const sourceMap = JSON.parse(readFileSync(resolve(projectRoot, "app/data/handbook-source-map.json"), "utf8"));
const wantedHeadings = new Set(Object.values(sourceMap).flat());
const levels = { chapter: 1, section: 2, subsection: 3, subsubsection: 4 };

function readBraced(input, openIndex) {
  let depth = 0;
  for (let index = openIndex; index < input.length; index += 1) {
    if (input[index] === "{" && input[index - 1] !== "\\") depth += 1;
    if (input[index] === "}" && input[index - 1] !== "\\") {
      depth -= 1;
      if (depth === 0) return { value: input.slice(openIndex + 1, index), end: index + 1 };
    }
  }
  throw new Error(`Unclosed brace at ${openIndex}`);
}

function plainHeading(value) {
  return value
    .replaceAll("\\&", "&")
    .replaceAll("\\%", "%")
    .replace(/\\textasciitilde\{?\}?/g, "~")
    .replace(/\\[a-zA-Z]+\{([^{}]*)\}/g, "$1")
    .trim();
}

function replaceCommand(input, command, formatter) {
  const marker = `\\${command}`;
  let cursor = 0;
  let output = "";
  while (cursor < input.length) {
    const start = input.indexOf(marker, cursor);
    if (start < 0) return output + input.slice(cursor);
    output += input.slice(cursor, start);
    let open = start + marker.length;
    if (input[open] === "[") {
      const optionEnd = input.indexOf("]", open);
      if (optionEnd < 0) throw new Error(`Unclosed option for ${command}`);
      open = optionEnd + 1;
    }
    while (/\s/.test(input[open] ?? "")) open += 1;
    if (input[open] !== "{") {
      output += marker;
      cursor = start + marker.length;
      continue;
    }
    const argument = readBraced(input, open);
    output += formatter(argument.value);
    cursor = argument.end;
  }
  return output;
}

function preprocessLatex(input) {
  let output = input;
  output = replaceCommand(output, "SourceParagraph", (value) => `\n\n${value}\n\n`);
  output = replaceCommand(output, "SourceLabel", (value) => `\n\n\\textbf{${value}}\n\n`);
  output = replaceCommand(output, "SourceListItem", (value) => `\n\n\\begin{itemize}\\item ${value}\\end{itemize}\n\n`);
  output = output.replace(/\\SourceBlankLine(?:\[[^\]]*\])?/g, "\n\n");
  output = output.replaceAll("\\RareLuo", "啰");
  return output;
}

function headingsFrom(source, filename) {
  const headings = [];
  const matcher = /\\(chapter|section|subsection|subsubsection)\*?\s*\{/g;
  let match;
  while ((match = matcher.exec(source))) {
    const open = matcher.lastIndex - 1;
    const title = readBraced(source, open);
    headings.push({
      filename,
      level: levels[match[1]],
      title: plainHeading(title.value),
      start: match.index,
      bodyStart: title.end,
    });
    matcher.lastIndex = title.end;
  }
  return headings.map((heading, index) => {
    let end = source.length;
    for (let next = index + 1; next < headings.length; next += 1) {
      if (headings[next].level <= heading.level) {
        end = headings[next].start;
        break;
      }
    }
    return { ...heading, body: source.slice(heading.bodyStart, end) };
  });
}

const found = new Map();
for (const filename of readdirSync(chapterDir).filter((name) => name.endsWith(".tex")).sort()) {
  const source = readFileSync(resolve(chapterDir, filename), "utf8");
  for (const heading of headingsFrom(source, filename)) {
    if (wantedHeadings.has(heading.title) && !found.has(heading.title)) found.set(heading.title, heading);
  }
}

const missing = [...wantedHeadings].filter((heading) => !found.has(heading));
if (missing.length) throw new Error(`Missing handbook headings: ${missing.join(", ")}`);

const content = {};
for (const heading of [...wantedHeadings].sort((a, b) => a.localeCompare(b, "zh-CN"))) {
  const entry = found.get(heading);
  const html = execFileSync(
    "pandoc",
    ["-f", "latex", "-t", "html", "--wrap=none"],
    { input: preprocessLatex(entry.body), encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
  )
    .replaceAll('src="figures/', 'src="/handbook-figures/')
    .replaceAll("原稿评价或截图文字", "评价或截图文字")
    .trim();
  if (!html) throw new Error(`Pandoc produced empty content for ${heading}`);
  content[heading] = { html, source: entry.filename };
}

writeFileSync(
  resolve(projectRoot, "app/data/handbook-content.json"),
  `${JSON.stringify(content, null, 2)}\n`,
  "utf8",
);

console.log(`Generated ${Object.keys(content).length} handbook sections.`);
