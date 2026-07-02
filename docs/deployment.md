# 部署指南

## 本地运行

```powershell
cd E:\雅思学习\ielts-master
npm run start
# 打开 http://localhost:5173
```

## Netlify 部署（推荐，免费）

1. 将代码推送到 GitHub
2. 登录 [netlify.com](https://netlify.com)
3. New site → Import from Git → 选择仓库
4. Build command：留空
5. Publish directory：`frontend`
6. Deploy

部署后得到 HTTPS 地址，iPhone Safari 可直接访问并添加到主屏幕。

## Cloudflare Pages 部署（长期省钱备选）

1. 将代码推送到 GitHub
2. 登录 Cloudflare → Workers & Pages → Create application
3. 选择 Pages → Connect to Git
4. Build command：留空
5. Output directory：`frontend`
6. Deploy

Cloudflare Pages 同样提供 HTTPS，可用于 iPhone PWA。

## Supabase 同步配置

1. 登录 [supabase.com](https://supabase.com) → 新建项目
2. 进入 SQL Editor，运行 `docs/supabase.sql`
3. 在项目 Settings → API 复制 URL 和 anon key
4. 在软件"设置"页填入 URL、anon key、自定义同步口令
5. 点击"推送到云端"完成首次同步

同步数据会先在浏览器端用口令加密，Supabase 中只保存密文。

## iPhone 使用方式

1. 用 iPhone Safari 打开 Netlify 的 HTTPS 地址
2. 点击底部分享按钮 → "添加到主屏幕"
3. 在"设置"页输入与电脑相同的 Supabase 信息和口令
4. 点击"从云端拉取"同步数据
