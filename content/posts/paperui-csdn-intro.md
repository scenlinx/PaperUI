---
date: '2026-06-02'
title: '基于 Hugo PaperMod 的二次开发实践：PaperUI 主题的技术实现分享'
categories: ["PaperUI"]
tags: ["Hugo", "PaperUI", "PaperMod", "静态网站", "博客搭建", "开源"]
description: '分享一个基于 Hugo PaperMod 进行二次开发的技术实践：PaperUI 主题。文章从技术实现角度介绍轮播系统、侧边栏、彩色标签等功能的开发思路。'
---

![PaperUI 主题预览](https://paperui.newmt.fun/images/image.png)

## 写在前面

本文分享一个个人技术项目：[PaperUI](https://github.com/scenlinx/PaperUI) —— 基于 Hugo 社区主题 PaperMod 进行的二次开发实践。项目针对个人中文博客的使用场景，添加了一些自用的功能和调整。

PaperMod 是 Hugo 生态中非常优秀的主题，作者 Aditya Telange 和社区贡献者做了大量出色的工作。PaperUI 只是在 PaperMod 的基础上做了一些个人化的补充，并非替代或竞争关系。

---

## 一、为什么选择基于 PaperMod 二次开发

### 1.1 PaperMod 的优势

选择 PaperMod 作为基础，主要看中以下几点：

- **零外部依赖**，性能表现出色
- **CSS 变量驱动的主题系统**，便于定制和覆盖
- **完善的 SEO 支持**（Open Graph、Twitter Cards、JSON-LD）
- **多语言支持**，内置 46 种语言翻译
- **社区成熟**，文档完善，问题排查方便

### 1.2 二次开发的出发点

在使用过程中，个人有一些额外的需求：

- 首页希望有更丰富的内容展示形式
- 想增加侧边栏放置分类、标签等导航元素
- 移动端导航体验想做一些调整
- 部分 UI 文字想适配中文语境

这些需求属于个人偏好，并非 PaperMod 的不足。PaperMod 面向全球用户，设计上追求简洁通用，这是它的设计选择。

### 1.3 开发原则

1. **保持兼容**：PaperMod 用户的配置文件切换到 PaperUI 后应基本可用
2. **性能优先**：新功能不显著增加页面加载体积
3. **增量修改**：尽可能通过参数控制，不破坏原有功能
4. **可回退**：新功能都是可选的，不配置就不启用

---

## 二、主要功能的技术实现

### 2.1 首页轮播布局

在首页增加了一个三栏展示区，通过 Hugo 模板和 CSS Grid 实现：

```
┌──────────────────────┬──────────┬──────┐
│                      │  Square  │      │
│    Hero Carousel     ├──────────┤Port. │
│      (16:9)          │  Square  │(3:4) │
│                      │          │      │
└──────────────────────┴──────────┴──────┘
```

配置参数：

```toml
[params.homeCarousel]
slides = [
  { image = '/images/hero-1.webp', url = '/posts/post-1/', alt = '描述' },
]
middle = [
  { image = '/images/square-1.webp', url = '/posts/post-2/', alt = '描述' },
]
right = { image = '/images/portrait-1.webp', url = '/about/', alt = '关于' }
```

如果不配置 `homeCarousel`，首页使用 PaperMod 原有的 `homeInfoParams` 文字模式，互不冲突。

### 2.2 侧边栏组件

在文章页和列表页增加了固定侧边栏，位置在内容区域左侧。侧边栏包含分类列表和标签云两个小组件，数据来自 Hugo 的 `site.Taxonomies`。

移动端通过 CSS `display: none` 自动隐藏侧边栏，不影响小屏阅读。

侧边栏的样式复用了主题的 CSS 变量，与整体风格保持一致。

### 2.3 彩色标签

为标签增加了 8 色循环配色，使用 CSS `nth-child` 实现：

```css
.sidebar-tag:nth-child(8n+1) { background: var(--tag-bg-1); color: var(--tag-1); }
.sidebar-tag:nth-child(8n+2) { background: var(--tag-bg-2); color: var(--tag-2); }
```

颜色值定义在 CSS 变量中，用户可以在 `assets/css/extended/` 下建文件覆盖。

### 2.4 搜索功能调整

在保留 PaperMod 原有搜索页面的基础上，增加了两个搜索入口：

- **首页侧边栏搜索框**：方便在首页快速查找
- **模态框搜索**：点击搜索图标或 `Ctrl+K` / `Cmd+K` 唤出

搜索仍使用 Fuse.js 在客户端完成，没有引入新的依赖。

### 2.5 移动端导航

增加了汉堡菜单按钮，点击后从右侧滑出导航面板。实现方式：

```css
.mobile-menu {
    position: fixed; top: 0; right: 0;
    width: min(280px, 80vw);
    transform: translateX(100%);
    transition: transform 0.3s;
}
.mobile-menu.active { transform: translateX(0); }
```

同时增加了遮罩层，点击遮罩或按 `Escape` 键关闭菜单。

### 2.6 LLM 支持

增加了 `llms.txt` 输出模板。这是一个社区提议的标准（[llmstxt.org](https://llmstxt.org/)），用于向 AI 搜索引擎提供站点内容索引。需在配置中启用：

```toml
[outputFormats.LLMS]
mediaType = 'text/plain'
baseName = 'llms'

[outputs]
home = ['HTML', 'RSS', 'JSON', 'LLMS']
```

---

## 三、性能表现

以本博客（[paperui.newmt.fun](https://paperui.newmt.fun)）为例，构建产物体积如下：

| 资源 | 大小 |
|------|------|
| CSS（源文件 17 个，合并压缩后） | ~49 KB |
| Go 模板（49 个文件） | ~262 KB |
| JavaScript（Fuse.js + 功能代码） | ~34 KB |
| 页面图片（6 张 WebP） | ~126 KB |

Lighthouse 评分保持在 95-100 之间。

---

## 四、项目结构

```
themes/PaperUI/
├── assets/
│   ├── css/
│   │   ├── core/          # 基础样式（reset、变量、响应式）
│   │   ├── common/        # 组件样式（11 个文件）
│   │   ├── extended/      # 扩展样式（用户可覆盖）
│   │   └── includes/      # Chroma 代码高亮
│   └── js/                # 搜索、轮播等脚本
├── layouts/
│   ├── _partials/         # 模板片段（24 个）
│   ├── _shortcodes/       # 短代码（8 个）
│   └── ...                # 页面模板
└── i18n/                  # 语言翻译（46 种）
```

---

## 五、快速体验

有两种方式可以体验 PaperUI：

### 方式一：直接使用示例博客

一个可运行的完整博客示例：**[github.com/scenlinx/NewMT-hugo](https://github.com/scenlinx/NewMT-hugo)**

```bash
git clone https://github.com/scenlinx/NewMT-hugo.git
cd NewMT-hugo
hugo server -D
```

访问 `http://localhost:1313/` 即可看到效果。该仓库包含完整的配置、示例文章和部署配置，可作为博客模板使用。

### 方式二：安装到现有 Hugo 站点

```bash
cd your-hugo-site
git submodule add https://github.com/scenlinx/PaperUI.git themes/PaperUI
```

然后修改 `hugo.toml`：

```toml
theme = 'PaperUI'
```

### 完整配置参考

```toml
baseURL = 'https://yourdomain.com/'
title = '站点标题'
theme = 'PaperUI'
defaultContentLanguage = 'zh-cn'

[params]
env = 'production'
defaultTheme = 'auto'
ShowToc = true
ShowCodeCopyButtons = true
homePostCount = 8
```

---

## 六、部署

使用 GitHub Actions 自动部署到 Cloudflare Pages 或 GitHub Pages：

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: '0.162.1'
          extended: true
      - run: hugo
      # 部署到目标平台
```

---

## 七、与 PaperMod 的差异一览

以下列出 PaperUI 在 PaperMod 基础上增加或修改的部分，供参考：

| 方面 | 说明 |
|------|------|
| 首页布局 | 增加了可选的轮播三栏布局，不配置时保持原有样式 |
| 侧边栏 | 增加了固定侧边栏，放置分类、标签等组件 |
| 标签颜色 | 增加了 8 色循环配色 |
| 搜索入口 | 增加了模态框和侧边栏搜索入口 |
| 移动端导航 | 增加了汉堡菜单和侧滑面板 |
| 中文 UI | 调整了部分 UI 文字为中文 |
| LLM 支持 | 增加了 `llms.txt` 输出 |

以上功能均为**可选项**，不配置不影响原有功能。

---

## 八、开源

- 主题仓库：[github.com/scenlinx/PaperUI](https://github.com/scenlinx/PaperUI)
- 示例博客：[github.com/scenlinx/NewMT-hugo](https://github.com/scenlinx/NewMT-hugo)
- 在线 Demo：[paperui.newmt.fun](https://paperui.newmt.fun)
- 协议：MIT

欢迎 Star、Issue 和 PR。

---

**相关资源：**

- [PaperUI 配置参数说明](https://paperui.newmt.fun/posts/paperui-config-guide/)
- [Hugo 配置文件逐行详解](https://paperui.newmt.fun/posts/hugo-toml-config-guide/)
- [PaperMod 原项目](https://github.com/adityatelange/hugo-PaperMod)

---

*本文发布于 [paperui.newmt.fun](https://paperui.newmt.fun)。*
