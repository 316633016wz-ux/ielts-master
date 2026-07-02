# 学习资料来源与版权边界

## 原则

- 优先使用官方、公开、可追踪来源。
- 不直接内置受版权保护的剑桥真题原文、音频或解析。
- 真题资料可以在软件中记录“来源、套题、题号、复盘”，但不复制整篇文章或音频。
- 项目内置练习内容优先使用原创材料或明确允许使用的开放材料。

## 推荐官方来源

| 来源 | 用途 | 链接 |
|------|------|------|
| IELTS.org Preparation resources | 官方备考入口、样题方向 | https://ielts.org/take-a-test/preparation-resources |
| British Council Free IELTS practice tests | 免费听说读写练习题 | https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests |
| IDP IELTS Practice tests | 免费练习题与备考内容 | https://ielts.idp.com/prepare/ielts-practice-tests |
| Cambridge English IELTS preparation | 剑桥官方备考入口 | https://www.cambridgeenglish.org/exams-and-tests/ielts/preparation/ |
| Academic Word List | 学术高频词来源参考 | https://www.wgtn.ac.nz/lals/resources/academicwordlist |
| IELTS-4000 Academic Word List | 完整词库导入来源，MIT License | https://github.com/NeuralPensieve/Vocabulary-Knowledge-Thompson-Sampling |
| ECDICT | 英汉释义与音标补充，MIT License | https://github.com/skywind3000/ECDICT |

## 词库扩展策略

词库位于：

```text
frontend/js/utils/vocab-data.js
frontend/js/utils/ielts-4000-data.js
data/vocab-sources/IELTS-4000.txt
```

当前策略：

- `IELTS-4000.txt` 作为完整雅思词库来源。
- ECDICT 用于为 IELTS-4000 词条补充中文释义和音标。
- `vocab-data.js` 中的精选词条优先提供中文释义、音标和自写例句。
- 导入词条提供中文释义、音标和英文释义；例句后续逐步优化。

目前按主题分组：

- education
- environment
- technology
- society
- health
- economy
- government
- urban-life
- writing

后续扩展顺序：

1. Academic Word List 高频学术词。
2. 雅思写作常见主题词。
3. 阅读同义替换词。
4. 听力场景词：图书馆、住宿、旅游、课程、租房、交通。
5. 用户错题中反复出现的生词。

## 薄弱词复习策略

词汇卡片必须先翻开查看释义和例句，才能选择熟悉度。

- 点“不认识”或“模糊”：单词进入薄弱词队列。
- 系统会立刻显示中文释义、英文释义和例句，帮助当场记忆。
- 薄弱词会优先出现在每日复习中。
- 反复点“认识/熟练”后，薄弱计数会逐步下降。
- 已掌握词仍按 SM-2 间隔复习，不会频繁打扰。

## 阅读资料策略

阅读刷题系统不直接搬运剑桥真题原文。可采用三类材料：

| 类型 | 是否可内置 | 用法 |
|------|------------|------|
| 项目原创 Passage | 可以 | 用于内置训练、自动判分、解析 |
| 官方免费样题链接 | 只放链接和来源 | 用户跳转或手动记录结果 |
| 剑桥真题 | 不内置原文 | 只记录书名、Test、Passage、错因 |

## 听力资料策略

听力模块分两步走：

1. 先用原创 transcript 验证题型、答题、判分、错题入库。
2. 后续若加入音频，只使用原创录音、用户本地上传音频，或明确允许使用的开放音频。

## 数据入库要求

每条练习材料必须记录：

- `sourceType`: `original`、`official-link`、`user-owned`
- `title`
- `skill`
- `level`
- `copyright`
- `questions`
- `answers`
- `explanations`

这样后续扩展资料时，不会把版权不清楚的内容混进内置题库。
