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
  const visibleHome = html.slice(html.indexOf("</head>"), html.indexOf("</main>"));
  assert.match(html, /<title>南赫 Wiki｜学生共建<\/title>/);
  assert.match(html, /学院总览/);
  assert.match(html, /学生手册/);
  assert.match(html, /手册导览/);
  assert.match(html, /培养体系/);
  assert.match(html, /课程资料/);
  assert.match(html, /交换学习/);
  assert.match(html, /学院简介/);
  assert.match(html, /合作历程/);
  assert.match(html, /师资队伍/);
  assert.match(html, /南京大学网上办事服务大厅/);
  assert.match(html, /class="button button-course" href="#course-materials">课程资料/);
  assert.match(html, /class="button button-contact" href="https:\/\/github\.com\/NJUNHI\/\.github\/blob\/main\/profile\/README\.md"[^>]*>联系我们/);
  assert.equal((html.match(/class="major-section-number"/g) ?? []).length, 3);
  assert.match(html, /major-section-heading official-section-heading/);
  assert.match(html, /major-section-heading student-section-heading/);
  assert.match(html, /href="https:\/\/nh\.nju\.edu\.cn\/"/);
  assert.match(html, /href="https:\/\/ehall\.nju\.edu\.cn\/ywtb-portal\/official\/index\.html"/);
  assert.ok(html.indexOf('class="hero"') < html.indexOf('class="search-strip"'));
  assert.ok(html.indexOf('class="search-strip"') < html.indexOf('id="official"'));
  assert.ok(html.indexOf('id="official"') < html.indexOf('id="map"'));
  assert.ok(html.indexOf('id="map"') < html.indexOf('id="course-materials"'));
  assert.ok(html.indexOf('id="course-materials"') < html.indexOf('class="source-note"'));
  assert.doesNotMatch(html, /第一次来，先看这三件事|确认事实|阅读经验|留下记录/);
  assert.doesNotMatch(visibleHome, /查学院、找课程、看经验，也欢迎你来补充/);
  assert.doesNotMatch(visibleHome, /南赫是什么、怎么培养、主要在哪里上课/);
  assert.doesNotMatch(visibleHome, /序言、免责声明和南赫概况/);
  assert.doesNotMatch(visibleHome, /学院 · 学业 · 生活/);
  assert.doesNotMatch(visibleHome, /南赫气象站|南赫学生 Wiki/);
  assert.match(visibleHome, /学院信息、通知公告与官方政策/);
  assert.match(visibleHome, /校内办事事项与在线服务入口/);
  assert.doesNotMatch(html.slice(html.indexOf('id="map"'), html.indexOf('id="course-materials"')), /href="\/wiki\/course-materials"/);
  assert.match(html.slice(html.indexOf('id="course-materials"')), /href="\/wiki\/course-materials"/);
  assert.match(html, /这是同学维护的非官方网站/);
  assert.doesNotMatch(html, /按《难喝生存手册》分类整理|分类参照|整理成入口|快速导览|一站整理/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("全站页面提供分组清楚的侧边目录总览", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /class="site-guide"/);
  assert.match(home, /class="site-directory site-directory-mobile"/);
  assert.match(home, /目录总览/);
  assert.match(home, /aria-label="全站目录"/);
  assert.match(home, /学院总览/);
  assert.match(home, /学生手册/);
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
  assert.match(html, /<title>手册导览｜南赫 Wiki<\/title>/);
  assert.match(html, /2025 版序/);
  assert.match(html, /南赫概况/);
  assert.match(html, /待补充/);
  assert.match(html, /学院官网｜学院简介/);
});

test("目录页只保留标题和入口，不显示标题解释", async () => {
  const study = await (await render("/wiki/study")).text();
  const visibleStudy = study.slice(0, study.indexOf('<div hidden="">'));
  assert.match(visibleStudy, /3\.4 如何应对全英文教学/);
  assert.match(visibleStudy, /各课程语言体验/);
  assert.match(visibleStudy, /阅读内容/);
  assert.match(visibleStudy, /待补充/);
  assert.doesNotMatch(visibleStudy, /选课、绩点、辅修、全英文教学、找导师和竞赛/);
  assert.doesNotMatch(visibleStudy, /讨论专业术语、听课与阅读适应/);
  assert.doesNotMatch(visibleStudy, /每门课上课、作业、考试和展示到底用什么语言/);
  assert.doesNotMatch(visibleStudy, /讨论提前预习数学基础、适应住宿与建立信息渠道/);

  const official = await (await render("/official/introduction")).text();
  assert.match(official, /以学院官网最新信息为准/);
  assert.match(official, /查看学院官网原页面/);
  assert.doesNotMatch(official, /站内可以直接阅读，政策、人员和联系方式有变化时请到官网确认/);
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
    assert.match(html, new RegExp(`<title>${title}｜南赫 Wiki</title>`));
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
    assert.match(handbookNav, /学生手册/);
    assert.doesNotMatch(handbookNav, /href="\/wiki\/course-materials"/);
  }
});

test("课程资料与学生手册的前后翻页序列完全分离", async () => {
  const studyCategory = await (await render("/wiki/study")).text();
  assert.match(studyCategory, /href="\/wiki\/development" rel="next"/);
  assert.doesNotMatch(studyCategory, /href="\/wiki\/course-materials" rel="next"/);

  const competition = await (await render("/wiki/study/experience/3")).text();
  assert.match(competition, /href="\/wiki\/development\/domestic\/0" rel="next"/);
  assert.match(competition, /大气保研/);
  assert.doesNotMatch(competition, /href="\/wiki\/course-materials\/notes\/0" rel="next"/);

  const development = await (await render("/wiki/development/domestic/0")).text();
  assert.match(development, /href="\/wiki\/study\/experience\/3" rel="prev"/);
  assert.match(development, /竞赛经验/);

  const firstCourseMaterial = await (await render("/wiki/course-materials/notes/0")).text();
  assert.match(firstCourseMaterial, /已经是第一篇/);
  assert.match(firstCourseMaterial, /href="\/wiki\/course-materials\/notes\/1" rel="next"/);
  assert.doesNotMatch(firstCourseMaterial, /href="\/wiki\/study\/experience\/3" rel="prev"/);

  const lastCourseMaterial = await (await render("/wiki/course-materials/by-course/2")).text();
  assert.match(lastCourseMaterial, /已经是最后一篇/);
  assert.doesNotMatch(lastCourseMaterial, /href="\/wiki\/development\/domestic\/0" rel="next"/);
});

test("学院概览条目可在站内阅读并链接官网来源", async () => {
  for (const [slug, title] of [["introduction", "学院简介"], ["history", "合作历程"], ["faculty", "师资队伍"]]) {
    const response = await render(`/official/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title}｜南赫 Wiki</title>`));
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
  assert.match(html, /The impact of aerosols on photolysis frequencies and ozone production in Beijing during the 4-year period 2012–2015/);
  const publicationSections = [...html.matchAll(/<div class="faculty-card-section faculty-publications">([\s\S]*?)<\/div>/g)];
  assert.equal(publicationSections.length, 17);
  for (const [, section] of publicationSections) {
    assert.equal((section.match(/href="https:\/\/doi\.org\//g) ?? []).length, 2);
    assert.doesNotMatch(section, /<li><span>/);
  }
  assert.equal((html.match(/href="https:\/\/doi\.org\//g) ?? []).length, 34);
  assert.match(html, /href="https:\/\/nh\.nju\.edu\.cn\/info\/1471\/8281\.htm"/);
  assert.match(html, /href="https:\/\/www\.dezhengsun\.org\/index-original"/);
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
  assert.match(html, /<title>3.1 选课策略与原则｜南赫 Wiki<\/title>/);
  assert.match(html, /通读南哪助手新生问答/);
  assert.match(html, /学院官方网站/);
  assert.match(html, /南京大学网上办事服务大厅/);
  assert.match(html, /href="https:\/\/nh\.nju\.edu\.cn\/"/);
  assert.doesNotMatch(html, /保留原文表达|内容来自《难喝生存手册》原稿/);
});

test("手册正文标题区只保留章节和标题", async () => {
  const html = await (await render("/wiki/training/plan/0")).text();
  const headerStart = html.indexOf('class="handbook-detail-header');
  const headerEnd = html.indexOf("</header>", headerStart);
  const header = html.slice(headerStart, headerEnd);

  assert.match(header, /第二章/);
  assert.match(header, /2\.1 培养方案/);
  assert.match(header, /培养方案怎么读/);
  assert.doesNotMatch(header, /先区分通识、公共、学科与专业课程/);
  assert.doesNotMatch(header, /已整理|待补充|status-ready|status-todo/);
});

test("常用信息各入口只显示对应类别的表格内容", async () => {
  const cases = [
    ["/wiki/resources/manual-major/0", "上海交通大学生存手册", "气象家园", ["862670709"]],
    ["/wiki/resources/manual-major/1", "气象家园", "上海交通大学生存手册", ["1040472048", "256474813"]],
    ["/wiki/resources/global/0", "南京大学本科生院交换生管理系统", "一展云图", ["981368919"]],
    ["/wiki/resources/global/1", "一展云图", "南哪儿留学", ["2017 - 2024", "536999212"]],
    ["/wiki/resources/career-info/0", "清华大学地球系统科学系", "等待国家分配工作的NJUers", []],
    ["/wiki/resources/career-info/1", "等待国家分配工作的NJUers", "清华大学地球系统科学系", ["161075315"]],
  ];

  for (const [pathname, includedEntry, excludedEntry, requiredValues] of cases) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
    const html = await response.text();
    const hiddenStart = html.indexOf('<div hidden="">');
    const visible = hiddenStart === -1 ? html : html.slice(0, hiddenStart);
    assert.match(visible, /<th[^>]*>名称<\/th>/);
    assert.match(visible, /<th[^>]*>类型<\/th>/);
    assert.match(visible, /<th[^>]*>链接或补充<\/th>/);
    assert.match(visible, /<th[^>]*>说明<\/th>/);
    assert.match(visible, new RegExp(includedEntry));
    assert.doesNotMatch(visible, new RegExp(excludedEntry));
    for (const value of requiredValues) assert.match(visible, new RegExp(value));
  }
});

test("原始手册中的群号与网页生成内容保持一致", async () => {
  const source = await readFile(new URL("../content/handbook/chapters/00-front.tex", import.meta.url), "utf8");
  const generated = await readFile(new URL("../app/data/handbook-content.json", import.meta.url), "utf8");
  const sourceContactNumbers = [...new Set([...source.matchAll(/\b\d{8,10}\b/g)].map((match) => match[0]))];

  assert.deepEqual(sourceContactNumbers, ["862670709", "1040472048", "256474813", "981368919", "536999212", "161075315"]);
  for (const contactNumber of sourceContactNumbers) assert.match(generated, new RegExp(contactNumber));
  assert.match(generated, /2017 - 2024 南京大学大气科学学院就业报告/);
});

test("无效的 Wiki 地址返回 404", async () => {
  for (const pathname of ["/wiki/not-a-category", "/wiki/study/not-a-section/0", "/wiki/study/course-strategy/99"]) {
    const response = await render(pathname);
    assert.equal(response.status, 404, `${pathname} should return 404`);
  }
});

test("学院概览和 Wiki 正文提供上一篇、目录与下一篇导航", async () => {
  const official = await (await render("/official/advantages")).text();
  assert.match(official, /aria-label="文章翻页"/);
  assert.match(official, /href="\/official\/introduction" rel="prev"/);
  assert.match(official, /href="\/#official"/);
  assert.match(official, /href="\/official\/history" rel="next"/);

  const category = await (await render("/wiki/training")).text();
  assert.match(category, /href="\/wiki\/resources" rel="prev"/);
  assert.match(category, /href="\/#map"/);
  assert.match(category, /href="\/wiki\/study" rel="next"/);

  const detail = await (await render("/wiki/about/prefaces/2")).text();
  assert.match(detail, /href="\/wiki\/about\/prefaces\/1" rel="prev"/);
  assert.match(detail, /href="\/wiki\/about#prefaces"/);
  assert.match(detail, /href="\/wiki\/about\/overview\/0" rel="next"/);
});

test("阅读序列首尾状态明确且正文采用增强对比度", async () => {
  const first = await (await render("/wiki/about/prefaces/0")).text();
  assert.match(first, /已经是第一篇/);
  assert.match(first, /href="\/wiki\/about\/prefaces\/1" rel="next"/);

  const last = await (await render("/wiki/contribute/rules/2")).text();
  assert.match(last, /已经是最后一篇/);

  const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(stylesheet, /official-card:nth-child\([^)]*\)\s*\{[^}]*translateY/s);
  assert.doesNotMatch(stylesheet, /category-card:nth-child\([^)]*\)\s*\{[^}]*translateY/s);
  assert.match(stylesheet, /\.handbook-content\s*\{[^}]*color:\s*#172d37[^}]*font-weight:\s*500/s);
  assert.match(stylesheet, /\.reading-navigation\s*\{/);
  assert.match(stylesheet, /\.article-index nav a\s*\{[^}]*align-items:\s*center/s);
  assert.match(stylesheet, /\.article-index nav a\.active\s*\{[^}]*padding-inline:\s*4px/s);
  assert.match(stylesheet, /\.detail-aside nav a\.active\s*\{[^}]*padding-inline:\s*6px/s);
  assert.match(stylesheet, /@media \(max-width: 760px\)[\s\S]*\.article-index nav a\.active\s*\{[^}]*padding-inline:\s*12px/s);
  assert.match(stylesheet, /@media \(max-width: 760px\)[\s\S]*\.detail-aside nav a\.active\s*\{[^}]*padding-inline:\s*12px/s);
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
