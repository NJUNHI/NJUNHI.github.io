export type OfficialNarrativeSection = {
  title: string;
  paragraphs?: string[];
  points?: string[];
};

export const officialNarratives: Record<"introduction" | "advantages", { heading: string; paragraphs: string[]; sections: OfficialNarrativeSection[] }> = {
  introduction: {
    heading: "学院概况",
    paragraphs: [
      "南京大学南京赫尔辛基大气与地球系统科学学院，简称“南赫学院”，是南京大学与芬兰赫尔辛基大学共同建设的中外合作办学机构。学院于 2022 年 4 月获教育部批准，可开展本科、硕士和博士多层次学历教育，并授予两校相应层次的学位。",
      "学院建立在两校十余年的大气与地球系统科学合作基础上。双方共同组织师资、培养和管理，把各自在相关领域的学科优势放到同一套培养体系中。",
      "学院关注气候变化、可持续发展等科学前沿和现实需求，也重视大气科学与人工智能、社会经济、生态健康等方向的交叉。2023 年，学院开始招收首批本、硕、博学生，主要在南京大学苏州校区培养。",
    ],
    sections: [
      { title: "人才培养", points: ["本、硕、博采用全英文培养方案", "主要在境内完成培养，可获得国际双学位", "除专业训练外，也强调综合能力和素质培养"] },
      { title: "科研创新", points: ["面向大气与地球系统科学的重要前沿问题", "建设和使用 SORPES 2.0 等科研基础设施", "探索跨学科、融合式的科研组织方式"] },
      { title: "人才队伍", points: ["引进高水平学者和研究团队", "汇聚两校及全球相关领域学者", "采用长聘与准聘相结合的教师制度"] },
      { title: "社会服务", points: ["回应气候变化与防灾减灾需求", "参与区域发展和生态文明建设", "提升科研与人才培养的国际影响力"] },
    ],
  },
  advantages: {
    heading: "两校基础与学科融合",
    paragraphs: [
      "南赫的培养和科研建立在南京大学与赫尔辛基大学各自的学科基础上。两校在大气与地球系统科学领域长期合作，再把观测平台、科研团队和国际化培养放到学院中共同推进。",
    ],
    sections: [
      {
        title: "南京大学大气科学",
        paragraphs: ["南京大学创办于 1902 年，也是中国现代气象学科的发源地。大气科学学科入选国家一流建设学科和教育部基础学科拔尖学生培养计划 2.0 基地。"],
        points: ["为气象、水利、环保和国防等领域培养了 7000 余名人才", "校友中包括 13 位两院院士", "在大气、地球、海洋、环境和社会经济等方向具有交叉基础"],
      },
      {
        title: "赫尔辛基大学",
        paragraphs: ["赫尔辛基大学创办于 1640 年，是芬兰历史悠久、规模较大的综合性大学，在大气环境和气候变化研究方面具有国际影响力。"],
        points: ["在大气与地球系统科学领域拥有长期研究积累", "建设 SMEAR II 等地球系统过程观测平台", "在大气物理、化学、生命科学和人工智能等方向具有交叉优势"],
      },
      {
        title: "长期科研合作",
        paragraphs: ["两校合作覆盖联合观测、实验室建设、科研项目和人才交流。马库·库马拉（Markku Kulmala）等学者长期参与合作，相关团队在地球系统观测和大气过程研究方面形成了稳定基础。"],
      },
      {
        title: "联合培养",
        paragraphs: ["学院把南京大学与赫尔辛基大学的课程、师资和研究资源放进同一培养体系，强调大气科学与现代观测、地球系统、气候变化、绿色发展等问题之间的联系。"],
      },
    ],
  },
};

export const collaborationTimeline = [
  { date: "2009.10", text: "南京大学气候与全球变化研究院成立。" },
  { date: "2012.05", text: "陈骏与符淙斌共同为 SORPES 观测基地揭牌。" },
  { date: "2013.04", text: "马库·库马拉（Markku Kulmala）受聘为南京大学名誉教授。" },
  { date: "2015.04", text: "赫尔辛基大学校长朱克·科拉（Jukka Kola）访问南京大学国际合作联合实验室并签约揭牌。" },
  { date: "2018.09", text: "芬兰环境、能源与住房部长基莫·蒂利凯宁（Kimmo Tiilikainen）访问联合实验室及 SORPES 站。" },
  { date: "2019.01", text: "南京大学代表团访问赫尔辛基大学。" },
  { date: "2019.03", text: "赫尔辛基大学校监卡尔·哈梅里（Kaarle Hämeri）来访并参加联合实验室建设期验收。" },
  { date: "2020.01", text: "马库·库马拉获得中华人民共和国国际科学技术合作奖。" },
  { date: "2020.12", text: "南赫学院筹建启动。" },
  { date: "2022.04", text: "教育部批准设立南赫学院。" },
  { date: "2023.09", text: "南赫学院举行开学典礼。" },
  { date: "2024.11", text: "马库·库马拉率赫尔辛基大学代表团访问南京大学。" },
];

export type AdministrationPerson = {
  name: string;
  role: string;
  email: string;
  phone?: string;
};

export const administrationPeople: AdministrationPerson[] = [
  { name: "符淙斌", role: "名誉院长", email: "fcb@nju.edu.cn" },
  { name: "丁爱军", role: "院长", email: "dingaj@nju.edu.cn" },
  { name: "王海鲲", role: "副院长", email: "wanghk@nju.edu.cn" },
  { name: "徐昕", role: "副院长", email: "janexu@nju.edu.cn", phone: "0512-68768150" },
  { name: "张仕鹏", role: "院长助理", email: "shipeng.zhang@nju.edu.cn" },
  { name: "鄢超", role: "院长助理", email: "chaoyan@nju.edu.cn" },
  { name: "薛廉", role: "院长助理", email: "lian.xue@nju.edu.cn" },
  { name: "戴贝叶", role: "本科生辅导员", email: "daibeiye@nju.edu.cn", phone: "0512-68768435" },
  { name: "唐明浩", role: "研究生辅导员", email: "tangminghao@nju.edu.cn", phone: "0512-68766805" },
  { name: "鲍小雨", role: "本科生教务秘书", email: "baoxy@nju.edu.cn", phone: "0512-68768435" },
  { name: "黄梦苏", role: "学科秘书", email: "mshuang@nju.edu.cn", phone: "025-89661312" },
  { name: "王哲", role: "科研秘书", email: "wangzhe@nju.edu.cn", phone: "025-89681151 / 025-83595305" },
  { name: "甘瓅", role: "财务秘书", email: "ganli@nju.edu.cn", phone: "025-89681151" },
  { name: "崔紫荆", role: "人事秘书", email: "cccui@nju.edu.cn", phone: "0512-68768432" },
  { name: "严所金", role: "外事秘书", email: "suojin.yan@nju.edu.cn", phone: "0512-68763437" },
  { name: "张桐", role: "行政秘书", email: "zttong@nju.edu.cn", phone: "0512-68763437" },
];

export const campusContacts = [
  {
    campus: "苏州校区",
    address: "苏州市虎丘区太湖大道 1520 号，南雍楼东 A3 楼",
    postcode: "215163",
    phone: "86-512-68768432",
  },
  {
    campus: "鼓楼校区",
    address: "南京市鼓楼区汉口路 22 号，李四光工作室",
    postcode: "210008",
    phone: "86-25-83595305",
  },
  {
    campus: "仙林校区",
    address: "南京市栖霞区仙林大道 163 号，大气楼 5 楼 B 区",
    postcode: "210023",
    phone: "86-25-89661312",
  },
];
