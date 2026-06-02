---
date: '2026-05-23'
title: 'PaperUI 博客部署到生产环境的完整方案'
categories: ["PaperUI"]
tags: ["Hugo", "PaperUI", "部署", "GitHub Pages", "Cloudflare"]
description: '从本地开发到线上部署的完整流程，涵盖 GitHub Pages、Cloudflare Pages、Netlify 等主流部署平台的操作步骤'
cover:
  image: '/images/hero-2.jpg'
---

上一篇聊了 SEO 优化，这篇我们讲部署 —— 把本地写好的 PaperUI 博客发布到互联网上。

## 构建静态文件

在部署之前，先生成静态文件：

```bash
# 清理旧文件并重新构建（--cleanDestinationDir 自动清理废弃文件）
hugo --minify --cleanDestinationDir
```

`--minify` 参数会压缩 HTML、CSS、JS，减小文件体积。构建后的文件在 `public/` 目录中。

## 方案一：GitHub Pages（免费）

### 适用场景

- 使用 GitHub 管理博客源代码
- 免费托管
- 自定义域名支持

### 步骤

**1. 创建部署仓库**

在 GitHub 上创建 `用户名.github.io` 仓库（用于用户/组织站点）。

**2. 推送代码**

```bash
cd my-blog
git init
git remote add origin https://github.com/用户名/用户名.github.io.git
git add .
git commit -m "初始化博客"
git push -u origin main
```

**3. 配置 GitHub Actions**

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Hugo site

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: '0.146.0'
          extended: true

      - name: Build
        run: hugo --minify --cleanDestinationDir

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

**4. 设置 GitHub Pages**

在仓库 Settings → Pages 中，将 Source 设为 `GitHub Actions`。

**5. 配置自定义域名（可选）**

在仓库 Settings → Pages 中填写你的域名，并在 DNS 中添加 CNAME 记录指向 `用户名.github.io`。

## 方案二：Cloudflare Pages（推荐）

### 适用场景

- 需要全球 CDN 加速
- 免费 SSL 证书
- 构建速度快

### 步骤

**1. 将代码推送到 GitHub**

确保你的博客代码在 GitHub 仓库中。

**2. 登录 Cloudflare Dashboard**

进入 Workers & Pages → Pages → Create a project → Connect to Git。

**3. 配置构建设置**

| 配置项 | 值 |
|--------|-----|
| 框架预设 | Hugo |
| 构建命令 | `hugo --minify --cleanDestinationDir` |
| 构建输出目录 | `public` |
| Hugo 版本 | `0.146.0`（或最新版） |

**4. 添加环境变量**

```
HUGO_VERSION = 0.146.0
```

**5. 部署**

点击"Save and Deploy"，Cloudflare 会自动构建并部署。

**6. 配置自定义域名**

在 Cloudflare Pages 项目的 Custom domains 中添加你的域名。

## 方案三：Netlify

### 步骤

**1. 推送代码到 Git 仓库**

**2. 登录 Netlify，选择 "Import from Git"**

**3. 配置构建设置**

| 配置项 | 值 |
|--------|-----|
| Build command | `hugo --minify --cleanDestinationDir` |
| Publish directory | `public` |

**4. 设置 Hugo 版本**

在 Site Settings → Environment 中添加：

```
HUGO_VERSION = 0.146.0
```

**5. 部署并配置域名**

## 部署前检查清单

在推送到生产环境之前，确认以下事项：

- [ ] `baseURL` 已改为实际域名（不是 `example.org`）
- [ ] `env` 设为 `production`
- [ ] 图片资源已上传到 `static/` 目录
- [ ] `robots.txt` 允许搜索引擎爬取（生产环境自动处理）
- [ ] 所有内部链接使用相对路径或完整 URL
- [ ] 在浏览器中预览过 `public/` 目录的内容
- [ ] 页面在移动端显示正常

## 部署后检查

- [ ] 访问 `https://你的域名/` 确认首页正常显示
- [ ] 检查 `https://你的域名/sitemap.xml` 是否生成
- [ ] 检查 `https://你的域名/robots.txt` 是否允许爬取
- [ ] 用 [Google Search Console](https://search.google.com/search-console) 提交 Sitemap
- [ ] 用社交媒体调试工具检查分享卡片效果
- [ ] 用 [PageSpeed Insights](https://pagespeed.web.dev/) 测试性能

## 更新内容

PaperUI 博客的内容更新流程非常简单：

```bash
# 1. 创建新文章
hugo new posts/新文章.md

# 2. 编辑文章内容

# 3. 本地预览
hugo server -D

# 4. 满意后提交推送
git add .
git commit -m "新增文章: 标题"
git push
```

GitHub Actions 或 Cloudflare Pages 会自动检测到推送并重新构建部署。

## 性能基准

一个典型的 PaperUI 博客站点（约 10 篇文章，含轮播图），部署后的性能表现：

| 指标 | 典型值 |
|------|--------|
| Lighthouse Performance | 95-100 |
| 首屏加载时间 | < 1s |
| 页面总大小 | 50-200 KB |
| TTFB | < 100ms（CDN 加速后） |

## 小结

PaperUI 博客的部署流程与任何 Hugo 站点一样简单。推荐使用 Cloudflare Pages 获得最佳的全球访问速度和免费 SSL，或者使用 GitHub Pages 获得最简化的部署体验。

下一篇我们来聊聊 PaperUI 的自定义和二次开发。
