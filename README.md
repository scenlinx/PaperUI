# 新墨韬 · NewMT

> 个人技术博客 · Personal Tech Blog
>
> **PaperUI** — 一个更懂中文博客的 Hugo 主题

[![Hugo](https://img.shields.io/badge/Hugo-v0.162+-blue?logo=hugo)](https://gohugo.io)
[![Theme](https://img.shields.io/badge/Theme-PaperUI-orange?logo=hugo)](https://github.com/scenlinx/PaperUI)
[![GitHub stars](https://img.shields.io/github/stars/scenlinx/NewMT-hugo?style=social)](https://github.com/scenlinx/NewMT-hugo)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 目录

- [站点简介](#站点简介--about)
- [技术栈](#技术栈)
- [特色功能](#特色功能--features)
- [快速开始](#快速开始--quick-start)
- [完整配置](#完整配置)
- [文章列表](#文章列表)
- [项目结构](#项目结构--project-structure)
- [部署指南](#部署--deployment)
- [SEO 优化](#seo-优化--seo)
- [PaperUI 主题详解](#paperui-主题--theme)
- [常见问题](#常见问题)
- [许可与联系](#许可--license)

---

## 站点简介 · About

**新墨韬**（NewMT）是一个专注于**技术分享**与**开源实践**的个人博客。站名取自"新墨韬"三字：用新的笔墨，记录技术路上的韬略与思考。

本站使用 [Hugo](https://gohugo.io) 静态站点生成器构建，采用自研的 [PaperUI](https://github.com/scenlinx/PaperUI) 主题（基于 PaperMod 深度定制），部署在 Cloudflare Pages / GitHub Pages 上。

### 内容覆盖

| 方向 | 涵盖内容 |
|------|----------|
| **Hugo 生态** | 主题开发、配置优化、PaperUI 系列教程、模板源码分析 |
| **版本控制** | Git 工作流、分支策略、团队协作、CI/CD 集成 |
| **编程语言** | Python 编码实践、类型提示、代码规范 |
| **Linux 运维** | 命令行技巧、权限管理、进程监控、Shell 脚本 |
| **开发工作流** | 现代 DevOps 实践、Docker 容器化、自动化部署 |

### 文章统计

| 指标 | 数值 |
|------|------|
| 文章总数 | 15 篇 |
| PaperUI 主题系列 | 11 篇 |
| 通用技术文章 | 4 篇 |
| 分类数 | 2 个（PaperUI、技术） |
| 标签数 | 29 个 |

**站点地址：** [https://paperui.newmt.fun](https://paperui.newmt.fun)

---

## 技术栈

| 层级 | 技术 | 版本要求 | 说明 |
|------|------|----------|------|
| 站点生成器 | [Hugo](https://gohugo.io) | v0.146.0+（推荐 v0.162+） | 极速静态站点生成，本机使用 `hugo_extended_0.162.1_windows-amd64` |
| 主题框架 | [PaperUI](https://github.com/scenlinx/PaperUI) | — | 基于 PaperMod 的中文优化主题 |
| 搜索引擎 | [Fuse.js](https://fusejs.io) | v7.0.0（vendored） | 客户端模糊搜索，零外部网络请求 |
| 托管平台 | Cloudflare Pages / GitHub Pages | — | 全球 CDN 加速，自动部署 |
| CI/CD | GitHub Actions | — | 自动构建与部署 |
| 评论系统 | Giscus（可选） | — | 基于 GitHub Discussions，未启用 |
| 分析工具 | 无 | — | 本站未使用任何第三方分析服务 |

---

## 特色功能 · Features

### PaperUI 主题特性详解

PaperUI 基于 PaperMod 深度定制，专为中文博客场景优化，以下是完整的特性列表：

#### 首页轮播系统

三栏式布局，通过 `[params.homeCarousel]` 配置：

```
┌─────────────────────┬──────────┬──────┐
│                     │  Square  │      │
│    Hero Carousel    ├──────────┤Port. │
│      (16:9)         │  Square  │(3:4) │
│                     │          │      │
└─────────────────────┴──────────┴──────┘
```

- **左侧**：16:9 主轮播图，支持自动播放、左右切换、指示器
- **中部**：1:1 正方形卡片，可展示多张
- **右侧**：3:4 竖版肖像图

> 不配置 `homeCarousel` 时，自动回退为文字版 `homeInfoParams`。

#### 双栏布局

首页和内页均可启用侧边栏，侧边栏包含：

| 小部件 | 位置 | 说明 |
|--------|------|------|
| 搜索框 | 首页侧边栏 | 输入即搜，实时过滤 |
| 分类列表 | 首页 + 内页 | 带文章计数的分类导航 |
| 标签云 | 首页 + 内页 | 彩色标签，8 色循环 |
| 随机文章 | 首页侧边栏 | 每次刷新随机展示 5 篇 |
| 近期文章 | 首页侧边栏 | 最新发布的 5 篇文章 |
| 文章目录 | 文章页侧边栏 | 自动提取标题层级，锚点导航 |

移动端侧边栏自动隐藏，不影响阅读体验。

#### 彩色标签系统

内置 8 色调色板，自动循环为标签着色：

| 序号 | 亮色模式 | 暗色模式 | 色值 |
|------|----------|----------|------|
| 1 | 红 | 浅红 | `#ef4444` |
| 2 | 橙 | 浅橙 | `#f97316` |
| 3 | 黄 | 浅黄 | `#eab308` |
| 4 | 绿 | 浅绿 | `#22c55e` |
| 5 | 青 | 浅青 | `#06b6d4` |
| 6 | 蓝 | 浅蓝 | `#3b82f6` |
| 7 | 紫 | 浅紫 | `#8b5cf6` |
| 8 | 粉 | 浅粉 | `#ec4899` |

标签配色在 `assets/css/extended/tag-colors.css` 中定义，可直接覆盖。

#### 搜索增强

- **侧边栏搜索**：首页右侧实时搜索
- **模态框搜索**：点击搜索图标或 `Ctrl+K` / `Cmd+K` 唤出
- **键盘导航**：上下键选择，回车打开
- **模糊匹配**：基于 Fuse.js，容忍拼写错误

搜索索引通过 `content/search/_index.md` 激活，数据源为 Hugo 生成的 `/index.json`。

#### 中文深度本地化

| 模块 | PaperMod 原版 | PaperUI |
|------|--------------|---------|
| 面包屑 | 英文 | 中文导航文字 |
| 页脚 | "Powered by Hugo" | "由 Hugo 与 PaperUI 驱动" |
| 存档格式 | "January 2026" | "2026 年 1 月" |
| 搜索框 | "Search..." | "输入关键词搜索文章..." |
| 无障碍标签 | 英文 | 中文 |

#### 性能指标

- **零外部依赖**：不引入 Google Fonts、CDN 字体、第三方 CSS/JS 框架
- **CSS 变量驱动**：所有主题色、间距、字体使用 CSS 自定义属性
- **按需加载**：搜索 JS 和轮播 JS 按需加载
- **资源指纹化**：Hugo asset pipeline 自动添加内容哈希
- **Lighthouse 得分**：95-100（典型值）

| 指标 | 得分 | 说明 |
|------|------|------|
| Performance | 98-100 | 首屏加载极快 |
| Accessibility | 100 | 语义化 HTML，完整 ARIA 标签 |
| Best Practices | 100 | HTTPS、无混合内容 |
| SEO | 100 | 结构化数据、元标签完整 |

---

## 快速开始 · Quick Start

### 前置要求

1. **Hugo v0.146.0+**（推荐 v0.162+ 的 extended 版本）
   - 下载：[Hugo Releases](https://github.com/gohugoio/hugo/releases)
   - 本机使用：`hugo_extended_0.162.1_windows-amd64.zip`
2. **Git** — 版本管理

### 安装 Hugo（Windows）

```powershell
# 使用 Scoop（推荐）
scoop install hugo-extended

# 或手动安装
# 1. 下载 hugo_extended_0.162.1_windows-amd64.zip
# 2. 解压到 D:\hugo\bin\
# 3. 将 D:\hugo\bin\ 加入 PATH 环境变量
# 4. 验证安装
hugo version
```

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/scenlinx/NewMT-hugo.git
cd NewMT-hugo

# 启动开发服务器（含草稿文章）
hugo server -D
```

打开 `http://localhost:1313/` 即可预览。修改文件后浏览器自动刷新。

### 开发服务器参数

```bash
hugo server -D            # 显示草稿文章
hugo server --navigateToChanged  # 修改后自动跳到当前页面
hugo server --disableFastRender   # 禁用快速渲染（部分模板修改需要）
hugo server --bind 0.0.0.0        # 局域网设备可访问
```

### 构建静态页面

```bash
hugo
```

生成的静态文件位于 `public/` 目录。构建时可指定环境变量控制行为：

```bash
hugo --environment production    # 生产环境（压缩、指纹化）
hugo --environment development   # 开发环境（不压缩，方便调试）
hugo --minify                    # 强制压缩 HTML/CSS/JS
```

---

## 完整配置

### 当前 hugo.toml（完整版）

本博客当前使用的完整配置文件：

```toml
baseURL = 'https://paperui.newmt.fun/'
title = '新墨韬'
theme = 'PaperUI'
defaultContentLanguage = 'zh-cn'
enableRobotsTXT = true
enableEmoji = true

[outputFormats.LLMS]
mediaType = 'text/plain'
baseName = 'llms'

[outputs]
home = ['HTML', 'RSS', 'JSON', 'LLMS']

[params]
env = 'production'
author = '新墨韬'
description = '新墨韬 - 个人技术博客'
DateFormat = '2006-01-02'
keywords = ['博客', 'Hugo', 'PaperUI', '技术']
mainSections = ['posts']
defaultTheme = 'auto'
disableThemeToggle = false
disableScrollToTop = false
ShowReadingTime = true
ShowWordCount = true
ShowShareButtons = false
ShowPostNavLinks = true
ShowBreadCrumbs = false
ShowCodeCopyButtons = true
ShowToc = true
ShowPageNums = true
ShowRssButtonInSectionTermList = true
ShowAllPagesInArchive = false
ShowFullTextinRSS = false
homePostCount = 8

[params.label]
icon = '/images/logo.svg'
iconHeight = 24
images = ['/images/hero-1.jpg']

[params.homeInfoParams]
Title = '欢迎来到新墨韬'
Content = '这里是一个技术博客，分享编程、开源和生活中的思考。'

[params.homeCarousel]
slides = [
  { image = '/images/hero-1.jpg', url = '/posts/paperui-introduction/', alt = 'PaperUI 主题介绍' },
  { image = '/images/hero-2.jpg', url = '/posts/papermod-advantages/', alt = 'PaperMod 优势详解' },
  { image = '/images/hero-3.jpg', url = '/posts/git-guide/', alt = 'Git 使用指南' },
]
middle = [
  { image = '/images/square-1.jpg', url = '/posts/python-tips/', alt = 'Python 技巧分享' },
  { image = '/images/square-2.jpg', url = '/posts/linux-commands/', alt = 'Linux 命令速查' },
]
right = { image = '/images/portrait-1.jpg', url = '/about/', alt = '关于作者' }

[params.assets]
favicon = '/favicon.svg'
favicon16x16 = '/favicon.svg'
favicon32x32 = '/favicon.svg'

[languages.zh-cn]
locale = 'zh-CN'
label = '中文'
title = '新墨韬'
weight = 1

[[languages.zh-cn.menu.main]]
name = '首页'
url = '/'
weight = 1

[[languages.zh-cn.menu.main]]
name = '文章'
url = '/posts/'
weight = 2

[[languages.zh-cn.menu.main]]
name = '分类'
url = '/categories/'
weight = 3

[[languages.zh-cn.menu.main]]
name = '归档'
url = '/archives/'
weight = 4

[[languages.zh-cn.menu.main]]
name = '关于'
url = '/about/'
weight = 5
```

### 各参数速查

#### 基础参数

| 参数 | 示例值 | 说明 |
|------|--------|------|
| `baseURL` | `https://paperui.newmt.fun/` | 站点域名，末尾 `/` 不可少 |
| `title` | `新墨韬` | 浏览器标签页标题、RSS 标题 |
| `theme` | `PaperUI` | 主题名称，对应 `themes/PaperUI/` |
| `defaultContentLanguage` | `zh-cn` | 默认语言 |
| `enableRobotsTXT` | `true` | 自动生成 `robots.txt` |
| `enableEmoji` | `true` | 允许 `:smile:` 等 Emoji 短码 |

#### 文章显示控制

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `ShowToc` | `true` | 显示侧边栏目录 |
| `ShowReadingTime` | `true` | 显示阅读时间估算 |
| `ShowWordCount` | `true` | 显示字数统计 |
| `ShowCodeCopyButtons` | `true` | 代码块复制按钮 |
| `ShowPostNavLinks` | `true` | 上一篇/下一篇导航 |
| `ShowShareButtons` | `false` | 社交分享按钮 |
| `ShowBreadCrumbs` | `false` | 面包屑导航 |

#### 文章 Front Matter 参数

每篇文章支持的参数：

```yaml
---
date: '2026-05-30'
title: '文章标题'
categories: ["分类名"]
tags: ["标签1", "标签2"]
description: '文章摘要，用于 SEO 和列表展示'
cover:
  image: '/images/hero-1.jpg'  # 封面图（可选）
  hidden: false                # 全局隐藏封面
  hiddenInList: false          # 列表中隐藏封面
  hiddenInSingle: false        # 文章中隐藏封面
ShowToc: false                 # 单独禁用本文目录
wideLayout: true               # 宽版布局（隐藏侧边栏）
searchHidden: true             # 从搜索结果中隐藏
hideTitle: true                # 隐藏标题
hideMeta: true                 # 隐藏元信息
comments: true                 # 启用评论
---
```

### 图片资源规格

| 用途 | 比例 | 推荐尺寸 | 文件 |
|------|------|----------|------|
| 轮播大图（slides） | 16:9 | 1200×675 | `hero-1.jpg` / `.webp` |
| 正方形卡片（middle） | 1:1 | 600×600 | `square-1.jpg` / `.webp` |
| 竖版图片（right） | 3:4 | 600×800 | `portrait-1.jpg` / `.webp` |
| 文章封面（cover） | 16:10 | 1200×750 | 与轮播图可共用 |
| 站点图标 | 1:1 | 任意 | `favicon.svg` |
| Logo | 1:1 | 100×100 | `logo.svg` |

---

## 文章列表

### PaperUI 主题系列（11 篇）

| 文章 | 日期 | 描述 |
|------|------|------|
| [PaperUI 主题介绍](/posts/paperui-introduction/) | 2026-05-30 | PaperUI 定位与功能介绍 |
| [为什么选择 PaperMod 做二次开发](/posts/why-paperui/) | 2026-05-28 | 技术决策过程与开发原则 |
| [PaperMod 为什么受欢迎](/posts/papermod-advantages/) | 2026-05-29 | 深度分析 PaperMod 设计哲学 |
| [PaperUI 功能全解析](/posts/paperui-features/) | 2026-05-27 | 逐一详解新增功能 |
| [安装与快速上手](/posts/paperui-quickstart/) | 2026-05-26 | 5 分钟完成安装配置 |
| [完整配置指南](/posts/paperui-config-guide/) | 2026-05-25 | 参数参考手册 |
| [配置文件逐行详解](/posts/hugo-toml-config-guide/) | 2026-05-31 | 模板源码级配置分析 |
| [自定义与二次开发](/posts/paperui-customization/) | 2026-05-22 | 安全定制外观和行为 |
| [部署到生产环境](/posts/paperui-deployment/) | 2026-05-23 | GitHub Pages / Cloudflare Pages 部署 |
| [SEO 优化实践](/posts/paperui-seo/) | 2026-05-24 | 搜索引擎优化指南 |
| [常见问题与最佳实践](/posts/paperui-faq-best-practices/) | 2026-05-21 | FAQ 与 Hugo 博客最佳实践 |

### 技术文章（4 篇）

| 文章 | 日期 | 标签 |
|------|------|------|
| [Git 实用指南](/posts/git-guide/) | 2026-05-18 | Git、版本控制、团队协作 |
| [Python 编码习惯](/posts/python-tips/) | 2026-05-20 | Python、编程、最佳实践 |
| [Linux 命令行技巧](/posts/linux-commands/) | 2026-05-20 | Linux、命令行、运维 |
| [现代开发工作流](/posts/modern-development-workflow/) | 2026-06-01 | 开发流程、Git、Docker、CI/CD |

---

## 项目结构 · Project Structure

```
NewMT-hugo/
│
├── assets/                    # Hugo 资源管道
│   └── images/
│       └── logo.svg           # 站点 logo（经管道处理）
│
├── content/                   # Markdown 内容源
│   ├── about/
│   │   └── index.md           # 关于页面
│   ├── archives/
│   │   └── index.md           # 归档页面
│   ├── categories/
│   │   └── _index.md          # 分类索引
│   ├── posts/                 # 所有博客文章
│   │   ├── _index.md
│   │   ├── git-guide.md
│   │   ├── python-tips.md
│   │   ├── linux-commands.md
│   │   ├── modern-development-workflow.md
│   │   ├── paperui-introduction.md
│   │   ├── why-paperui.md
│   │   ├── papermod-advantages.md
│   │   ├── paperui-features.md
│   │   ├── paperui-quickstart.md
│   │   ├── paperui-config-guide.md
│   │   ├── hugo-toml-config-guide.md
│   │   ├── paperui-customization.md
│   │   ├── paperui-deployment.md
│   │   ├── paperui-seo.md
│   │   └── paperui-faq-best-practices.md
│   ├── search/
│   │   └── index.md           # 搜索页面
│   └── tags/
│       └── _index.md          # 标签索引
│
├── data/                      # 数据文件（预留）
│
├── i18n/                      # 多语言翻译（预留）
│
├── layouts/                   # 根级模板覆盖
│
├── static/                    # 原始静态资源
│   └── images/
│       ├── favicon.svg
│       ├── hero-1.jpg / .webp
│       ├── hero-2.jpg / .webp
│       ├── hero-3.jpg / .webp
│       ├── portrait-1.jpg / .webp
│       ├── square-1.jpg / .webp
│       └── square-2.jpg / .webp
│
├── themes/
│   └── PaperUI/               # PaperUI 主题
│       ├── assets/
│       │   ├── css/           # 18 个 CSS 文件，~2010 行
│       │   └── js/            # 3 个 JS 文件（fastsearch, fuse, carousel）
│       ├── layouts/           # 47 个模板文件，~2873 行
│       ├── i18n/              # 46 种语言翻译
│       └── theme.toml         # 主题元信息
│
├── archetypes/
│   └── default.md             # hugo new 使用的文章模板
│
├── public/                    # 构建输出（gitignore）
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions 部署配置
│
├── hugo.toml                  # 站点核心配置
├── hugo.exe                   # Hugo 可执行文件
└── README.md
```

### 主题文件统计

| 分类 | 文件数 | 代码行数 |
|------|--------|----------|
| CSS 样式 | 17 | ~2,010 |
| Go 模板 | 47 | ~2,873 |
| 翻译文件 | 46 | — |
| JavaScript | 3 | ~340 |
| **合计** | **113** | **~5,223** |

---

## 部署 · Deployment

### GitHub Actions 自动部署

项目包含 `.github/workflows/deploy.yml`，当推送到 `main` 分支时自动构建并部署。

**支持的平台：**

#### Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Pages**
3. 点击 **Connect to Git**，授权 GitHub 仓库
4. 配置构建信息：
   - 构建命令：`hugo`
   - 输出目录：`public`
5. 部署后 Cloudflare 自动分配 `*.pages.dev` 域名，可绑定自定义域名

#### GitHub Pages

1. 仓库 **Settings** → **Pages**
2. Source 选择 **GitHub Actions**
3. 推送代码后自动触发部署
4. 访问 `https://<username>.github.io/<repository>/`

### 手动部署

```bash
# 构建生产版本
hugo --environment production

# 将 public/ 目录上传到任何静态托管服务
# 或使用 rsync 部署到 VPS
rsync -avz --delete public/ user@server:/var/www/html/
```

### 部署前检查清单

- [ ] `baseURL` 已改为真实域名
- [ ] `env = 'production'`（开启压缩和指纹化）
- [ ] 图片已准备 .webp 格式
- [ ] `enableRobotsTXT = true`
- [ ] 提交 Sitemap 到 Google Search Console
- [ ] 配置自定义 404 页面
- [ ] 测试分享卡片预览（OG / Twitter）

---

## SEO 优化 · SEO

### 内置 SEO 能力

本站完全继承 PaperMod 的 SEO 体系，并在此基础上做了延伸：

| 能力 | 实现方式 | 说明 |
|------|----------|------|
| **Open Graph** | `opengraph.html` 模板 | `og:title`、`og:description`、`og:image`、`og:type` 等 |
| **Twitter Cards** | `twitter_cards.html` 模板 | `summary_large_image` 卡片 |
| **JSON-LD** | `schema_json.html` 模板 | BlogPosting 结构化数据 |
| **Canonical URL** | `post_canonical.html` | 避免重复内容 |
| **Sitemap** | 自动生成 | XML Sitemap，含所有文章 URL |
| **robots.txt** | 模板生成 | 生产环境允许爬虫，开发环境禁止 |
| **RSS** | 自动生成 | RSS 2.0 格式 |
| **llms.txt** | 模板生成 | AI 搜索引擎优化（新增） |

### 封面图与分享图选择逻辑

```
社交分享（OG / Twitter / JSON-LD）图片优先级：
1. front matter 的 cover.image
    ↓（无 cover.image）
2. 页面资源束中名含 feature / cover / thumbnail 的图片
    ↓（无匹配资源）
3. site.Params.images 全局默认图
    ↓（无全局配置）
4. front matter 的 images: [] 数组
    ↓（全无）
5. 不输出 og:image（分享无预览图）
```

页面可见封面图只走路线 1（`cover.image`），无后备。

### 文章 SEO 检查清单

每篇文章建议检查：

- [ ] 标题 60 字符以内，含核心关键词
- [ ] `description` 150 字以内，准确概括内容
- [ ] 合理设置 `categories` 和 `tags`
- [ ] 文章只有一个 H1（自动生成），H2/H3 构建清晰层级
- [ ] 图片有描述性 `alt` 文本
- [ ] 内部链接使用相对路径，方便站点迁移
- [ ] （可选）设置 `cover.image` 用于分享预览

---

## PaperUI 主题 · Theme

PaperUI 是本博客自研的 Hugo 主题，目前独立维护。

### 主题仓库

- **GitHub：** [github.com/scenlinx/PaperUI](https://github.com/scenlinx/PaperUI)
- **开源协议：** MIT
- **最低 Hugo 版本：** v0.146.0+

### 安装方式

**方式一：Git Submodule（推荐）**

```bash
git submodule add https://github.com/scenlinx/PaperUI.git themes/PaperUI
```

**方式二：手动下载**

从 GitHub Releases 下载最新版，解压到 `themes/PaperUI/`。

### 与 PaperMod 对比

| 维度 | PaperMod | PaperUI |
|------|----------|---------|
| 首页布局 | 单栏文章列表 | 三栏轮播 + 侧边栏 |
| 侧边栏 | 无 | 分类/标签/搜索/随机/近期文章 |
| 目录 | 内联折叠式 | 固定侧边栏 |
| 标签样式 | 单色 | 8 色循环 |
| 搜索 | 页面搜索 | 模态框 + 侧边栏双入口 |
| 移动端导航 | 无专门优化 | 汉堡菜单 + 侧滑导航 |
| 中文适配 | 基础 | 深度本地化 |
| LLM 支持 | 无 | `llms.txt` |

---

## 常见问题

### 如何写一篇新文章？

```bash
hugo new posts/my-new-post.md
```

然后在 `content/posts/my-new-post.md` 中编辑内容。Hugo 会自动填充模板中的 front matter。

### 图片放哪里？

- **文章引用图片**：放到 `static/images/` 目录，Markdown 中引用 `/images/xxx.jpg`
- **站点 Logo**：放到 `assets/images/` 目录（经过 Hugo 资源管道处理）
- **封面图**：在 front matter 中指定 `cover.image: '/images/xxx.jpg'`

### 如何修改主题颜色？

在 `assets/css/extended/` 下新建 CSS 文件（文件名任意），覆盖 CSS 变量：

```css
:root {
    --accent: #ff6600;       /* 主题色 */
    --tag-1: #dc2626;        /* 标签颜色 */
}
```

### 如何启用评论？

1. 在 [giscus.app](https://giscus.app) 配置你的 GitHub 仓库
2. 将配置信息填入 `hugo.toml` 的 `[params.giscus]`
3. 在需要评论的文章 front matter 中设置 `comments: true`
4. 全局启用可在 `hugo.toml` 设置 `params.comments: true`

### 如何添加自定义代码（统计/广告等）？

主题提供了三个扩展点，在 `layouts/partials/` 下创建同名文件即可覆盖：

| 扩展点 | 插入位置 | 用途 |
|--------|----------|------|
| `extend_head.html` | `<head>` 结束前 | 统计分析、第三方 SDK |
| `extend_footer.html` | `</body>` 前 | 底部脚本 |
| `extend_post_content.html` | 文章内容后、页脚前 | 文章底部广告/推荐 |

### 构建报错怎么办？

```bash
# 清除缓存
hugo --cleanDestinationDir

# 显示详细错误
hugo server --debug

# 检查模板语法
hugo --renderToMemory

# 常见错误：
# "hugo v0.146.0 or greater is required" → 升级 Hugo 版本
# "page not found" → 检查链接和 slug
# "TOC 被 header 遮挡" → 已修复（scroll-padding-top）
```

---

## 许可 · License

- **代码**（主题、配置文件、构建脚本）：[MIT License](LICENSE) © 2026 新墨韬
- **文章内容**：署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)

---

## 联系 · Contact

- **GitHub：** [@scenlinx](https://github.com/scenlinx) — 关注项目动态和更新
- **邮箱：** scenlinx@163.com
- **博客：** [https://paperui.newmt.fun](https://paperui.newmt.fun)

---

*用文字记录思考，用代码实践技术。*

**觉得这个项目有用？欢迎 Star ⭐ 和 Fork！**
