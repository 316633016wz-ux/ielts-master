# IELTS Master

雅思全程学习平台 — 备考计划 · 词汇记忆 · 四科练习 · 刷题复盘

## 快速开始

```powershell
cd E:\雅思学习\ielts-master
npm run start
```

打开浏览器访问 `http://localhost:5173`

## iPhone 使用

1. 将代码推送到 GitHub，部署到 Netlify（免费）
2. iPhone Safari 打开 HTTPS 地址
3. 分享 → 添加到主屏幕
4. 在"设置"页配置 Supabase 同步

## 文档导航

| 文档 | 说明 |
|------|------|
| [开发总引导](CLAUDE.md) | AI 开发必读，含进度和规范 |
| [功能需求](docs/requirements.md) | 模块需求和验收标准 |
| [技术方案](docs/technical-plan.md) | 技术栈选择、模块划分、推进步骤 |
| [UI 设计规范](docs/design-system.md) | 颜色、字体、组件规范 |
| [数据结构](docs/data-model.md) | 所有 state 字段说明 |
| [开发工作流](docs/dev-workflow.md) | 提交规范和检查清单 |
| [部署指南](docs/deployment.md) | Netlify + Supabase 配置 |
| [云服务选择](docs/cloud-selection.md) | 免费托管、Supabase、学生优惠方向 |
| [Supabase SQL](docs/supabase.sql) | 云同步所需数据表 |
| [开发日志](dev-logs/) | 每日开发记录 |

## 开发检查

```powershell
npm run check
npm run log:today
```
