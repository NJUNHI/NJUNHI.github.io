export type WikiItem = {
  title: string;
  text: string;
  status?: "已整理" | "待补充";
  href?: string;
  handbookPage?: number;
};

export type WikiSection = {
  id: string;
  title: string;
  intro?: string;
  handbookPage?: number;
  items: WikiItem[];
};

export type WikiCategory = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  symbol: string;
  tone: "blue" | "yellow" | "coral" | "green";
  quickLinks: string[];
  source?: { label: string; href: string };
  sections: WikiSection[];
};

export const categories: WikiCategory[] = [
  {
    slug: "about",
    label: "导览篇",
    title: "手册导览",
    summary: "序言、免责声明和南赫概况，第一次看手册可以从这里开始。",
    symbol: "◎",
    tone: "blue",
    quickLinks: ["2025 版序", "2026 版序", "南赫概况"],
    source: { label: "学院官网｜学院简介", href: "https://nh.nju.edu.cn/xyzl/xyjj.htm" },
    sections: [
      {
        id: "prefaces",
        title: "序言与说明",
        intro: "对应 PDF 前置部分，保留手册的来历、使用边界与共建愿景。",
        handbookPage: 3,
        items: [
          { title: "2025 版序", text: "首版编写缘起：分享南赫相关信息，帮助新生适应大学生活并进行生涯规划，也邀请后来者继续修订和传承。", status: "已整理" },
          { title: "2026 版序", text: "续写一届学生共同建设的资料：记录学习、迷茫、试错与寻找方向的过程，让经验能够继续传递。", status: "已整理", handbookPage: 4 },
          { title: "免责声明", text: "说明手册属于学生自发编写的非官方参考资料；制度、政策与专业事项应结合官方信息自行判断。", status: "已整理", handbookPage: 6 },
        ],
      },
      {
        id: "overview",
        title: "第一章 前言",
        intro: "手册第一章目前包含“南赫概况”。",
        handbookPage: 9,
        items: [
          { title: "1.1 南赫概况", text: "学院怎么成立、和谁合作、招哪些学生、主要在哪里上课。", status: "已整理" },
          { title: "各届培养变化", text: "不同年级的培养方案不完全一样，之后按入学年份分别写。", status: "待补充" },
          { title: "学生视角的学院印象", text: "课堂节奏、英文环境，以及真正入学后的感受。", status: "待补充" },
        ],
      },
      {
        id: "reading",
        title: "阅读方式",
        items: [
          { title: "事实与经验分开阅读", text: "培养政策、学分认定与办事要求以当年官方通知为准；经验内容应注明适用年级与时间。", status: "已整理" },
          { title: "保留不同答案", text: "同一课程、方向或选择可能有不同体验，Wiki 会并列保留有时间标记的个人经验。", status: "已整理" },
          { title: "发现过期内容", text: "请标记旧信息并提供新的依据，避免直接删除仍对旧年级有参考价值的记录。", status: "已整理" },
        ],
      },
    ],
  },
  {
    slug: "resources",
    label: "索引篇",
    title: "常用信息",
    summary: "常用手册、专业、升学、交换和就业入口都在这里。",
    symbol: "⌕",
    tone: "green",
    quickLinks: ["手册与专业", "交换与出国", "保研与就业"],
    sections: [
      {
        id: "manual-major",
        title: "手册与专业",
        handbookPage: 7,
        items: [
          { title: "生存手册相关", text: "南哪助手、其他高校生存手册和苏州校区指南。", status: "已整理" },
          { title: "大气专业相关", text: "包括南赫资料分享渠道、气象行业资讯、招聘信息与人工智能气象相关信息源。", status: "已整理" },
          { title: "公开资料索引", text: "学院文件、学校办事入口和常用资料页，还需要继续补。", status: "待补充" },
        ],
      },
      {
        id: "global",
        title: "交换与出国",
        handbookPage: 7,
        items: [
          { title: "出国相关 / 交流交换项目", text: "南京大学交换项目入口、留学交流群、飞跃手册和申请经验。", status: "已整理" },
          { title: "大气出国", text: "大气科学升学定位、就业报告、交流群和国内外去向。", status: "已整理" },
          { title: "项目时效核对", text: "交换名额、申请条件和群聊信息变化较快，需要按学期核对。", status: "待补充" },
        ],
      },
      {
        id: "career-info",
        title: "保研与就业",
        handbookPage: 8,
        items: [
          { title: "保研", text: "南赫和其他大气院校的招生、夏令营与论坛信息。", status: "已整理" },
          { title: "公考选调", text: "南京大学公考选调交流群和基层研究相关信息。", status: "已整理" },
          { title: "直接就业信息", text: "大气、环境、数据和交叉行业的招聘与实习入口。", status: "待补充" },
        ],
      },
    ],
  },
  {
    slug: "training",
    label: "第二章",
    title: "培养体系",
    summary: "培养方案、课程介绍和专业方向。",
    symbol: "▦",
    tone: "yellow",
    quickLinks: ["培养方案", "课程介绍", "方向介绍"],
    source: { label: "学院官网｜人才培养", href: "https://nh.nju.edu.cn/rcpy/zyts.htm" },
    sections: [
      {
        id: "plan",
        title: "2.1 培养方案",
        handbookPage: 10,
        items: [
          { title: "培养方案怎么读", text: "先区分通识、公共、学科与专业课程，再核对学位学分、选修要求及实践学分。", status: "已整理" },
          { title: "入学年份版本", text: "2023、2024、2025、2026 级的方案和改动还没分开写。", status: "待补充" },
          { title: "课程先修关系图", text: "数学、物理、统计和专业课之间，哪些课最好先学。", status: "待补充" },
        ],
      },
      {
        id: "courses",
        title: "2.2 课程介绍",
        intro: "课程按年级排列。老师和考核方式可能会变，写经验时请带上年份。",
        handbookPage: 12,
        items: [
          { title: "大一上", text: "微积分 I、大学化学、大学英语、思政课，以及体育、北欧文化与社会、认识地球系统科学。", status: "已整理" },
          { title: "大一下", text: "微积分 II、普通物理 I、线性代数，包含课程情况、考核方式与分层学习建议。", status: "已整理" },
          { title: "大二部分", text: "普通物理 II、常微分方程、概率论与数理统计；后面的课还不全。", status: "已整理" },
          { title: "大三及以后", text: "专业核心课、实习、毕业设计和方向选修还没人写。", status: "待补充" },
        ],
      },
      {
        id: "directions",
        title: "2.3 方向介绍",
        handbookPage: 26,
        items: [
          { title: "大气动力学", text: "研究什么、要学哪些数学、国内外有哪些方向。", status: "已整理" },
          { title: "大气物理与大气电学", text: "辐射、云降水、大气电学，以及可以继续读的资料。", status: "已整理" },
          { title: "行星大气", text: "金星、火星、巨行星、冰巨星和冥王星的大气问题。", status: "已整理" },
          { title: "其他方向", text: "大气化学、气候变化、地球系统、人工智能等方向还没写。", status: "待补充" },
        ],
      },
    ],
  },
  {
    slug: "study",
    label: "第三章",
    title: "学习建议",
    summary: "选课、绩点、辅修、全英文教学、找导师和竞赛。",
    symbol: "↗",
    tone: "coral",
    quickLinks: ["选课与绩点", "英文与免修", "科研与竞赛"],
    source: { label: "学院官网｜学生手册", href: "https://nh.nju.edu.cn/rcpy/xssc.htm" },
    sections: [
      {
        id: "course-strategy",
        title: "选课与学业",
        handbookPage: 36,
        items: [
          { title: "3.1 选课策略与原则", text: "怎么排学分、怎么选课程层次，以及能不能旁听。", status: "已整理" },
          { title: "3.2 绩点（GPA）相关", text: "区分所有课程学分绩、学位课程学分绩及其常见使用场景。", status: "已整理", handbookPage: 38 },
          { title: "3.3 辅修", text: "以智能科学与技术、化学辅修为例，说明课程重叠、校区与时间冲突等现实问题。", status: "已整理", handbookPage: 38 },
        ],
      },
      {
        id: "teaching",
        title: "教学适应",
        handbookPage: 41,
        items: [
          { title: "3.4 如何应对全英文教学", text: "讨论专业术语、听课与阅读适应，不把“全英文”简单等同于无法跟上。", status: "已整理" },
          { title: "3.5 免修不免考", text: "包含申请流程、申请说明与适用动机；实际要求须以当年教务规则为准。", status: "已整理", handbookPage: 42 },
          { title: "各课程语言体验", text: "每门课上课、作业、考试和展示到底用什么语言。", status: "待补充" },
        ],
      },
      {
        id: "experience",
        title: "3.6 学习与科研经验",
        handbookPage: 42,
        items: [
          { title: "提前学习与住宿适应", text: "讨论提前预习数学基础、适应住宿与建立信息渠道。", status: "已整理" },
          { title: "提问交流与导师联系", text: "包含如何提问、何时联系导师、怎样选择导师和邮件中应写什么。", status: "已整理" },
          { title: "社交、课程与综合发展", text: "记录课程之外的信息获取、展示机会和个人节奏。", status: "已整理" },
          { title: "竞赛经验", text: "互联网+、挑战杯、数学建模，以及怎么兼顾上课。", status: "已整理" },
        ],
      },
    ],
  },
  {
    slug: "course-materials",
    label: "资料篇",
    title: "课程资料",
    summary: "课程笔记、复习资料和公开题目，先把位置留好。",
    symbol: "▤",
    tone: "green",
    quickLinks: ["课程笔记", "作业与习题", "按课程查找"],
    sections: [
      {
        id: "notes",
        title: "课程笔记",
        intro: "按课程放笔记、知识点和补充阅读。",
        items: [
          { title: "课堂笔记", text: "按课程和学期存放，写清老师与适用年份。", status: "待补充" },
          { title: "复习提纲", text: "期中、期末复习时用到的知识点清单。", status: "待补充" },
          { title: "补充阅读", text: "教材之外有帮助的公开课程、书目和网页。", status: "待补充" },
        ],
      },
      {
        id: "practice",
        title: "作业与习题",
        intro: "只放可以公开分享的内容，不上传盗版教材、付费资料或未经允许的试卷。",
        items: [
          { title: "作业提示", text: "容易卡住的地方和解题思路，不直接代写答案。", status: "待补充" },
          { title: "习题讨论", text: "典型题、常见错误和同学自己的解法。", status: "待补充" },
          { title: "公开样题", text: "老师或课程网站已经公开的样题与练习。", status: "待补充" },
        ],
      },
      {
        id: "by-course",
        title: "按课程查找",
        intro: "课程多起来以后，再按课程名称和学期细分。",
        items: [
          { title: "数学基础", text: "微积分、线性代数、常微分方程、概率统计等课程。", status: "待补充" },
          { title: "物理与化学基础", text: "普通物理、大学化学等基础课程。", status: "待补充" },
          { title: "专业课程", text: "大气与地球系统科学相关的专业课程。", status: "待补充" },
        ],
      },
    ],
  },
  {
    slug: "development",
    label: "第四章",
    title: "生涯规划",
    summary: "保研、考研、留学、就业和跨专业。",
    symbol: "△",
    tone: "blue",
    quickLinks: ["境内升学", "境外升学", "就业与跨专业"],
    source: { label: "学院官网｜招生就业", href: "https://nh.nju.edu.cn/zsjy.htm" },
    sections: [
      {
        id: "domestic",
        title: "4.1 境内升学",
        handbookPage: 48,
        items: [
          { title: "大气保研", text: "讨论成绩、科研、夏令营与预推免等准备，并提醒不同学院、年份的要求并不一致。", status: "已整理" },
          { title: "大气考研", text: "已有初步入口，但院校选择、专业课、时间线与真实案例仍需继续补充。", status: "待补充" },
          { title: "本院升学信息", text: "学院每年的硕博项目、招生通知和学生经验。", status: "待补充" },
        ],
      },
      {
        id: "overseas",
        title: "4.2 境外升学",
        handbookPage: 52,
        items: [
          { title: "留学 1：基础情况", text: "讨论留学目的、适合人群、申请流程、国家地区与硕博项目差异。", status: "已整理" },
          { title: "留学 2：申请材料", text: "覆盖 GPA、语言标化、文书、对口程度、科研实习、推荐信与选校排名。", status: "已整理" },
          { title: "留学 3：DIY 和找中介", text: "讨论中介作用、常见风险、DIY 事项、信息源与防骗提醒。", status: "已整理" },
          { title: "南赫真实申请案例", text: "等毕业年级同学自愿分享自己的申请经历。", status: "待补充" },
        ],
      },
      {
        id: "career-change",
        title: "4.3–4.4 就业与跨专业",
        handbookPage: 70,
        items: [
          { title: "4.3 直接就业", text: "目前内容很少，需要补充气象业务、科研院所、环境双碳、数据技术等真实去向。", status: "待补充" },
          { title: "4.4 跨专业", text: "转专业、跨专业申请和怎么补技能，目前还是施工中。", status: "待补充" },
          { title: "实习与求职时间线", text: "去哪里找岗位、准备什么材料、面试会遇到什么。", status: "待补充" },
        ],
      },
    ],
  },
  {
    slug: "exchange",
    label: "第五章",
    title: "交换学习",
    summary: "要不要交换、怎么申请，还有 Summer School 和暑研。",
    symbol: "⇄",
    tone: "green",
    quickLinks: ["交换利弊", "交换经历", "项目选择"],
    source: { label: "南京大学本科生交换系统", href: "http://elite.nju.edu.cn/exchangesystem/" },
    sections: [
      {
        id: "pros-cons",
        title: "5.1–5.3 交换利弊",
        handbookPage: 71,
        items: [
          { title: "Overview", text: "什么情况下适合出去交换，以及为什么它不一定适合每个人。", status: "已整理" },
          { title: "交换学习有哪些好处", text: "对绩点、学业、科研和社交可能有什么帮助。", status: "已整理" },
          { title: "交换学习有哪些坏处", text: "涉及免修不免考、证件、延毕风险、课程强度、安全与个人吐槽。", status: "已整理" },
        ],
      },
      {
        id: "experience",
        title: "5.4 交换经历",
        handbookPage: 74,
        items: [
          { title: "申请与语言准备", text: "以作者的交换申请与雅思准备经历作为个案参考。", status: "已整理" },
          { title: "课程、科研与连接", text: "记录交换期间的课程选择、科研机会、合作延续与校友连接。", status: "已整理" },
          { title: "更多学校案例", text: "现在主要只有一位作者的经历，其他项目还没人写。", status: "待补充" },
        ],
      },
      {
        id: "choice",
        title: "5.5–5.7 选择与延伸",
        handbookPage: 75,
        items: [
          { title: "By the end", text: "回答什么时候适合交换，以及应该怎样选择自己的交换项目。", status: "已整理" },
          { title: "Summer School / 暑研", text: "简要列出与长期交换不同的短期学习和科研机会。", status: "已整理" },
          { title: "写在最后", text: "保留手册对主动探索、认真准备和争取机会的结语。", status: "已整理" },
        ],
      },
    ],
  },
  {
    slug: "life",
    label: "第六章",
    title: "校园生活",
    summary: "新生适应、吃饭、理财和 AI 使用。",
    symbol: "⌂",
    tone: "yellow",
    quickLinks: ["新生适应", "食物相关", "AI 辅助学习"],
    source: { label: "学院官网｜校园生活", href: "https://nh.nju.edu.cn/xysh.htm" },
    sections: [
      {
        id: "freshman",
        title: "6.1 新生适应与校园经验",
        handbookPage: 76,
        items: [
          { title: "志愿、学习与生活适应", text: "讨论志愿活动、社会实践、全英文教学、宿舍关系、社交与长期提升。", status: "已整理" },
          { title: "信息渠道、学生工作与校园生活", text: "整理信息来源、书院与学院学生工作、学习策略以及校园生活心态。", status: "已整理" },
          { title: "选课、活动与人际交往", text: "补充通识课、志愿时长、校园活动与人际交往经验。", status: "已整理" },
          { title: "苏州校区专项生活指南", text: "苏州校区的宿舍、交通、办事和学习空间还没写全。", status: "待补充" },
        ],
      },
      {
        id: "food-money",
        title: "6.2–6.3 饮食与金钱",
        handbookPage: 82,
        items: [
          { title: "食堂", text: "包含鼓楼与仙林食堂体验；苏州校区食堂仍需要单独补充。", status: "已整理" },
          { title: "鼓楼附近堂食与外卖", text: "早餐、正餐和外卖都写了一些，主观口味仅供参考。", status: "已整理" },
          { title: "关于金钱观和理财 QwQ", text: "提供一般性提醒，不构成投资或专业财务建议。", status: "已整理", handbookPage: 85 },
        ],
      },
      {
        id: "ai",
        title: "6.4–6.5 AI 与学习",
        handbookPage: 85,
        items: [
          { title: "如何使用 AI 辅助学习", text: "从认知与使用讲起，覆盖常见工具、Prompt、Context、幻觉、Agent、Skills 与 MCP。", status: "已整理" },
          { title: "课程、科研与编程", text: "整理 AI 辅助课程学习、论文阅读、科研、编程、数据分析和 GitHub 协作的具体方法。", status: "已整理" },
          { title: "工作流、学术诚信与隐私", text: "强调核验结果、遵守课程要求、保护数据与未发表成果，避免让工具替代自己的判断。", status: "已整理" },
          { title: "AI 时代：如何与变化共处", text: "讨论基础能力、判断力、创造力，以及人在快速变化环境中的独特价值。", status: "已整理" },
        ],
      },
    ],
  },
  {
    slug: "contribute",
    label: "共建篇",
    title: "共建指南",
    summary: "想补内容、改错字或更新链接，就从这里开始。",
    symbol: "+",
    tone: "coral",
    quickLinks: ["可以写什么", "怎么提交", "内容边界"],
    sections: [
      {
        id: "what",
        title: "可以写什么",
        items: [
          { title: "补全现有章节", text: "优先补充手册已标明施工中或内容较少的直接就业、跨专业、大气考研、苏州生活等部分。", status: "已整理" },
          { title: "增加不同经验", text: "课程、导师、交换与升学没有唯一答案，请注明适用年级、时间和个人背景。", status: "已整理" },
          { title: "修正过期信息", text: "政策、课程、链接和项目变化时，请保留旧版本的时间标签并补充最新依据。", status: "已整理" },
        ],
      },
      {
        id: "how",
        title: "怎么提交",
        items: [
          { title: "不会 GitHub", text: "以后会加投稿表单或邮箱，不会 GitHub 也能写。", status: "待补充" },
          { title: "会用 GitHub", text: "未来可向对应页面提交修改，并说明适用年级、信息来源和主要改动。", status: "待补充", href: "https://github.com/NJUNHI" },
          { title: "只想纠错", text: "未来可以通过 Issue 指出页面、原文、建议修改和核对依据。", status: "待补充" },
        ],
      },
      {
        id: "rules",
        title: "内容边界",
        items: [
          { title: "尊重隐私", text: "不公开个人电话、私人邮箱、群二维码、成绩与未经同意的个人经历。", status: "已整理" },
          { title: "尊重版权", text: "不上传盗版教材、未经授权的试卷或付费资料；标明作者与来源信息。", status: "已整理" },
          { title: "保持可核对", text: "事实写明来源，经验写明时间和适用范围；确实不知道时就标记“待补充”。", status: "已整理" },
        ],
      },
    ],
  },
];

export type SearchEntry = {
  title: string;
  description: string;
  category: string;
  href: string;
  searchText: string;
};

export const searchEntries: SearchEntry[] = categories.flatMap((category) => [
  {
    title: category.title,
    description: category.summary,
    category: category.label,
    href: `/wiki/${category.slug}`,
    searchText: `${category.title} ${category.summary} ${category.quickLinks.join(" ")}`.toLowerCase(),
  },
  ...category.sections.flatMap((section) => section.items.map((item) => ({
    title: item.title,
    description: item.text,
    category: category.title,
    href: `/wiki/${category.slug}#${section.id}`,
    searchText: `${category.title} ${section.title} ${item.title} ${item.text}`.toLowerCase(),
  }))),
]);

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
