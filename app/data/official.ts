import type { SearchEntry } from "./wiki";

export const officialOverview = [
  {
    slug: "introduction",
    label: "学院总览",
    title: "学院简介",
    text: "南赫是什么、怎么培养、主要在哪里上课。",
    officialHref: "https://nh.nju.edu.cn/xyzl/xyjj.htm",
    symbol: "01",
    facts: [
      { title: "合作院校", text: "南京大学与芬兰赫尔辛基大学共同开展人才培养与科研合作。" },
      { title: "设立时间", text: "学院于 2022 年 4 月获教育部批准设立。" },
      { title: "培养层次", text: "学院开展本科、硕士和博士层次的人才培养，2023 年迎来首批学生。" },
      { title: "主要地点", text: "学院以南京大学苏州校区为主要办学地点。" },
    ],
  },
  {
    slug: "advantages",
    label: "学院总览",
    title: "办学优势",
    text: "双学位、联合培养、科研平台和国际交流。",
    officialHref: "https://nh.nju.edu.cn/xyzl/bxys.htm",
    symbol: "02",
    facts: [
      { title: "联合培养", text: "不少课程和培养环节由两校老师共同参与。" },
      { title: "科研平台", text: "人才培养与大气和地球系统科学研究平台紧密结合。" },
      { title: "交叉方向", text: "不只学大气科学，也会接触地球系统和其他交叉方向。" },
      { title: "国际交流", text: "学生可关注学院发布的交流、联合培养和双学位相关安排。" },
    ],
  },
  {
    slug: "history",
    label: "学院总览",
    title: "合作历程",
    text: "从两校科研合作、SORPES 观测基地，到学院获批设立与正式开学。",
    officialHref: "https://nh.nju.edu.cn/xyzl/hzlc.htm",
    symbol: "03",
    facts: [
      { title: "2009—2012", text: "双方推进联合研究，并于 2012 年举行 SORPES 观测基地揭牌仪式。" },
      { title: "2015", text: "双方继续深化互访与联合实验室合作。" },
      { title: "2020—2022", text: "学院筹设工作启动，并于 2022 年 4 月获批设立。" },
      { title: "2023—2024", text: "学院举行开学典礼，随后继续推进两校交流与合作。" },
    ],
  },
  {
    slug: "faculty",
    label: "学院总览",
    title: "师资队伍",
    text: "专任教师的研究方向、代表论文与个人主页。",
    officialHref: "https://nh.nju.edu.cn/xyzl/szdw/nhjs.htm",
    symbol: "04",
    facts: [
      { title: "南赫教师", text: "参与学院教学、科研与人才培养的教师信息。" },
      { title: "南赫专任教师", text: "学院专任教师的官方介绍与研究方向。" },
      { title: "研究生导师", text: "官网分别列出博士生导师与专业学位硕士生导师。" },
      { title: "专职科研", text: "查看学院专职科研人员的公开信息。" },
    ],
  },
  {
    slug: "administration",
    label: "学院总览",
    title: "管理队伍",
    text: "学院行政、教务和学生工作联系人。",
    officialHref: "https://nh.nju.edu.cn/xyzl/gldw.htm",
    symbol: "05",
    facts: [
      { title: "学院事务", text: "查询学院综合行政与日常事务相关岗位。" },
      { title: "教学事务", text: "课程、培养与教务问题应按官网公布的岗位联系。" },
      { title: "学生工作", text: "学生事务相关联系方式以学院最新公开信息为准。" },
    ],
  },
  {
    slug: "contact",
    label: "学院总览",
    title: "联系我们",
    text: "苏州、鼓楼和仙林校区的地址与联系方式。",
    officialHref: "https://nh.nju.edu.cn/xyzl/lxwm.htm",
    symbol: "06",
    facts: [
      { title: "苏州校区", text: "学院主要办学地点与相关办公信息。" },
      { title: "鼓楼校区", text: "查看官网公布的鼓楼校区联系地址。" },
      { title: "仙林校区", text: "查看官网公布的仙林校区联系地址。" },
    ],
  },
] as const;

export const officialServices = [
  {
    label: "学院官方网站",
    description: "学院信息、通知公告与官方政策",
    href: "https://nh.nju.edu.cn/",
  },
  {
    label: "南京大学网上办事服务大厅",
    description: "校内办事事项与在线服务入口",
    href: "https://ehall.nju.edu.cn/ywtb-portal/official/index.html",
  },
] as const;

export const officialSearchEntries: SearchEntry[] = [
  ...officialOverview.map((item) => ({
    title: item.title,
    description: item.text,
    category: "学院官方信息",
    href: `/official/${item.slug}`,
    searchText: `${item.title} ${item.text} 学院官方信息`.toLowerCase(),
  })),
  ...officialServices.map((item) => ({
    title: item.label,
    description: item.description,
    category: "官方入口",
    href: item.href,
    searchText: `${item.label} ${item.description} 官方入口`.toLowerCase(),
  })),
];
