# 开发工作流

## 每次开发前必读
1. `CLAUDE.md` — 确认当前进度和规范
2. `dev-logs/YYYY-MM-DD.md` — 确认上次停在哪

## 开发完成必做
1. `npm run check` 验证核心 JS 语法
2. 更新 `CLAUDE.md` 进度表
3. 写当日 `dev-logs/YYYY-MM-DD.md`
4. 提交 Git

## Git 提交规范

```
feat: 新功能
fix:  修复 bug
ui:   界面调整
docs: 文档更新
chore: 杂项
```

示例：
```
feat: add vocab SM-2 review system
ui: improve dashboard card layout
fix: repair localStorage migration v1->v2
```

## 开发完成检查清单
- [ ] `npm run check` 通过（无语法错误）
- [ ] 本地浏览器打开正常
- [ ] 手机宽度（375px）布局正常
- [ ] 新功能数据能保存到 localStorage
- [ ] CLAUDE.md 进度已更新
- [ ] dev-logs 已写
- [ ] Git commit 已提醒用户

## 文件修改原则
- 只读本次任务相关的文件
- 每个视图逻辑放到 `frontend/js/views/` 对应文件
- 工具函数放到 `frontend/js/utils/`
- 不要把所有逻辑堆在 `app.js`
