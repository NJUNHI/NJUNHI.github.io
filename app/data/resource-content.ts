const commonInformationHeading = "常用信息（各类可能用到的公众号、论坛、群聊等）";

const commonInformationGroups: Record<string, string> = {
  "resources/manual-major/0": "生存手册相关",
  "resources/manual-major/1": "大气专业相关",
  "resources/global/0": "出国相关/交流交换项目",
  "resources/global/1": "大气出国",
  "resources/career-info/0": "保研",
  "resources/career-info/1": "公考选调",
};

function textContent(html: string) {
  return html.replace(/<[^>]+>/g, "").replaceAll("&nbsp;", " ").trim();
}

function extractCells(rowHtml: string) {
  return [...rowHtml.matchAll(/<(?:th|td)\b[^>]*>([\s\S]*?)<\/(?:th|td)>/gi)].map((match) => match[1]);
}

function renderGroupTable(html: string, selectedGroup: string) {
  const rows = [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
  const selectedRows: string[] = [];
  let currentGroup = "";

  for (const row of rows) {
    const cells = extractCells(row[1]);
    if (cells.length < 5) continue;

    const group = textContent(cells[0]);
    if (group) currentGroup = group;
    if (currentGroup !== selectedGroup) continue;

    selectedRows.push(
      `<tr>${cells.slice(1, 5).map((cell) => `<td style="text-align: left;">${cell}</td>`).join("")}</tr>`,
    );
  }

  if (selectedRows.length === 0) return html;

  return `<div class="center">
<table>
<thead>
<tr>
<th style="text-align: left;">名称</th>
<th style="text-align: left;">类型</th>
<th style="text-align: left;">链接或补充</th>
<th style="text-align: left;">说明</th>
</tr>
</thead>
<tbody>
${selectedRows.join("\n")}
</tbody>
</table>
</div>`;
}

export function getSourceHtml(sourceKey: string, heading: string, html: string) {
  const selectedGroup = commonInformationGroups[sourceKey];
  if (!selectedGroup || heading !== commonInformationHeading) return html;
  return renderGroupTable(html, selectedGroup);
}
