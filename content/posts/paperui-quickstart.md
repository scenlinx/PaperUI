---
date: '2026-05-26'
title: 'PaperUI 安装与快速上手指南'
categories: ["PaperUI"]
tags: ["Hugo", "PaperUI", "教程"]
description: '从零开始，5 分钟完成 PaperUI 主题的安装和基础配置，包含 Git Submodule 和 Hugo Modules 两种安装方式'
---

这篇文章将带你从零开始，在 5 分钟内完成 PaperUI 的安装和基础配置。

## 前置要求

- **Hugo** v0.146.0 或更高版本（推荐使用最新版）
- **Git**（用于主题安装）
- 基础的命令行操作能力

检查 Hugo 版本：

```bash
hugo version
# 应显示: hugo v0.146.0 或更高版本
```

## 方式一：Git Submodule 安装（推荐）

这是最传统的安装方式，适合大多数用户：

```bash
# 1. 创建新站点
hugo new site my-blog
cd my-blog

# 2. 初始化 Git 仓库
git init

# 3. 添加 PaperUI 主题作为子模块
git submodule add https://github.com/scenlinx/PaperUI.git themes/PaperUI

# 4. 在配置文件中启用主题
echo "theme = 'PaperUI'" >> hugo.toml
```

## 方式二：Hugo Modules 安装

如果你使用 Hugo Modules 管理依赖：

```bash
# 1. 初始化 Hugo Modules
hugo mod init my-blog

# 2. 在 hugo.toml 中配置
# theme = 'PaperUI'   # 删除或注释掉这行

# 3. 编辑 go.mod 或使用 hugo mod get
# 具体配置参见 Hugo Modules 文档
```

> 目前推荐使用 Git Submodule 方式，更简单直观。

## 基础配置

创建或编辑 `hugo.toml`，填入以下最小配置：

```toml
baseURL = 'https://你的域名.com/'
title = '我的博客'
theme = 'PaperUI'
defaultContentLanguage = 'zh-cn'

[params]
env = 'production'
description = '个人技术博客'
defaultTheme = 'auto'
ShowReadingTime = true
ShowWordCount = true
ShowCodeCopyButtons = true
ShowToc = true
homePostCount = 8

[params.homeInfoParams]
Title = '欢迎来到我的博客'
Content = '分享技术和思考'

# 导航菜单
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

## 创建内容页面

创建必要的内容目录和文件：

```bash
# 创建关于页面
hugo new about/index.md

# 创建文章
hugo new posts/hello-world.md

# 创建分类页面
mkdir -p content/categories
echo '---\ntitle: "分类"\n---' > content/categories/_index.md

# 创建归档页面
mkdir -p content/archives
echo '---\ntitle: "归档"\nlayout: "archives"\n---' > content/archives/index.md

# 创建搜索页面
mkdir -p content/search
echo '---\ntitle: "搜索"\nlayout: "search"\n---' > content/search/index.md

# 创建标签页面
mkdir -p content/tags
echo '---\ntitle: "标签"\n---' > content/tags/_index.md
```

## 添加图片资源

将轮播图和 favicon 放入 `static/` 目录：

```
static/
├── favicon.svg
└── images/
    ├── hero-1.jpg
    ├── hero-2.jpg
    ├── hero-3.jpg
    ├── square-1.jpg
    ├── square-2.jpg
    └── portrait-1.jpg
```

## 启动开发服务器

```bash
hugo server -D
```

打开浏览器访问 `http://localhost:1313`，你应该能看到完整的博客页面了。

## 配置首页轮播（可选）

在 `hugo.toml` 中添加轮播配置：

```toml
[params.homeCarousel]
slides = [
  { image = '/images/hero-1.jpg', url = '/posts/your-post-1/' },
  { image = '/images/hero-2.jpg', url = '/posts/your-post-2/' },
  { image = '/images/hero-3.jpg', url = '/posts/your-post-3/' },
]
middle = [
  { image = '/images/square-1.jpg', url = '/posts/your-post-4/' },
  { image = '/images/square-2.jpg', url = '/posts/your-post-5/' },
]
right = { image = '/images/portrait-1.jpg', url = '/about/' }
```

不配置轮播也不会报错，首页会回退到标准的 `homeInfoParams` 模式。

## 下一步

- 阅读下一篇《PaperUI 配置指南》，了解所有可配置参数
- 学习如何自定义主题颜色和样式
- 了解如何部署到生产环境

如果你在安装过程中遇到问题，欢迎在 [GitHub Issues](https://github.com/scenlinx/PaperUI/issues) 提交反馈。
