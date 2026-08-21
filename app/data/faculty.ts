export type FacultyPublication = {
  title: string;
  venue: string;
  year: string;
  href?: string;
};

export type FacultyMember = {
  name: string;
  englishName: string;
  title: string;
  directions: string[];
  publications: FacultyPublication[];
  profileHref: string;
};

export const facultyRosterHref = "https://nh.nju.edu.cn/xyzl/szdw/nhzrjs.htm";
export const allFacultyHref = "https://nh.nju.edu.cn/xyzl/szdw/nhjs.htm";

export const fullTimeFaculty: FacultyMember[] = [
  {
    name: "保云涛",
    englishName: "Bao Yuntao",
    title: "助理教授",
    directions: ["地球系统模拟", "气候动力学", "气候信息融合与稳定水同位素"],
    publications: [
      { title: "Climate Simulations and Ice Core Data Highlight the Holocene Conundrum over Tropical Mountains", venue: "Communications Earth & Environment", year: "2025" },
      { title: "Model Sensitivity to Insolation Forcing and Uncertainties in Holocene Temperature Simulations", venue: "Paleoceanography and Paleoclimatology", year: "2025" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/8281.htm",
  },
  {
    name: "陈婕",
    englishName: "Chen Jie",
    title: "助理教授、博士生导师",
    directions: ["登陆热带气旋动力机制", "高分辨率数值模拟", "近地面风场与灾害风险"],
    publications: [
      { title: "A Model for the Tropical Cyclone Wind Field Response to Idealized Landfall", venue: "Journal of the Atmospheric Sciences", year: "2023" },
      { title: "A New Framework for Evaluating Model Simulated Inland Tropical Cyclone Wind Fields", venue: "Geophysical Research Letters", year: "2023" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7761.htm",
  },
  {
    name: "Otso Peräkylä",
    englishName: "Otso Peräkylä",
    title: "助理教授",
    directions: ["大气氧化与自由基化学", "生物源 VOC 氧化", "二次有机气溶胶", "地表—大气相互作用"],
    publications: [
      { title: "Large Gas-Phase Source of Esters and Other Accretion Products in the Atmosphere", venue: "Journal of the American Chemical Society", year: "2023", href: "https://doi.org/10.1021/jacs.2c10398" },
      { title: "Experimental investigation into the volatilities of highly oxygenated organic molecules (HOMs)", venue: "Atmospheric Chemistry and Physics", year: "2020", href: "https://doi.org/10.5194/acp-20-649-2020" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/8091.htm",
  },
  {
    name: "齐西萌",
    englishName: "Qi Ximeng",
    title: "助理教授",
    directions: ["大气新粒子生成", "气溶胶—云相互作用", "气溶胶污染与气候变化"],
    publications: [
      { title: "Aerosol-Cloud Interactions Near Cloud Base Deteriorating the Haze Pollution in East China", venue: "Geophysical Research Letters", year: "2024", href: "https://doi.org/10.1029/2024GL109975" },
      { title: "New particle formation induced by anthropogenic-biogenic interactions in the southeastern Tibetan Plateau", venue: "Atmospheric Chemistry and Physics", year: "2024", href: "https://doi.org/10.5194/acp-24-2535-2024" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7691.htm",
  },
  {
    name: "Roope Halonen",
    englishName: "Roope Halonen",
    title: "助理教授",
    directions: ["气相动力学与团簇增长", "大气成核数值模拟", "分子模拟与团簇热力学"],
    publications: [
      { title: "Atomistic insights into argon clusters and nucleation dynamics", venue: "Journal of Aerosol Science", year: "2024", href: "https://doi.org/10.1016/j.jaerosci.2024.106406" },
      { title: "Assessment of Anharmonicities in Clusters: Developing and Validating a Minimum-Information Partition Function", venue: "Journal of Chemical Theory and Computation", year: "2024", href: "https://doi.org/10.1021/acs.jctc.4c00121" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7711.htm",
  },
  {
    name: "Sandro M. Ferreira Veiga",
    englishName: "Sandro M. Ferreira Veiga",
    title: "助理教授",
    directions: ["区域水文气候变化", "极端天气气候事件", "热带气候模态及区域影响"],
    publications: [
      { title: "Evaluation of metrics for assessing dipolar climate patterns in climate models", venue: "Climate Dynamics", year: "2024", href: "https://doi.org/10.1007/s00382-024-07220-3" },
      { title: "The response of the East Asian summer rainfall to more extreme El Niño events in future climate scenarios", venue: "Atmospheric Research", year: "2022", href: "https://doi.org/10.1016/j.atmosres.2021.105983" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7701.htm",
  },
  {
    name: "孙德征",
    englishName: "Sun Dezheng",
    title: "教授",
    directions: ["气候系统稳定性", "ENSO 非线性动力学", "热带海洋—大气耦合", "年代际气候变率"],
    publications: [
      { title: "Dynamic ocean-atmosphere coupling: a thermostat for the tropics", venue: "Science", year: "1996" },
      { title: "El Niño: a coupled response to radiative heating?", venue: "Geophysical Research Letters", year: "1997" },
    ],
    profileHref: "https://dezhengsun.org/index-original",
  },
  {
    name: "王海鲲",
    englishName: "Wang Haikun",
    title: "教授",
    directions: ["人为源大气排放及社会经济驱动", "大气环境的生态健康影响", "气候环境政策费用效益"],
    publications: [
      { title: "Air quality improvements can strengthen China’s food security", venue: "Nature Food", year: "2024" },
      { title: "Health benefits of on-road transportation pollution control programs in China", venue: "Proceedings of the National Academy of Sciences", year: "2020" },
    ],
    profileHref: "https://as.nju.edu.cn/c3/69/c11339a443241/page.htm",
  },
  {
    name: "王文杰",
    englishName: "Wang Wenjie",
    title: "副教授",
    directions: ["大气臭氧污染化学模拟", "O₃ 与 PM₂.₅ 协同控制", "大气氧化性", "气候变化与臭氧污染"],
    publications: [
      { title: "Ozone pollution mitigation strategy informed by long-term trends of atmospheric oxidation capacity", venue: "Nature Geoscience", year: "2024" },
      { title: "The impact of aerosols on photolysis frequencies and ozone production in Beijing during 2012–2015", venue: "Atmospheric Chemistry and Physics", year: "2019" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7751.htm",
  },
  {
    name: "王玉婷",
    englishName: "Wang Yuting",
    title: "助理教授、博士生导师",
    directions: ["多尺度大气化学耦合模拟", "城市微尺度大涡模拟", "湍流—化学相互作用", "FTIR 遥感"],
    publications: [
      { title: "Role of turbulence in ozone chemistry: Segregation effect implicated from multiscale modeling over Hong Kong", venue: "Atmospheric Environment", year: "2024", href: "https://doi.org/10.1016/j.atmosenv.2024.120443" },
      { title: "Does downscaling improve the performance of urban ozone modeling?", venue: "Geophysical Research Letters", year: "2023", href: "https://doi.org/10.1029/2023GL104761" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7811.htm",
  },
  {
    name: "夏璊",
    englishName: "Xia Men",
    title: "助理教授",
    directions: ["活性卤素化学", "活性氮氧化物非均相过程", "多相态化学箱式模型", "大气监测与质谱"],
    publications: [
      { title: "Chloramine chemistry as a missing link in atmospheric chlorine cycling", venue: "Science Advances", year: "2025", href: "https://doi.org/10.1126/sciadv.adv4298" },
      { title: "Chlorine Activation in Marine Air: Insights From Chemical Budgets of Molecular Chlorine and Hypochlorous Acid", venue: "Journal of Geophysical Research: Atmospheres", year: "2025", href: "https://doi.org/10.1029/2024JD042568" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7731.htm",
  },
  {
    name: "薛廉",
    englishName: "Xue Lian",
    title: "助理教授",
    directions: ["大气污染—天气气候相互作用", "野火—天气气候效应", "地球系统数值模拟"],
    publications: [
      { title: "ENSO and Southeast Asian biomass burning modulate subtropical trans-Pacific ozone transport", venue: "National Science Review", year: "2020", href: "https://doi.org/10.1093/nsr/nwaa132" },
      { title: "Biomass burning plumes from Indochina toward southern China: Predominant synoptic weather processes and interactions", venue: "Journal of Geophysical Research: Atmospheres", year: "2025", href: "https://doi.org/10.1029/2024JD041813" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7781.htm",
  },
  {
    name: "鄢超",
    englishName: "Yan Chao",
    title: "副教授",
    directions: ["大气新粒子生成", "高氧化有机分子形成", "化学电离质谱分析技术"],
    publications: [
      { title: "Increasing contribution of nighttime nitrogen chemistry to wintertime haze formation in Beijing observed during COVID-19 lockdowns", venue: "Nature Geoscience", year: "2023", href: "https://doi.org/10.1038/s41561-023-01285-1" },
      { title: "NO at low concentration can enhance the formation of highly oxygenated biogenic molecules in the atmosphere", venue: "Nature Communications", year: "2023", href: "https://doi.org/10.1038/s41467-023-39066-4" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7661.htm",
  },
  {
    name: "杨博雷",
    englishName: "Yang Bolei",
    title: "助理教授",
    directions: ["极端天气气候事件", "大气湿对流", "热带气旋演变与预报"],
    publications: [
      { title: "The Control of Tropical Cyclone Wind Structure on Inner and Outer Rainband Formation: A Balanced Dynamics Perspective", venue: "Journal of the Atmospheric Sciences", year: "2026" },
      { title: "Internal Oscillations of Tropical Mesoscale Convective Disturbances", venue: "Journal of the Atmospheric Sciences", year: "2025" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7791.htm",
  },
  {
    name: "越思瑶",
    englishName: "Yue Siyao",
    title: "助理教授、博士生导师",
    directions: ["大气生物学与生物气溶胶", "生物气溶胶地球系统过程", "环境健康效应", "质谱与荧光检测"],
    publications: [
      { title: "Mass Deposition of Microbes from Wildfire Smoke to the Sea Surface Microlayer", venue: "Limnology and Oceanography", year: "2025", href: "https://doi.org/10.1002/lno.70078" },
      { title: "Brown Carbon from Biomass Burning Imposes Strong Circum-Arctic Warming", venue: "One Earth", year: "2022", href: "https://doi.org/10.1016/j.oneear.2022.02.006" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7721.htm",
  },
  {
    name: "张仕鹏",
    englishName: "Zhang Shipeng",
    title: "副教授、博士生导师",
    directions: ["气溶胶气候效应", "气候变化下降水响应", "地球工程", "气候模型与机器学习"],
    publications: [
      { title: "Sea surface warming patterns drive hydrological sensitivity uncertainties", venue: "Nature Climate Change", year: "2023", href: "https://doi.org/10.1038/s41558-023-01678-5" },
      { title: "Anthropogenic aerosols modulated twentieth-century Sahel rainfall variability via their impacts on North Atlantic sea surface temperature", venue: "Geophysical Research Letters", year: "2022", href: "https://doi.org/10.1029/2021GL095629" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7771.htm",
  },
  {
    name: "郑昊天",
    englishName: "Zheng Haotian",
    title: "助理教授、博士生导师",
    directions: ["大气污染物排放清单", "气溶胶数值模拟", "污染来源解析", "PM₂.₅ 毒性与健康效应"],
    publications: [
      { title: "Control of Toxicity of Fine Particulate Matter Emissions in China", venue: "Nature", year: "2025" },
      { title: "Achieving health-oriented air pollution control requires integrating unequal toxicities of industrial particles", venue: "Nature Communications", year: "2023" },
    ],
    profileHref: "https://nh.nju.edu.cn/info/1471/7681.htm",
  },
];
