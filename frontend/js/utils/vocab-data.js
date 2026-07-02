// 雅思核心词汇数据库
// 精选词条优先提供中文释义；完整 IELTS-4000 词库作为补充。

import { IELTS_4000_DATABASE, IELTS_4000_SOURCE, IELTS_4000_VERSION } from "./ielts-4000-data.js";

export const VOCAB_VERSION = `2026-07-02-b+${IELTS_4000_VERSION}`;

export const VOCAB_SOURCES = [
  IELTS_4000_SOURCE,
  "Academic Word List",
  "IELTS 官方与 British Council/IDP 公开备考主题",
  "项目自整理雅思高频写作与阅读词",
];

export const CURATED_VOCAB_DATABASE = [
  // Education & research
  word("academic", "academic", "/ˌækəˈdemɪk/", "adj. 学术的；理论的", "He has an academic background in physics.", "education"),
  word("analyze", "analyze", "/ˈænəlaɪz/", "v. 分析", "We need to analyze the data carefully.", "education"),
  word("approach", "approach", "/əˈprəʊtʃ/", "n. 方法；途径 v. 接近", "This approach is more effective for beginners.", "education"),
  word("assess", "assess", "/əˈses/", "v. 评估；评价", "Teachers assess students through essays and exams.", "education"),
  word("assume", "assume", "/əˈsjuːm/", "v. 假设；承担", "Researchers should not assume the result before testing.", "education"),
  word("concept", "concept", "/ˈkɒnsept/", "n. 概念；观念", "The concept of lifelong learning is widely accepted.", "education"),
  word("context", "context", "/ˈkɒntekst/", "n. 背景；语境", "A word is easier to remember in context.", "education"),
  word("criteria", "criteria", "/kraɪˈtɪəriə/", "n. 标准；准则", "The essay is marked according to clear criteria.", "education"),
  word("derive", "derive", "/dɪˈraɪv/", "v. 获得；源自", "Many conclusions derive from long-term observation.", "education"),
  word("evidence", "evidence", "/ˈevɪdəns/", "n. 证据", "Strong evidence is needed to support this claim.", "education"),
  word("hypothesis", "hypothesis", "/haɪˈpɒθəsɪs/", "n. 假设", "The experiment was designed to test a hypothesis.", "education"),
  word("methodology", "methodology", "/ˌmeθəˈdɒlədʒi/", "n. 方法论", "The methodology section explains how the survey was conducted.", "education"),
  word("outcome", "outcome", "/ˈaʊtkʌm/", "n. 结果；成果", "Better feedback can improve learning outcomes.", "education"),
  word("participate", "participate", "/pɑːˈtɪsɪpeɪt/", "v. 参与", "Students are encouraged to participate in class discussions.", "education"),
  word("principle", "principle", "/ˈprɪnsəpl/", "n. 原则；原理", "Fairness is an important principle in education.", "education"),
  word("research", "research", "/rɪˈsɜːtʃ/", "n./v. 研究", "The research focuses on digital learning habits.", "education"),
  word("significant", "significant", "/sɪɡˈnɪfɪkənt/", "adj. 重要的；显著的", "There was a significant improvement in test scores.", "education"),
  word("theory", "theory", "/ˈθɪəri/", "n. 理论", "The theory is useful but difficult to prove.", "education"),

  // Environment
  word("biodiversity", "biodiversity", "/ˌbaɪəʊdaɪˈvɜːsəti/", "n. 生物多样性", "Biodiversity is essential for a stable ecosystem.", "environment"),
  word("carbon", "carbon", "/ˈkɑːbən/", "n. 碳", "Carbon emissions are a major cause of climate change.", "environment"),
  word("climate", "climate", "/ˈklaɪmət/", "n. 气候", "Climate change affects food production worldwide.", "environment"),
  word("conservation", "conservation", "/ˌkɒnsəˈveɪʃn/", "n. 保护；保存", "Wildlife conservation requires public support.", "environment"),
  word("contaminate", "contaminate", "/kənˈtæmɪneɪt/", "v. 污染", "Factories may contaminate nearby rivers.", "environment"),
  word("degradation", "degradation", "/ˌdeɡrəˈdeɪʃn/", "n. 退化；恶化", "Soil degradation threatens agricultural productivity.", "environment"),
  word("ecosystem", "ecosystem", "/ˈiːkəʊsɪstəm/", "n. 生态系统", "A healthy ecosystem supports many species.", "environment"),
  word("emission", "emission", "/ɪˈmɪʃn/", "n. 排放", "Cities are trying to reduce vehicle emissions.", "environment"),
  word("extinct", "extinct", "/ɪkˈstɪŋkt/", "adj. 灭绝的", "Some animals became extinct because of habitat loss.", "environment"),
  word("habitat", "habitat", "/ˈhæbɪtæt/", "n. 栖息地", "Urban expansion can destroy natural habitats.", "environment"),
  word("pollution", "pollution", "/pəˈluːʃn/", "n. 污染", "Air pollution is linked to respiratory disease.", "environment"),
  word("renewable", "renewable", "/rɪˈnjuːəbl/", "adj. 可再生的", "Solar power is a renewable source of energy.", "environment"),
  word("resource", "resource", "/rɪˈsɔːs/", "n. 资源", "Water is a limited resource in many regions.", "environment"),
  word("sustainable", "sustainable", "/səˈsteɪnəbl/", "adj. 可持续的", "Sustainable transport can make cities cleaner.", "environment"),
  word("waste", "waste", "/weɪst/", "n./v. 废物；浪费", "Reducing food waste can save money and resources.", "environment"),

  // Technology & media
  word("automation", "automation", "/ˌɔːtəˈmeɪʃn/", "n. 自动化", "Automation may change the nature of many jobs.", "technology"),
  word("device", "device", "/dɪˈvaɪs/", "n. 设备", "Mobile devices are common in modern classrooms.", "technology"),
  word("digital", "digital", "/ˈdɪdʒɪtl/", "adj. 数字的", "Digital tools can make learning more flexible.", "technology"),
  word("efficient", "efficient", "/ɪˈfɪʃnt/", "adj. 高效的", "This system is more efficient than manual recording.", "technology"),
  word("innovation", "innovation", "/ˌɪnəˈveɪʃn/", "n. 创新；革新", "Technological innovation drives economic growth.", "technology"),
  word("interface", "interface", "/ˈɪntəfeɪs/", "n. 界面", "A simple interface helps users focus on learning.", "technology"),
  word("network", "network", "/ˈnetwɜːk/", "n. 网络", "A stable network is necessary for online classes.", "technology"),
  word("privacy", "privacy", "/ˈprɪvəsi/", "n. 隐私", "Data privacy is a growing concern for internet users.", "technology"),
  word("reliable", "reliable", "/rɪˈlaɪəbl/", "adj. 可靠的", "Students need reliable access to learning platforms.", "technology"),
  word("remote", "remote", "/rɪˈməʊt/", "adj. 远程的；偏远的", "Remote work has become more common after the pandemic.", "technology"),
  word("software", "software", "/ˈsɒftweə/", "n. 软件", "The software records vocabulary progress automatically.", "technology"),
  word("technology", "technology", "/tekˈnɒlədʒi/", "n. 技术；科技", "Technology has changed the way people communicate.", "technology"),
  word("virtual", "virtual", "/ˈvɜːtʃuəl/", "adj. 虚拟的", "Virtual meetings can save travel time.", "technology"),

  // Society & culture
  word("authority", "authority", "/ɔːˈθɒrəti/", "n. 权威；当局", "Local authorities should improve public transport.", "society"),
  word("community", "community", "/kəˈmjuːnəti/", "n. 社区；群体", "A strong community can support elderly residents.", "society"),
  word("conflict", "conflict", "/ˈkɒnflɪkt/", "n. 冲突", "Cultural conflict may occur in diverse societies.", "society"),
  word("culture", "culture", "/ˈkʌltʃə/", "n. 文化", "Culture influences people's values and habits.", "society"),
  word("demographic", "demographic", "/ˌdeməˈɡræfɪk/", "adj. 人口统计的", "Demographic change affects housing demand.", "society"),
  word("diverse", "diverse", "/daɪˈvɜːs/", "adj. 多样的；不同的", "Large cities often have diverse populations.", "society"),
  word("equality", "equality", "/iˈkwɒləti/", "n. 平等", "Education can promote equality of opportunity.", "society"),
  word("identity", "identity", "/aɪˈdentəti/", "n. 身份；认同", "Language is part of cultural identity.", "society"),
  word("immigration", "immigration", "/ˌɪmɪˈɡreɪʃn/", "n. 移民；移居", "Immigration can bring both challenges and benefits.", "society"),
  word("inequality", "inequality", "/ˌɪnɪˈkwɒləti/", "n. 不平等", "Income inequality is a common topic in IELTS essays.", "society"),
  word("minority", "minority", "/maɪˈnɒrəti/", "n. 少数；少数群体", "Minority languages need protection in some regions.", "society"),
  word("policy", "policy", "/ˈpɒləsi/", "n. 政策", "A clear policy can reduce traffic congestion.", "society"),
  word("population", "population", "/ˌpɒpjuˈleɪʃn/", "n. 人口", "The population is ageing in many developed countries.", "society"),
  word("tradition", "tradition", "/trəˈdɪʃn/", "n. 传统", "Some traditions are passed down through families.", "society"),
  word("urban", "urban", "/ˈɜːbən/", "adj. 城市的", "Urban areas usually offer more job opportunities.", "society"),

  // Health
  word("benefit", "benefit", "/ˈbenɪfɪt/", "n. 益处；好处 v. 受益", "Regular exercise has many health benefits.", "health"),
  word("chronic", "chronic", "/ˈkrɒnɪk/", "adj. 慢性的；长期的", "Chronic stress can damage mental health.", "health"),
  word("diet", "diet", "/ˈdaɪət/", "n. 饮食", "A balanced diet can prevent many diseases.", "health"),
  word("disease", "disease", "/dɪˈziːz/", "n. 疾病", "Heart disease is common in many countries.", "health"),
  word("fitness", "fitness", "/ˈfɪtnəs/", "n. 健康；适能", "Fitness programs are popular among office workers.", "health"),
  word("infection", "infection", "/ɪnˈfekʃn/", "n. 感染", "Good hygiene can reduce the risk of infection.", "health"),
  word("mental", "mental", "/ˈmentl/", "adj. 精神的；心理的", "Mental health should be taken seriously.", "health"),
  word("nutrition", "nutrition", "/njuːˈtrɪʃn/", "n. 营养", "Children need good nutrition to develop properly.", "health"),
  word("obesity", "obesity", "/əʊˈbiːsəti/", "n. 肥胖", "Obesity is linked to poor diet and inactivity.", "health"),
  word("physical", "physical", "/ˈfɪzɪkl/", "adj. 身体的；物理的", "Physical activity can improve sleep quality.", "health"),
  word("prevent", "prevent", "/prɪˈvent/", "v. 预防；阻止", "Vaccination can prevent serious illness.", "health"),
  word("symptom", "symptom", "/ˈsɪmptəm/", "n. 症状", "A fever can be a symptom of infection.", "health"),
  word("treatment", "treatment", "/ˈtriːtmənt/", "n. 治疗；处理", "Early treatment improves the chance of recovery.", "health"),
  word("wellbeing", "wellbeing", "/ˌwelˈbiːɪŋ/", "n. 幸福；健康状态", "Social connection is important for wellbeing.", "health"),

  // Economy & work
  word("afford", "afford", "/əˈfɔːd/", "v. 负担得起", "Many young people cannot afford to buy a house.", "economy"),
  word("agriculture", "agriculture", "/ˈæɡrɪkʌltʃə/", "n. 农业", "Agriculture still employs many rural workers.", "economy"),
  word("budget", "budget", "/ˈbʌdʒɪt/", "n. 预算", "The government increased the education budget.", "economy"),
  word("consumer", "consumer", "/kənˈsjuːmə/", "n. 消费者", "Consumers are becoming more aware of product quality.", "economy"),
  word("demand", "demand", "/dɪˈmɑːnd/", "n./v. 需求；要求", "Demand for skilled workers is rising.", "economy"),
  word("economy", "economy", "/ɪˈkɒnəmi/", "n. 经济", "Tourism can support the local economy.", "economy"),
  word("employment", "employment", "/ɪmˈplɔɪmənt/", "n. 就业", "Higher education can improve employment prospects.", "economy"),
  word("entrepreneur", "entrepreneur", "/ˌɒntrəprəˈnɜː/", "n. 企业家；创业者", "An entrepreneur often takes financial risks.", "economy"),
  word("export", "export", "/ˈekspɔːt/", "n./v. 出口", "The country exports agricultural products.", "economy"),
  word("income", "income", "/ˈɪnkʌm/", "n. 收入", "A stable income can improve quality of life.", "economy"),
  word("industry", "industry", "/ˈɪndəstri/", "n. 工业；行业", "The tourism industry creates many seasonal jobs.", "economy"),
  word("investment", "investment", "/ɪnˈvestmənt/", "n. 投资", "Investment in public transport benefits commuters.", "economy"),
  word("labour", "labour", "/ˈleɪbə/", "n. 劳动力；劳动", "The labour market is changing rapidly.", "economy"),
  word("productivity", "productivity", "/ˌprɒdʌkˈtɪvəti/", "n. 生产率", "Better training can increase productivity.", "economy"),
  word("wage", "wage", "/weɪdʒ/", "n. 工资", "Low wages make it hard to attract workers.", "economy"),

  // Government & law
  word("ban", "ban", "/bæn/", "n./v. 禁令；禁止", "Some cities ban cars from central areas.", "government"),
  word("citizen", "citizen", "/ˈsɪtɪzən/", "n. 公民", "Citizens should have access to public information.", "government"),
  word("crime", "crime", "/kraɪm/", "n. 犯罪", "Youth crime is often linked to social problems.", "government"),
  word("enforce", "enforce", "/ɪnˈfɔːs/", "v. 执行；强制实施", "The law is difficult to enforce without public support.", "government"),
  word("fund", "fund", "/fʌnd/", "v./n. 资助；基金", "The project is funded by local government.", "government"),
  word("infrastructure", "infrastructure", "/ˈɪnfrəstrʌktʃə/", "n. 基础设施", "Good infrastructure attracts business investment.", "government"),
  word("legislation", "legislation", "/ˌledʒɪsˈleɪʃn/", "n. 立法；法规", "New legislation aims to reduce plastic waste.", "government"),
  word("regulate", "regulate", "/ˈreɡjuleɪt/", "v. 监管；调节", "Governments should regulate harmful advertising.", "government"),
  word("tax", "tax", "/tæks/", "n./v. 税；征税", "A higher fuel tax may reduce car use.", "government"),
  word("welfare", "welfare", "/ˈwelfeə/", "n. 福利；福祉", "Welfare programs support vulnerable families.", "government"),

  // Transport & urban life
  word("commute", "commute", "/kəˈmjuːt/", "v./n. 通勤", "A long commute can reduce personal time.", "urban-life"),
  word("congestion", "congestion", "/kənˈdʒestʃən/", "n. 拥堵", "Traffic congestion is a serious urban problem.", "urban-life"),
  word("density", "density", "/ˈdensəti/", "n. 密度", "High population density can increase housing pressure.", "urban-life"),
  word("pedestrian", "pedestrian", "/pəˈdestriən/", "n. 行人", "Pedestrian areas make shopping streets safer.", "urban-life"),
  word("resident", "resident", "/ˈrezɪdənt/", "n. 居民", "Residents complained about noise from the airport.", "urban-life"),
  word("suburb", "suburb", "/ˈsʌbɜːb/", "n. 郊区", "Many families prefer to live in the suburbs.", "urban-life"),
  word("vehicle", "vehicle", "/ˈviːəkl/", "n. 车辆", "Electric vehicles can reduce air pollution.", "urban-life"),

  // Writing connectors & analysis verbs
  word("advocate", "advocate", "/ˈædvəkeɪt/", "v. 提倡；支持", "Some people advocate free university education.", "writing"),
  word("allocate", "allocate", "/ˈæləkeɪt/", "v. 分配", "More money should be allocated to public health.", "writing"),
  word("alternative", "alternative", "/ɔːlˈtɜːnətɪv/", "n./adj. 替代方案；替代的", "Cycling is an alternative to driving in cities.", "writing"),
  word("approximately", "approximately", "/əˈprɒksɪmətli/", "adv. 大约", "Approximately half of the respondents preferred online learning.", "writing"),
  word("category", "category", "/ˈkætəɡəri/", "n. 种类；类别", "The data is divided into three categories.", "writing"),
  word("complex", "complex", "/ˈkɒmpleks/", "adj. 复杂的", "Poverty is a complex issue with many causes.", "writing"),
  word("consequence", "consequence", "/ˈkɒnsɪkwəns/", "n. 后果；结果", "One consequence of urban growth is higher rent.", "writing"),
  word("contrast", "contrast", "/ˈkɒntrɑːst/", "n./v. 对比", "The chart contrasts spending in two age groups.", "writing"),
  word("emphasize", "emphasize", "/ˈemfəsaɪz/", "v. 强调", "The report emphasizes the need for early action.", "writing"),
  word("factor", "factor", "/ˈfæktə/", "n. 因素", "Cost is a major factor in choosing a university.", "writing"),
  word("impact", "impact", "/ˈɪmpækt/", "n./v. 影响；冲击", "The impact of social media is widely debated.", "writing"),
  word("indicate", "indicate", "/ˈɪndɪkeɪt/", "v. 表明；指示", "The figures indicate a steady increase.", "writing"),
  word("maintain", "maintain", "/meɪnˈteɪn/", "v. 维持；主张", "Some experts maintain that exams are still necessary.", "writing"),
  word("proportion", "proportion", "/prəˈpɔːʃn/", "n. 比例", "A large proportion of students study abroad.", "writing"),
  word("whereas", "whereas", "/ˌweərˈæz/", "conj. 然而；鉴于", "Cars are convenient, whereas public transport is cheaper.", "writing"),
];

export const VOCAB_DATABASE = mergeVocab(CURATED_VOCAB_DATABASE, IELTS_4000_DATABASE);

/** 获取词汇主题列表 */
export function getThemes() {
  const themes = new Set(VOCAB_DATABASE.map(v => v.theme));
  return Array.from(themes).sort();
}

/** 按主题筛选词汇 */
export function getVocabByTheme(theme) {
  if (theme === "all") return VOCAB_DATABASE;
  return VOCAB_DATABASE.filter(v => v.theme === theme);
}

/** 根据 ID 获取词汇 */
export function getVocabById(id) {
  return VOCAB_DATABASE.find(v => v.id === id);
}

function word(id, wordText, phonetic, meaning, example, theme) {
  return { id, word: wordText, phonetic, meaning, example, theme, source: "curated" };
}

function mergeVocab(curated, imported) {
  const byWord = new Map();

  for (const item of imported) {
    byWord.set(item.word.toLowerCase(), item);
  }

  for (const item of curated) {
    byWord.set(item.word.toLowerCase(), {
      ...byWord.get(item.word.toLowerCase()),
      ...item,
      source: item.source || "curated",
    });
  }

  return Array.from(byWord.values()).sort((a, b) => a.word.localeCompare(b.word));
}
