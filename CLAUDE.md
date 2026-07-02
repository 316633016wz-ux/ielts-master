# IELTS Master — AI 开发总引导文档

> **每次开发对话开始，先完整读取本文件。**
> 所有架构决策、模块规划、开发进度以本文件为唯一真相。
> 遇到问题先查 `docs/` 对应文档，不要凭记忆猜测。

---

## 项目概述

**项目名称**：IELTS Master  
**项目路径**：`E:\雅思学习\ielts-master\`  
**目标**：一个可在 iOS 手机和 PC 浏览器上同步使用的雅思学习 PWA，涵盖备考计划、词汇记忆、听说读写练习、真题刷题。  
**技术栈**：纯 HTML/CSS/JS PWA + Supabase 云同步（无需构建工具，部署到 Netlify/Cloudflare Pages 即可在 iPhone 使用）

---

## 目录结构与文件职责

```
ielts-master/
├── CLAUDE.md                ← 本文件，AI 开发总引导（每次必读）
├── README.md                ← 用户使用说明（运行、iPhone 安装、同步）
├── docs/
│   ├── requirements.md      ← 功能需求文档（模块、优先级、验收标准）
│   ├── technical-plan.md    ← 技术方案、模块划分、开发步骤
│   ├── design-system.md     ← UI 设计规范（颜色、字体、组件）
│   ├── data-model.md        ← 数据结构设计（所有 state 字段说明）
│   ├── dev-workflow.md      ← 开发工作流（分支、提交规范、验证步骤）
│   ├── deployment.md        ← 部署指南（Netlify/Cloudflare/Supabase）
│   ├── cloud-selection.md   ← 云服务选择与成本说明
│   └── supabase.sql         ← Supabase 云同步表结构
├── dev-logs/
│   └── YYYY-MM-DD.md        ← 每日开发日志（自动创建）
├── frontend/
│   ├── index.html           ← 应用入口
│   ├── manifest.webmanifest ← PWA 配置
│   ├── sw.js                ← Service Worker（离线缓存）
│   ├── styles/
│   │   ├── main.css         ← 布局、主题变量、全局样式
│   │   ├── components.css   ← 可复用 UI 组件样式
│   │   └── views.css        ← 各视图页面样式
│   └── js/
│       ├── app.js           ← 入口：初始化、路由、事件绑定
│       ├── state.js         ← 状态管理：读写 localStorage、数据迁移
│       ├── sync.js          ← Supabase 云同步逻辑
│       ├── views/
│       │   ├── dashboard.js ← 今日总览视图
│       │   ├── plan.js      ← 备考计划视图
│       │   ├── vocab.js     ← 词汇记忆视图（MVP 核心）
│       │   ├── practice.js  ← 四科训练记录视图
│       │   ├── quiz.js      ← 刷题视图（阶段 1）
│       │   ├── notebook.js  ← 错题本视图
│       │   ├── mock.js      ← 模考记录视图
│       │   └── settings.js  ← 设置与同步视图
│       └── utils/
│           ├── date.js      ← 日期工具函数
│           ├── score.js     ← 雅思分数换算工具
│           └── vocab-data.js← 内置词汇数据
├── assets/
│   ├── icons/               ← PWA 图标（各尺寸）
│   └── audio/               ← 听力音频（本地示例）
├── scripts/
│   └── dev-log.mjs          ← 创建当天开发日志模板
├── package.json             ← 本地运行、检查、日志脚本
└── server.mjs               ← 本地 Node 静态预览服务器
```

---

## 当前开发进度

**截至 2026-07-02**：项目基座与 MVP 核心闭环已可本地运行

| 阶段 | 状态 | 说明 |
|------|------|------|
| 阶段 0：项目基座 | ✅ 已完成 | 文件结构、docs、README、PWA、本地服务、日志脚本 |
| 阶段 1：MVP（计划+词汇） | ✅ 已完成基础版 | 备考计划生成、今日任务、SM-2 词汇复习 |
| 阶段 2：四科训练记录 | ✅ 已完成基础版 | 训练记录、错题本、模考记录 |
| 阶段 3：刷题系统 | ⏳ 待开始 | 题库、答题、判分、错题入库 |
| 阶段 4：阅读练习 | ⏳ 待开始 | 文章+题目+计时+解析 |
| 阶段 5：听力练习 | ⏳ 待开始 | 音频+题目+原文 |
| 阶段 6：写作/口语 | ⏳ 待开始 | 编辑器+录音+复盘 |
| 阶段 7：智能调度 | ⏳ 待开始 | 根据数据自动调整每日任务 |
| 阶段 8：部署上线 | 🔧 准备中 | Supabase 加密同步代码与 SQL 已准备，待实际上线测试 |

---

## AI 开发规范（节省 Token）

### 每次对话开始必做
1. 读取本文件 `CLAUDE.md`（了解进度和规范）
2. 读取当日开发日志 `dev-logs/YYYY-MM-DD.md`（了解上次停在哪）
3. 读取本次要改的具体文件（不要读无关文件）

### 遇到问题先查
- 功能需求不明确 → `docs/requirements.md`
- UI 风格问题 → `docs/design-system.md`
- 数据字段不清楚 → `docs/data-model.md`
- 如何提交代码 → `docs/dev-workflow.md`
- 如何部署 → `docs/deployment.md`

### 开发完成必做
1. 用 `npm run check` 验证 JS 语法
2. 更新本文件的"当前开发进度"表格
3. 写今日开发日志 `dev-logs/YYYY-MM-DD.md`
4. 提示用户提交 Git（`git add . && git commit -m "..."`)

### 禁止行为
- 不要读取与本次任务无关的文件
- 不要一次性重写整个 app.js（拆分到 views/ 和 utils/ 下）
- 不要在没有读文件的情况下假设文件内容
- 不要跳过 `npm run check` 验证

---

## 技术决策记录

| 决策 | 选择 | 原因 |
|------|------|------|
| 框架 | 无框架（Vanilla JS） | 无需构建工具，文件直接打开可用，易于理解和维护 |
| 存储 | localStorage + Supabase | 离线可用，跨设备同步，免费额度够用 |
| 部署 | Netlify/Cloudflare Pages | 静态托管免费、自动 HTTPS、适合 iPhone PWA |
| 词汇算法 | SM-2 间隔重复 | 经典 Anki 算法，记忆效果好 |
| CSS | CSS 变量 + BEM 命名 | 主题切换方便，样式可维护 |
| 模块化 | ES Modules（type=module） | 浏览器原生支持，无需打包 |

---

## 词汇数据来源

内置词汇表位于 `frontend/js/utils/vocab-data.js`。当前为 MVP 示例词表，后续扩展时优先使用可追踪来源：
- Academic Word List 等公开学习词表
- 自整理雅思高频词
- 按主题分类：学术、科技、环境、社会、医学等

---

## 联系与同步

- **本地运行**：`cd E:\雅思学习\ielts-master && node server.mjs` → 访问 `http://localhost:5173`
- **iPhone 使用**：部署到 Netlify 后，Safari 打开 → 分享 → 添加到主屏幕
- **数据同步**：设置页填写 Supabase URL + anon key + 同步口令
- **代码备份**：每次开发结束推送到 GitHub
