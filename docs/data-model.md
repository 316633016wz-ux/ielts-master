# 数据结构设计

## 存储说明

所有数据保存在浏览器 `localStorage` 中，key 为 `ielts-master-state-v1`。
Supabase 同步时，将整个 state 对象序列化为 JSON 存入云端。

---

## 顶层 State 结构

```javascript
const DEFAULT_STATE = {
  version: 1,                    // 数据版本号（用于迁移）
  activeView: "dashboard",       // 当前显示的视图
  updatedAt: "",                 // 最后更新时间（ISO 字符串）

  profile: { ... },              // 用户备考信息
  plan: { ... },                 // 学习计划
  vocab: { ... },                // 词汇学习状态
  vocabSettings: { ... },        // 词汇设置
  sessions: [],                  // 训练记录
  mistakes: [],                  // 错题本
  expressions: [],               // 表达本
  mocks: [],                     // 模考记录
  quizAttempts: [],              // 阅读/听力刷题记录
  completions: {},               // 今日任务完成情况 { "YYYY-MM-DD": { taskId: true } }
  sync: { ... },                 // 同步配置
};
```

---

## profile（用户信息）

```javascript
profile: {
  name: "我的雅思",
  examType: "Academic",          // "Academic" | "General"
  targetOverall: 7.0,
  targetL: 7.0,
  targetR: 7.0,
  targetW: 6.5,
  targetS: 6.5,
  examDate: "2026-10-01",        // ISO 日期字符串
  dailyMinutes: 120,             // 每日学习时长（分钟）
  focus: "",                     // 当前重点（用户自填）
}
```

---

## plan（学习计划）

```javascript
plan: {
  startDate: "2026-07-02",       // 计划开始日期
  phases: [
    {
      id: "phase-1",
      name: "基础期",
      startDay: 1,
      endDay: 21,
      description: "恢复语感，打牢基础",
      dailyTasks: [
        { id: "vocab", label: "词汇 30 词", minutes: 30 },
        { id: "reading", label: "阅读精读 1 篇", minutes: 45 },
        { id: "listening", label: "听力 Section 1-2", minutes: 45 },
      ]
    },
    // ...更多阶段
  ]
}
```

---

## vocab（词汇学习状态）

### vocabSettings
```javascript
vocabSettings: {
  dailyNew: 20,                  // 每日新词数量
  themes: ["all"],               // 启用的主题 ["all"] 或具体主题名数组
}
```

### vocab（每个单词的学习记录）
```javascript
vocab: {
  "word-uuid": {
    // 从词汇表继承的静态数据
    word: "advocate",
    meaning: "v. 提倡，支持；n. 倡导者",
    englishMeaning: "support or recommend publicly",
    example: "She advocates for equal rights.",
    phonetic: "/ˈædvəkeɪt/",
    theme: "social",

    // SM-2 算法动态数据
    easeFactor: 2.5,             // 难度因子（1.3 ~ 5.0），越低越难
    interval: 0,                 // 当前复习间隔（天），0=新词
    repetitions: 0,              // 累计成功复习次数
    firstSeen: "2026-07-02",     // 首次学习日期，用于控制每日新词轮次
    nextReview: "2026-07-02",    // 下次复习日期
    lastReview: null,            // 上次复习日期
    lastQuality: null,            // 最近一次熟悉度评分
    weakCount: 0,                 // 薄弱次数，越高越优先复习
    status: "new",               // "new" | "weak" | "learning" | "review" | "mastered"
  }
}
```

用户点击“不认识”或“模糊”时，`status` 会变为 `weak`，`weakCount` 增加。词汇页会立刻显示中文释义、英文释义和例句，并优先安排薄弱词复习。多次答对后 `weakCount` 逐步下降，成功复习 4 次后进入 `mastered`。

### SM-2 算法说明
```
用户评分（quality）：
  0 = 完全不认识（再次）
  1 = 模糊（再次）
  2 = 认识但很吃力
  3 = 认识（正确）
  4 = 认识，轻松
  5 = 非常熟练

算法逻辑：
  if quality < 3:
    repetitions = 0
    interval = 1
  else:
    if repetitions == 0: interval = 1
    elif repetitions == 1: interval = 6
    else: interval = round(interval * easeFactor)
    repetitions += 1

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  easeFactor = max(1.3, easeFactor)
  nextReview = today + interval 天
```

---

## sessions（训练记录）

```javascript
sessions: [
  {
    id: "uuid",
    date: "2026-07-02",
    skill: "listening",          // "listening"|"reading"|"writing"|"speaking"
    minutes: 60,
    source: "剑雅 18 Test 1",
    result: "Section 1-2，正确率 85%",
    notes: "数字听写还需加强",
    createdAt: "2026-07-02T14:30:00.000Z",
  }
]
```

---

## mistakes（错题本）

```javascript
mistakes: [
  {
    id: "uuid",
    date: "2026-07-02",
    skill: "reading",
    questionType: "判断题",      // 题型
    source: "剑雅 18 P1",        // 来源
    issue: "段落定位不准",        // 主要错因
    fix: "找关键词，不要逐词翻译", // 解决方案
    status: "open",              // "open" | "resolved"
    reviewCount: 0,
    nextReview: "2026-07-05",
  }
]
```

---

## mocks（模考记录）

```javascript
mocks: [
  {
    id: "uuid",
    date: "2026-07-02",
    source: "剑雅 18 Test 1",
    L: 7.0,
    R: 6.5,
    W: 6.0,
    S: 6.5,
    overall: 6.5,               // 自动计算：四项均值取 0.5 向下取整
    notes: "阅读时间不够用",
  }
]
```

---

## quizAttempts（刷题记录）

```javascript
quizAttempts: [
  {
    id: "uuid",
    date: "2026-07-02",
    setId: "reading-urban-gardens-001",
    skill: "reading",            // "reading" | "listening"
    title: "Urban Gardens and Community Health",
    total: 4,
    correct: 3,
    answers: {
      "r-urban-001-q1": "True"
    },
    mistakes: [
      {
        questionId: "r-urban-001-q2",
        questionType: "true-false-not-given",
        userAnswer: "Not Given",
        correctAnswer: "False",
        explanation: "Paragraph 2 says some land may be temporary."
      }
    ],
    createdAt: "2026-07-02T14:30:00.000Z",
  }
]
```

题库静态数据位于：

```text
frontend/js/utils/question-bank-data.js
```

---

## completions（每日任务完成情况）

```javascript
completions: {
  "2026-07-02": {
    "vocab": true,
    "reading": false,
    "listening": true,
  }
}
```

---

## sync（同步配置）

```javascript
sync: {
  supabaseUrl: "",               // Supabase 项目 URL
  supabaseKey: "",               // anon key
  syncPassphrase: "",            // 同步口令（本地明文，不上传）
  lastPush: null,                // 上次推送时间
  lastPull: null,                // 上次拉取时间
}
```
