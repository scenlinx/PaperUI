# 新墨韬 · NewMT

> 个人技术博客 · Personal Tech Blog
>
> **PaperUI** — 一个更懂中文博客的 Hugo 主题

[![Hugo](https://img.shields.io/badge/Hugo-v0.162+-blue?logo=hugo)](https://gohugo.io)
[![Theme](https://img.shields.io/badge/Theme-PaperUI-orange?logo=hugo)](https://github.com/scenlinx/PaperUI)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 站点简介 · About

新墨韬是一个专注于**技术分享**与**开源实践**的个人博客，使用 [Hugo](https://gohugo.io) 静态站点生成器构建，采用自研的 [PaperUI](https://github.com/scenlinx/PaperUI) 主题。

本站覆盖的主题包括：

- **Hugo 静态站点** — 主题定制、配置优化、部署实践
- **开源工具** — Git、Docker、Linux、CI/CD 工作流
- **编程实践** — Python、Go、前端开发技巧
- **开发方法论** — 工作流优化、工程化实践

**站点地址：** [https://newmo.tech](https://newmo.tech)

---

## 特色功能 · Features

### PaperUI 主题特性

PaperUI 基于 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 深度定制，专为中文博客场景优化：

| 功能 | 说明 |
|------|------|
| 🎠 **首页轮播** | 16:9 主轮播 + 正方形卡片 + 竖版图片三栏展示 |
| 📐 **双栏布局** | 首页与内页均支持侧边栏（分类、标签、搜索、随机/近期文章） |
| 🎨 **彩色标签系统** | 8 色循环配色，标签和分类视觉更丰富 |
| 🔍 **搜索增强** | 侧边栏搜索 + 模态框搜索 + `Ctrl+K` 快捷键 |
| 📱 **移动端优化** | 汉堡菜单 + 侧滑导航，移动端自动隐藏侧边栏 |
| 🌏 **中文深度本地化** | 面包屑、页脚、存档格式等全部中文化 |
| 🤖 **LLM 友好** | 内置 `llms.txt`，方便 AI 搜索引擎索引 |
| ⚡ **极致性能** | Lighthouse 评分 95-100，零外部依赖 |
| 🌓 **深色/浅色模式** | 跟随系统或手动切换，过渡平滑 |
| 📡 **SEO 完善** | Open Graph、Twitter Cards、JSON-LD 结构化数据 |
| 📰 **RSS 订阅** | 完整 RSS 2.0 输出，支持全文/摘要模式 |

### 内容亮点

- 11 篇 PaperUI 主题系列文章（从介绍到部署全流程）
- 4 篇通用技术文章（Git、Python、Linux、开发工作流）
- 持续更新的技术博客

---

## 快速开始 · Quick Start

### 前置要求

- [Hugo](https://gohugo.io/installation/) v0.146.0+（推荐 v0.162+）
- Git

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/scenlinx/NewMT-hugo.git
cd NewMT-hugo

# 启动开发服务器
hugo server -D
```

打开 `http://localhost:1313/` 即可预览。

### 构建静态页面

```bash
hugo
```

生成的静态文件位于 `public/` 目录，可直接部署到任何静态托管平台。

---

## 配置参考 · Configuration

核心配置文件 `hugo.toml`：

```toml
baseURL = 'https://newmo.tech/'
title = '新墨韬'
theme = 'PaperUI'
defaultContentLanguage = 'zh-cn'

[params]
env = 'production'
defaultTheme = 'auto'
ShowToc = true
ShowReadingTime = true
ShowCodeCopyButtons = true
homePostCount = 8
```

完整参数说明见 [PaperUI 配置指南](/posts/paperui-config-guide/) 和 [Hugo 配置文件详解](/posts/hugo-toml-config-guide/)。

### 首页轮播配置

```toml
[params.homeCarousel]
slides = [
  { image = '/images/hero-1.jpg', url = '/posts/post-1/', alt = '描述' },
]
middle = [
  { image = '/images/square-1.jpg', url = '/posts/post-2/', alt = '描述' },
]
right = { image = '/images/portrait-1.jpg', url = '/about/', alt = '关于' }
```

---

## 项目结构 · Project Structure

```
NewMT-hugo/
├── assets/               # Hugo 资源管道处理的文件（CSS/JS/图片）
│   └── images/
├── content/              # Markdown 文章
│   ├── about/
│   ├── archives/
│   ├── categories/
│   ├── posts/            # 所有博客文章
│   ├── search/
│   └── tags/
├── layouts/              # 根级模板覆盖
├── static/               # 静态资源（直接复制到输出）
│   └── images/
├── themes/PaperUI/       # PaperUI 主题
├── hugo.toml             # 站点配置
└── README.md
```

### 文章目录

| 分类 | 文章 |
|------|------|
| **PaperUI 主题系列** | paperui-introduction, why-paperui, papermod-advantages, paperui-features, paperui-quickstart, paperui-config-guide, paperui-customization, paperui-deployment, paperui-seo, paperui-faq-best-practices, hugo-toml-config-guide |
| **技术文章** | git-guide, python-tips, linux-commands, modern-development-workflow |

---

## 部署 · Deployment

本站支持以下部署方式，配置见 `.github/workflows/deploy.yml`：

- **Cloudflare Pages** — 自动部署，全球 CDN
- **GitHub Pages** — 免费静态托管

部署步骤：

1. Fork 或克隆本仓库
2. 在 Cloudflare Pages / GitHub Pages 中连接仓库
3. 构建命令：`hugo`
4. 输出目录：`public`

详细部署指南见 [PaperUI 部署方案](/posts/paperui-deployment/)。

---

## SEO 优化 · SEO

本站内置完整的 SEO 支持：

- ✅ **Open Graph 标签** — 社交媒体分享卡片
- ✅ **Twitter Cards** — Twitter 分享预览
- ✅ **JSON-LD 结构化数据** — Schema.org 标记，提升搜索结果展示
- ✅ **XML Sitemap** — 搜索引擎自动发现
- ✅ **robots.txt** — 区分开发/生产环境
- ✅ **RSS 订阅** — 完整 RSS 2.0
- ✅ **llms.txt** — AI 搜索引擎友好
- ✅ **响应式设计** — 移动端优先，Core Web Vitals 优化
- ✅ **快速加载** — 零外部依赖，CSS/JS 最小化与指纹化

更多 SEO 优化技巧见 [PaperUI SEO 指南](/posts/paperui-seo/)。

---

## PaperUI 主题 · Theme

PaperUI 是本博客自研的 Hugo 主题，基于 PaperMod 深度定制。

- **GitHub 仓库：** [github.com/scenlinx/PaperUI](https://github.com/scenlinx/PaperUI)
- **开源协议：** MIT
- **安装方式：** Git Submodule 或 Hugo Modules

---

## 许可 · License

本站内容采用 [MIT License](LICENSE) 开源。

- **代码：** MIT License © 2026 新墨韬
- **文章：** 署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)

---

## 联系 · Contact

- **GitHub：** [@scenlinx](https://github.com/scenlinx)
- **邮箱：** scenlinx@163.com

---

*用文字记录思考，用代码实践技术。*
