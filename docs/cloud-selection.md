# 云服务选择

## 当前结论

第一阶段不租传统云服务器。IELTS Master 是静态 PWA，本地开发完成后部署到免费静态托管平台，再用 Supabase 做云同步即可。

推荐组合：
- **前端托管**：Netlify 或 Cloudflare Pages。
- **数据库/同步**：Supabase Free。
- **代码托管**：GitHub 免费仓库。

## 为什么不先买 VPS

- 当前没有常驻后端服务，不需要服务器长期运行。
- VPS 需要维护系统、安全更新、HTTPS、备份，对小白不友好。
- 静态托管自带 HTTPS，更适合 iPhone PWA。
- 学习数据体量很小，Supabase 免费额度足够 MVP。

## 平台选择

| 平台 | 用途 | 建议 |
|------|------|------|
| Netlify | 静态前端托管 | 操作最简单，适合首次上线 |
| Cloudflare Pages | 静态前端托管 | 免费额度友好，适合长期省钱 |
| Supabase | 云同步数据库 | 免费额度足够个人使用 |
| GitHub Student Developer Pack | 学生优惠入口 | 可后续申请，优先用免费方案 |

## 当前执行顺序

1. 先本地开发并稳定 MVP。
2. 推送到 GitHub。
3. 用 Netlify 或 Cloudflare Pages 部署 `frontend` 目录。
4. 创建 Supabase 项目并运行 `docs/supabase.sql`。
5. 在电脑和 iPhone 设置页填相同 Supabase 信息与同步口令。

## 安全说明

同步数据上传前会在浏览器端用同步口令加密。Supabase 表中只保存密文，口令不会上传。请使用不容易猜到的同步口令。

## 参考链接

- Netlify Pricing: https://www.netlify.com/pricing/
- Cloudflare Pages: https://pages.cloudflare.com/
- Supabase Pricing: https://supabase.com/pricing
