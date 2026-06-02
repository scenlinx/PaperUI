---
date: '2026-05-22'
title: 'PaperUI 自定义与二次开发指南'
cover:
  image: '/images/hero-2.jpg'
categories: ["PaperUI"]
tags: ["Hugo", "PaperUI", "自定义", "CSS"]
description: '如何在不修改主题源码的情况下自定义 PaperUI 的外观和行为，包括颜色定制、布局调整、添加新功能模块等'
---

PaperUI 的设计目标是开箱即用，但你总会有一些个性化的需求。这篇文章介绍如何在不直接修改主题源码的情况下，安全地自定义 PaperUI。

## 为什么不要直接修改主题源码

直接修改 `themes/PaperUI/` 下的文件有几个问题：

1. **主题更新困难**：一旦修改了源码，`git pull` 更新主题时会产生冲突
2. **可维护性差**：其他人（包括未来的你）很难搞清楚哪些是改过的
3. **升级风险**：PaperUI 可能因 Hugo 版本更新而需要修改，你的改动会成为障碍

## Hugo 的文件覆盖机制

Hugo 有一个重要的特性：**项目根目录的同名文件会覆盖主题中的文件**。

```
项目/
├── themes/PaperUI/
│   └── layouts/
│       └── _partials/
│           └── footer.html    ← 主题原始文件
└── layouts/
    └── _partials/
        └── footer.html        ← 你的覆盖文件（优先使用）
```

这意味着你只需要在项目根目录创建相同路径的文件，Hugo 就会使用你的版本而不是主题的。

## 自定义主题颜色

PaperUI 使用 CSS 变量控制所有颜色。最简单的方式是在项目中创建覆盖样式文件。

创建 `assets/css/extended/custom.css`：

```css
/* 修改主题色 */
:root {
  --accent: #3b82f6;              /* 蓝色系主题色 */
  --accent-alpha: rgba(59, 130, 246, 0.1);
  --accent-secondary: #2563eb;
  
  /* 也可以修改其他变量 */
  --content: #1a1a2e;
  --content-secondary: #4a4a6a;
  --border: #e5e7eb;
}

/* 深色模式 */
.dark {
  --accent: #60a5fa;
  --accent-alpha: rgba(96, 165, 250, 0.15);
  --content: #e5e7eb;
  --content-secondary: #9ca3af;
  --border: #374151;
}
```

PaperUI 默认的 accent 色是 `#f87c45`（暖橙色），你可以改成任何颜色。

### 标签颜色自定义

PaperUI 的 8 色标签系统也可以通过 CSS 变量覆盖：

```css
:root {
  --tag-bg-1: #fee2e2;    /* 红色系 */
  --tag-bg-2: #dbeafe;    /* 蓝色系 */
  --tag-bg-3: #d1fae5;    /* 绿色系 */
  --tag-bg-4: #fef3c7;    /* 黄色系 */
  --tag-bg-5: #ede9fe;    /* 紫色系 */
  --tag-bg-6: #fce7f3;    /* 粉色系 */
  --tag-bg-7: #e0f2fe;    /* 天蓝色系 */
  --tag-bg-8: #f3f4f6;    /* 灰色系 */
}
```

## 修改页脚文字

创建 `layouts/_partials/footer.html`，复制主题中的同名文件并修改：

```html
<footer class="footer">
    <div class="footer-content">
        <span>&copy; {{ now.Year }} 你的名字 · 
            Powered by <a href="https://gohugo.io/" target="_blank">Hugo</a> 
            &amp; <a href="https://github.com/scenlinx/PaperUI" target="_blank">PaperUI</a>
        </span>
        {{ if not .Site.Params.footer.hideCopyright }}
        <span class="footer-separator">·</span>
        <span>保持热爱，奔赴山海</span>
        {{ end }}
    </div>
</footer>
```

## 添加自定义 CSS

在 `assets/css/extended/` 目录下创建任意 `.css` 文件，它们会被自动加载。

例如，添加一个简单的打印样式：

```css
/* assets/css/extended/print.css */
@media print {
  .header, .footer, .home-sidebar, .sidebar, .top-link {
    display: none !important;
  }
  .post-content {
    max-width: 100% !important;
  }
}
```

## 添加自定义 JavaScript

创建 `layouts/_partials/extend_head.html`：

```html
<!-- 自定义分析脚本 -->
{{ if hugo.IsProduction }}
<script async src="https://analytics.example.com/script.js"></script>
{{ end }}
```

## 添加新页面模板

比如你想添加一个"友链"页面：

**1. 创建 `content/links/index.md`**

```yaml
---
title: "友情链接"
layout: "links"
---
```

**2. 创建 `layouts/_default/links.html`**

```html
{{ define "main" }}
<article class="post-single">
  <header class="post-header">
    <h1 class="post-title">{{ .Title }}</h1>
  </header>
  <div class="post-content">
    {{ .Content }}
    <!-- 友链列表 -->
    <div class="links-list">
      {{ range .Site.Data.links }}
      <a href="{{ .url }}" target="_blank" rel="noopener" class="link-card">
        <span class="link-name">{{ .name }}</span>
        <span class="link-desc">{{ .description }}</span>
      </a>
      {{ end }}
    </div>
  </div>
</article>
{{ end }}
```

**3. 创建 `data/links.yaml`**

```yaml
- name: "示例博客"
  url: "https://example.com"
  description: "一个很棒的技术博客"
```

## 覆盖整个布局模板

如果需要更大的改动，可以直接覆盖 `layouts/baseof.html` 或 `layouts/list.html`。

建议的做法是复制主题中的原文件到项目对应路径，然后在此基础上修改：

```bash
# 复制主题模板到项目
cp themes/PaperUI/layouts/list.html layouts/_default/list.html
# 然后编辑 layouts/_default/list.html
```

## 使用 Hugo Modules 管理依赖

如果你的项目比较复杂，可以考虑使用 Hugo Modules：

```bash
hugo mod init my-blog
```

在 `hugo.toml` 中：

```toml
[module]
  [[module.imports]]
    path = "github.com/scenlinx/PaperUI"
```

## 贡献回主题

如果你做的改进具有通用价值，欢迎提交 PR 到 PaperUI 仓库。好的社区贡献包括：

- Bug 修复
- 新的翻译文件
- 通用的功能增强
- 文档改进

提交前请确保：
- 功能向后兼容（不破坏现有配置）
- 代码风格与现有代码一致
- 通过了本地测试

## 小结

PaperUI 的自定义遵循 Hugo 的最佳实践 —— 通过文件覆盖和 CSS 变量实现，不修改主题源码。这样既能满足个性化需求，又能在主题更新时无缝升级。

下一篇是系列最后一篇，汇总 PaperUI 使用中的常见问题和最佳实践。
