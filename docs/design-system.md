# UI 设计规范

## 设计原则

- **简洁**：界面干净，不堆砌元素
- **清晰**：重要信息突出，层级分明
- **一致**：组件风格统一，交互逻辑统一
- **移动优先**：以 iPhone 屏幕（375px）为基准设计

---

## 颜色系统

```css
:root {
  /* 品牌色 - 学习蓝 */
  --color-primary:       #2563EB;
  --color-primary-light: #DBEAFE;
  --color-primary-dark:  #1D4ED8;

  /* 功能色 */
  --color-success:  #16A34A;
  --color-warning:  #D97706;
  --color-danger:   #DC2626;
  --color-info:     #0891B2;

  /* 中性色 */
  --color-gray-50:  #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;

  /* 背景 */
  --color-bg:          #F9FAFB;
  --color-bg-card:     #FFFFFF;
  --color-bg-sidebar:  #1F2937;

  /* 文字 */
  --color-text-primary:   #111827;
  --color-text-secondary: #6B7280;
  --color-text-inverse:   #FFFFFF;

  /* 四科颜色标签 */
  --color-listening: #7C3AED;  /* 紫 - 听力 */
  --color-reading:   #059669;  /* 绿 - 阅读 */
  --color-writing:   #D97706;  /* 橙 - 写作 */
  --color-speaking:  #DC2626;  /* 红 - 口语 */
  --color-vocab:     #2563EB;  /* 蓝 - 词汇 */
}
```

---

## 字体系统

```css
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', monospace;

  /* 字号阶梯 */
  --text-xs:   0.75rem;   /* 12px - 标签、辅助文字 */
  --text-sm:   0.875rem;  /* 14px - 正文小字 */
  --text-base: 1rem;      /* 16px - 正文 */
  --text-lg:   1.125rem;  /* 18px - 小标题 */
  --text-xl:   1.25rem;   /* 20px - 标题 */
  --text-2xl:  1.5rem;    /* 24px - 大标题 */
  --text-3xl:  1.875rem;  /* 30px - 数字展示 */

  /* 行高 */
  --leading-tight:  1.25;
  --leading-normal: 1.5;
  --leading-loose:  1.75;
}
```

---

## 间距系统

```css
:root {
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

---

## 圆角与阴影

```css
:root {
  --radius-sm:  0.25rem;  /* 4px - 小按钮、标签 */
  --radius-md:  0.5rem;   /* 8px - 卡片 */
  --radius-lg:  0.75rem;  /* 12px - 大卡片 */
  --radius-xl:  1rem;     /* 16px - 模态框 */
  --radius-full: 9999px;  /* 圆形 - 头像、状态点 */

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
```

---

## 布局结构

### PC 端（>768px）
```
┌─────────────────────────────────────────┐
│ 侧边栏(240px) │        主内容区         │
│               │  ┌─────────────────┐   │
│  📊 总览      │  │     页面内容    │   │
│  📅 计划      │  │                 │   │
│  📚 词汇      │  │                 │   │
│  🎯 练习      │  │                 │   │
│  ❌ 错题本    │  └─────────────────┘   │
│  📝 模考      │                         │
│  ⚙️  设置     │                         │
└─────────────────────────────────────────┘
```

### 手机端（≤768px）
```
┌──────────────────┐
│    顶部标题栏    │
├──────────────────┤
│                  │
│    页面内容区    │
│                  │
│                  │
├──────────────────┤
│ 📊 📅 📚 🎯 ⚙️  │
│    底部导航栏    │
└──────────────────┘
```

---

## 核心组件规范

### 卡片（Card）
```css
.card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-gray-100);
}
```

### 主按钮（Button Primary）
```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-5);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover { background: var(--color-primary-dark); }
```

### 词汇卡片翻转效果
```css
.vocab-card { perspective: 1000px; }
.vocab-card-inner { transition: transform 0.4s; transform-style: preserve-3d; }
.vocab-card.flipped .vocab-card-inner { transform: rotateY(180deg); }
.vocab-card-front, .vocab-card-back { backface-visibility: hidden; }
.vocab-card-back { transform: rotateY(180deg); }
```

### 进度条
```css
.progress-bar {
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-gray-200);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  transition: width 0.3s ease;
}
```

---

## 图标规范

使用 Unicode 符号代替图标库（避免引入外部依赖）：

| 功能 | 符号 |
|------|------|
| 总览 | 📊 |
| 计划 | 📅 |
| 词汇 | 📚 |
| 听力 | 🎧 |
| 阅读 | 📖 |
| 写作 | ✍️ |
| 口语 | 🎤 |
| 错题本 | ❌ |
| 模考 | 📝 |
| 同步 | 🔄 |
| 设置 | ⚙️ |
| 完成 | ✅ |
| 未完成 | ⬜ |
