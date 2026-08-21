import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("首页呈现学生 Wiki 的完整信息架构", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>南赫气象站｜学生共建 Wiki<\/title>/);
  assert.match(html, /先认识南赫/);
  assert.match(html, /学生手册与经验/);
  assert.match(html, /手册导览/);
  assert.match(html, /培养体系/);
  assert.match(html, /课程资料/);
  assert.match(html, /交换学习/);
  assert.match(html, /学院简介/);
  assert.match(html, /合作历程/);
  assert.match(html, /师资队伍/);
  assert.match(html, /南京大学网上办事服务大厅/);
  assert.match(html, /class="button button-course" href="#course-materials">课程资料/);
  assert.equal((html.match(/class="major-section-number"/g) ?? []).length, 3);
  assert.match(html, /major-section-heading official-section-heading/);
  assert.match(html, /major-section-heading student-section-heading/);
  assert.match(html, /href="https:\/\/nh\.nju\.edu\.cn\/"/);
  assert.match(html, /href="https:\/\/ehall\.nju\.edu\.cn\/ywtb-portal\/official\/index\.html"/);
  assert.ok(html.indexOf('class="hero"') < html.indexOf('class="search-strip"'));
  assert.ok(html.indexOf('class="search-strip"') < html.indexOf('id="official"'));
  assert.ok(html.indexOf('id="official"') < html.indexOf('id="map"'));
  assert.ok(html.indexOf('id="map"') < html.indexOf('id="course-materials"'));
  assert.ok(html.indexOf('id="course-materials"') < html.indexOf('id="start-title"'));
  assert.doesNotMatch(html.slice(html.indexOf('id="map"'), html.indexOf('id="course-materials"')), /href="\/wiki\/course-materials"/);
  assert.match(html.slice(html.indexOf('id="course-materials"')), /href="\/wiki\/course-materials"/);
  assert.match(html, /这是同学维护的非官方网站/);
  assert.doesNotMatch(html, /按《难喝生存手册》分类整理|分类参照|整理成入口|快速导览|一站整理/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("全站页面提供分组清楚的侧边目录总览", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /class="site-directory"/);
  assert.match(home, /目录总览/);
  assert.match(home, /全站目录/);
  assert.match(home, /学院概览/);
  assert.match(home, /学生手册与经验/);
  assert.match(home, /课程资料总览/);
  assert.match(home, /href="\/official\/faculty"/);
  assert.match(home, /href="\/wiki\/study"/);
  assert.match(home, /href="\/wiki\/course-materials#notes"/);

  const faculty = await (await render("/official/faculty")).text();
  assert.match(faculty, /class="current" href="\/official\/faculty">师资队伍/);

  const study = await (await render("/wiki/study")).text();
  assert.match(study, /class="current" href="\/wiki\/study">学习建议/);
});

test("Wiki 子页面可服务并显示来源与待补充状态", async () => {
  const response = await render("/wiki/about");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>手册导览｜南赫气象站<\/title>/);
  assert.match(html, /2025 版序/);
  assert.match(html, /南赫概况/);
  assert.match(html, /待补充/);
  assert.match(html, /学院官网｜学院简介/);
});

test("九个 Wiki 分册均可正常访问", async () => {
  const routes = [
    ["about", "手册导览"],
    ["resources", "常用信息"],
    ["training", "培养体系"],
    ["study", "学习建议"],
    ["course-materials", "课程资料"],
    ["development", "生涯规划"],
    ["exchange", "交换学习"],
    ["life", "校园生活"],
    ["contribute", "共建指南"],
  ];

  for (const [slug, title] of routes) {
    const response = await render(`/wiki/${slug}`);
    assert.equal(response.status, 200, `${slug} should render`);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title}｜南赫气象站</title>`));
  }
});

test("课程资料分册已预留并可进入待补充页面", async () => {
  const response = await render("/wiki/course-materials");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /课程笔记/);
  assert.match(html, /作业与习题/);
  assert.match(html, /按课程查找/);
  assert.match(html, /href="\/wiki\/course-materials\/notes\/0"/);

  const detailResponse = await render("/wiki/course-materials/notes/0");
  assert.equal(detailResponse.status, 200);
  const detailHtml = await detailResponse.text();
  assert.match(detailHtml, /待补充～/);
  assert.match(detailHtml, /To be done/);
});

test("课程资料不再出现在学生手册分册导航中", async () => {
  for (const pathname of ["/wiki/study", "/wiki/course-materials"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    const navStart = html.indexOf('class="article-index"');
    const navEnd = html.indexOf("</aside>", navStart);
    const handbookNav = html.slice(navStart, navEnd);
    assert.match(handbookNav, /学生手册与经验/);
    assert.doesNotMatch(handbookNav, /href="\/wiki\/course-materials"/);
  }
});

test("学院概览条目可在站内阅读并链接官网来源", async () => {
  for (const [slug, title] of [["introduction", "学院简介"], ["history", "合作历程"], ["faculty", "师资队伍"]]) {
    const response = await render(`/official/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title}｜南赫气象站</title>`));
    assert.match(html, /以学院官网最新信息为准/);
    assert.match(html, /查看学院官网原页面|查看完整师资名单/);
  }
});

test("学院简介、办学优势、合作历程、管理队伍和联系信息均有站内正文", async () => {
  const introduction = await (await render("/official/introduction")).text();
  assert.match(introduction, /学院概况/);
  assert.match(introduction, /2022 年 4 月获教育部批准/);
  assert.match(introduction, /人才培养/);
  assert.match(introduction, /href="https:\/\/nh\.nju\.edu\.cn\/xyzl\/xyjj\.htm"/);

  const advantages = await (await render("/official/advantages")).text();
  assert.match(advantages, /两校基础与学科融合/);
  assert.match(advantages, /南京大学大气科学/);
  assert.match(advantages, /7000 余名人才/);
  assert.match(advantages, /赫尔辛基大学创办于 1640 年/);

  const history = await (await render("/official/history")).text();
  assert.match(history, /合作时间线/);
  assert.equal((history.match(/<time>/g) ?? []).length, 12);
  assert.match(history, /SORPES 观测基地/);
  assert.match(history, /南赫学院举行开学典礼/);

  const administration = await (await render("/official/administration")).text();
  assert.equal((administration.match(/class="administration-card"/g) ?? []).length, 16);
  assert.match(administration, /丁爱军/);
  assert.match(administration, /唐明浩/);
  assert.match(administration, /本科生教务秘书/);
  assert.match(administration, /mailto:tangminghao@nju.edu.cn/);

  const contact = await (await render("/official/contact")).text();
  assert.equal((contact.match(/class="campus-contact-card"/g) ?? []).length, 3);
  assert.match(contact, /太湖大道 1520 号/);
  assert.match(contact, /汉口路 22 号/);
  assert.match(contact, /仙林大道 163 号/);
  assert.match(contact, /mailto:nh@nju.edu.cn/);
});

test("师资页列出专任教师、研究方向、代表论文和主页", async () => {
  const response = await render("/official/faculty");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.equal((html.match(/class="faculty-card"/g) ?? []).length, 17);
  assert.match(html, /南赫专任教师/);
  assert.match(html, /保云涛/);
  assert.match(html, /陈婕/);
  assert.match(html, /Otso Peräkylä/);
  assert.match(html, /王海鲲/);
  assert.match(html, /郑昊天/);
  assert.match(html, /研究方向/);
  assert.match(html, /代表论文（节选）/);
  assert.match(html, /Climate Simulations and Ice Core Data Highlight the Holocene Conundrum over Tropical Mountains/);
  assert.match(html, /href="https:\/\/nh\.nju\.edu\.cn\/info\/1471\/8281\.htm"/);
  assert.match(html, /全部南赫教师/);
});

test("已整理条目可进入手册内容页面并显示官方入口", async () => {
  const categoryResponse = await render("/wiki/study");
  const categoryHtml = await categoryResponse.text();
  assert.match(categoryHtml, /href="\/wiki\/study\/course-strategy\/0"/);
  assert.match(categoryHtml, /阅读内容/);

  const response = await render("/wiki/study/course-strategy/0");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>3.1 选课策略与原则｜南赫气象站<\/title>/);
  assert.match(html, /通读南哪助手新生问答/);
  assert.match(html, /学院官方网站/);
  assert.match(html, /南京大学网上办事服务大厅/);
  assert.match(html, /href="https:\/\/nh\.nju\.edu\.cn\/"/);
  assert.doesNotMatch(html, /保留原文表达|内容来自《难喝生存手册》原稿/);
});

test("页面不再展示原稿或保留原文类说明", async () => {
  for (const pathname of ["/", "/wiki/training", "/wiki/training/courses/1"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.doesNotMatch(html, /保留原文表达|内容来自《难喝生存手册》原稿|原稿包含课堂评价|原稿评价或截图文字/);
  }
});

test("待补充条目也可进入占位页面", async () => {
  const response = await render("/wiki/development/career-change/0");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /待补充～/);
  assert.match(html, /To be done/);
});

test("已移除临时预览骨架与依赖", async () => {
  const packageJson = await readFile(new URL("package.json", projectRoot), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton|site-creator-vinext-starter/);
  await assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", projectRoot)));
  await access(new URL("public/og.png", projectRoot));
});

test("手机端主导航保留三个核心入口", async () => {
  const css = await readFile(new URL("app/globals.css", projectRoot), "utf8");
  assert.match(css, /\.site-header nav \{ gap: 10px; overflow-x: auto;/);
  assert.match(css, /\.site-header nav a:nth-child\(4\), \.official-link \{ display: none; \}/);
  assert.doesNotMatch(css, /\.site-header nav a:nth-child\(2\), \.official-link \{ display: none; \}/);
});
