# 阅读与听力题库设计

## 目标

题库系统要支持后续“刷题 → 判分 → 错题入库 → 复盘 → 调整计划”的闭环。

当前第一步先建立数据结构，示例数据在：

```text
frontend/js/utils/question-bank-data.js
```

## 通用字段

```javascript
{
  id: "reading-urban-gardens-001",
  skill: "reading",
  title: "Urban Gardens and Community Health",
  level: "band-5.5-6.5",
  estimatedMinutes: 18,
  sourceType: "original",
  copyright: "Original content for IELTS Master.",
  questions: []
}
```

### sourceType

| 值 | 说明 |
|----|------|
| `original` | 项目原创，可直接内置 |
| `official-link` | 官方公开链接，只保存链接与来源 |
| `user-owned` | 用户自己拥有或手动录入的资料 |

## 阅读数据结构

```javascript
{
  id: "reading-urban-gardens-001",
  skill: "reading",
  title: "Urban Gardens and Community Health",
  passage: ["paragraph 1", "paragraph 2"],
  questions: [
    {
      id: "r-urban-001-q1",
      type: "true-false-not-given",
      prompt: "Community gardens can help neighbours communicate more often.",
      answer: "True",
      explanation: "Paragraph 1 gives this information."
    }
  ]
}
```

## 听力数据结构

```javascript
{
  id: "listening-library-tour-001",
  skill: "listening",
  title: "Library Orientation",
  audioUrl: "",
  transcript: ["sentence group 1", "sentence group 2"],
  questions: [
    {
      id: "l-library-001-q1",
      type: "form-completion",
      prompt: "The speaker's name is ____.",
      answer: "Anna",
      explanation: "The transcript says: My name is Anna."
    }
  ]
}
```

## 支持题型

第一批优先支持：

- `true-false-not-given`
- `multiple-choice`
- `short-answer`
- `form-completion`

第二批再支持：

- `matching-headings`
- `matching-information`
- `sentence-completion`
- `map-labeling`
- `summary-completion`

## 判分规则

第一版用严格字符串比对：

- 去掉首尾空格
- 不区分大小写
- 可配置同义答案数组

后续再做：

- 拼写容错
- 多答案顺序兼容
- 错题自动提取关键词

## 错题入库映射

答错后生成 `mistakes` 记录：

```javascript
{
  skill: "reading",
  questionType: "true-false-not-given",
  source: "Urban Gardens and Community Health",
  issue: "题干定位或同义替换错误",
  fix: "回到原文定位关键词，记录同义替换",
  status: "open"
}
```

## 开发顺序

1. 新增 `quiz.js` 视图入口。
2. 展示阅读 Passage + 题目。
3. 本地提交答案并判分。
4. 错题自动写入错题本。
5. 增加听力 transcript 展示和音频播放器。
6. 接入更多原创材料。
