// 雅思核心词汇数据库（示例词汇，后续可扩展）
// 每个词汇包含：单词、音标、释义、例句、主题分类

export const VOCAB_DATABASE = [
  // 学术类（Academic）
  { id: "academic", word: "academic", phonetic: "/ˌækəˈdemɪk/", meaning: "adj. 学术的；理论的", example: "He has an academic background in physics.", theme: "education" },
  { id: "analyze", word: "analyze", phonetic: "/ˈænəlaɪz/", meaning: "v. 分析", example: "We need to analyze the data carefully.", theme: "education" },
  { id: "approach", word: "approach", phonetic: "/əˈprəʊtʃ/", meaning: "n. 方法；途径 v. 接近", example: "This approach is more effective.", theme: "education" },
  { id: "assess", word: "assess", phonetic: "/əˈses/", meaning: "v. 评估；评价", example: "Teachers assess students' performance.", theme: "education" },
  { id: "assume", word: "assume", phonetic: "/əˈsjuːm/", meaning: "v. 假设；承担", example: "Let's assume this theory is correct.", theme: "education" },
  { id: "authority", word: "authority", phonetic: "/ɔːˈθɒrəti/", meaning: "n. 权威；当局", example: "He is an authority on this subject.", theme: "education" },
  { id: "benefit", word: "benefit", phonetic: "/ˈbenɪfɪt/", meaning: "n. 益处；好处 v. 受益", example: "Exercise has many health benefits.", theme: "health" },
  { id: "category", word: "category", phonetic: "/ˈkætəɡəri/", meaning: "n. 种类；类别", example: "Products are divided into three categories.", theme: "general" },
  { id: "complex", word: "complex", phonetic: "/ˈkɒmpleks/", meaning: "adj. 复杂的", example: "This is a complex problem.", theme: "general" },
  { id: "concept", word: "concept", phonetic: "/ˈkɒnsept/", meaning: "n. 概念；观念", example: "The concept of time is important.", theme: "education" },

  // 环境类（Environment）
  { id: "climate", word: "climate", phonetic: "/ˈklaɪmət/", meaning: "n. 气候", example: "Climate change affects everyone.", theme: "environment" },
  { id: "conservation", word: "conservation", phonetic: "/ˌkɒnsəˈveɪʃn/", meaning: "n. 保护；保存", example: "Wildlife conservation is crucial.", theme: "environment" },
  { id: "pollution", word: "pollution", phonetic: "/pəˈluːʃn/", meaning: "n. 污染", example: "Air pollution is a serious issue.", theme: "environment" },
  { id: "renewable", word: "renewable", phonetic: "/rɪˈnjuːəbl/", meaning: "adj. 可再生的", example: "Solar energy is renewable.", theme: "environment" },
  { id: "sustainable", word: "sustainable", phonetic: "/səˈsteɪnəbl/", meaning: "adj. 可持续的", example: "We need sustainable development.", theme: "environment" },

  // 科技类（Technology）
  { id: "innovation", word: "innovation", phonetic: "/ˌɪnəˈveɪʃn/", meaning: "n. 创新；革新", example: "Technological innovation drives progress.", theme: "technology" },
  { id: "significant", word: "significant", phonetic: "/sɪɡˈnɪfɪkənt/", meaning: "adj. 重要的；显著的", example: "There was a significant improvement.", theme: "general" },
  { id: "technology", word: "technology", phonetic: "/tekˈnɒlədʒi/", meaning: "n. 技术；科技", example: "Technology has changed our lives.", theme: "technology" },
  { id: "efficient", word: "efficient", phonetic: "/ɪˈfɪʃnt/", meaning: "adj. 高效的", example: "This method is more efficient.", theme: "general" },
  { id: "impact", word: "impact", phonetic: "/ˈɪmpækt/", meaning: "n. 影响；冲击", example: "The impact of social media is huge.", theme: "general" },

  // 社会类（Society）
  { id: "community", word: "community", phonetic: "/kəˈmjuːnəti/", meaning: "n. 社区；社会", example: "Our community is very supportive.", theme: "society" },
  { id: "culture", word: "culture", phonetic: "/ˈkʌltʃə/", meaning: "n. 文化", example: "Chinese culture is very diverse.", theme: "society" },
  { id: "diverse", word: "diverse", phonetic: "/daɪˈvɜːs/", meaning: "adj. 多样的；不同的", example: "Students come from diverse backgrounds.", theme: "society" },
  { id: "economy", word: "economy", phonetic: "/ɪˈkɒnəmi/", meaning: "n. 经济", example: "The economy is growing steadily.", theme: "society" },
  { id: "society", word: "society", phonetic: "/səˈsaɪəti/", meaning: "n. 社会", example: "Society is changing rapidly.", theme: "society" },

  // 健康类（Health）
  { id: "disease", word: "disease", phonetic: "/dɪˈziːz/", meaning: "n. 疾病", example: "Heart disease is common nowadays.", theme: "health" },
  { id: "mental", word: "mental", phonetic: "/ˈmentl/", meaning: "adj. 精神的；心理的", example: "Mental health is very important.", theme: "health" },
  { id: "physical", word: "physical", phonetic: "/ˈfɪzɪkl/", meaning: "adj. 身体的；物理的", example: "Regular physical exercise is essential.", theme: "health" },
  { id: "treatment", word: "treatment", phonetic: "/ˈtriːtmənt/", meaning: "n. 治疗；处理", example: "The treatment was successful.", theme: "health" },
  { id: "symptom", word: "symptom", phonetic: "/ˈsɪmptəm/", meaning: "n. 症状", example: "Fever is a common symptom.", theme: "health" },
];

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
