---
date: '2026-05-31'
title: 'Hugo + PaperUI 配置文件逐行详解'
categories: ["PaperUI"]
tags: ["Hugo", "PaperUI", "配置", "教程"]
description: '基于本博客真实 hugo.toml 配置，逐段拆解每个参数的作用、生效逻辑和调整建议，附带模板渲染源码分析。'
---

`hugo.toml` 是 Hugo 站点的核心配置文件。本文以本博客当前使用的配置为基础，结合 PaperUI 主题的模板源码，逐段说明每个配置项的实际作用。

> 如果你只需要**快速查阅所有配置参数**，推荐先看 [PaperUI 完整配置指南与参数说明](/posts/paperui-config-guide/)，那是更紧凑的参考手册。

## 站点基础

```toml
baseURL = 'https://paperui.newmt.fun/'
title = '新墨韬'
theme = 'PaperUI'
defaultContentLanguage = 'zh-cn'
enableRobotsTXT = true
enableEmoji = true
```

| 参数 | 说明 |
|------|------|
| `baseURL` | 站点域名，**上线前必须改成真实域名**。末尾 `/` 不要漏。影响所有链接、RSS、sitemap |
| `title` | 站点标题，出现在浏览器标签页、RSS 标题、OG 标签中 |
| `theme` | 主题文件夹名，对应 `themes/PaperUI/` |
| `defaultContentLanguage` | 默认语言代码，需与下方 `[languages.zh-cn]` 的 key 一致 |
| `enableRobotsTXT` | `true` 自动生成 `/robots.txt` |
| `enableEmoji` | `true` 允许 Markdown 中使用 `:smile:` 等 Emoji 短码 |

---

## 输出格式

```toml
[outputs]
home = ['HTML', 'RSS', 'JSON']
```

- `HTML`：网页
- `RSS`：订阅源（`/index.xml`）
- `JSON`：**搜索索引，PaperUI 的搜索功能依赖此项**，不要删

---

## [params] 主题参数

### 环境与 SEO

```toml
[params]
env = 'production'
description = '新墨韬 - 个人技术博客'
keywords = ['博客', 'Hugo', 'PaperMod', '技术']
```

| 参数 | 说明 |
|------|------|
| `env` | `production` 启用 CSS/JS 压缩；本地开发临时改 `development` |
| `description` | 站点描述，出现在 `<meta name="description">` 和搜索结果摘要中 |
| `keywords` | 全局关键词，对现代搜索引擎权重不高但仍有参考意义 |

### 外观控制

```toml
defaultTheme = 'auto'
disableThemeToggle = false
disableScrollToTop = false
```

| 参数 | 值 | 说明 |
|------|-----|------|
| `defaultTheme` | `auto` | 跟随系统偏好，也可设为 `light` 或 `dark` |
| `disableThemeToggle` | `false` | 保留深色/浅色切换按钮 |
| `disableScrollToTop` | `false` | 保留"回到顶部"按钮 |

### 文章显示开关

```toml
ShowReadingTime = true
ShowWordCount = true
ShowShareButtons = false
ShowPostNavLinks = true
ShowBreadCrumbs = false
ShowCodeCopyButtons = true
ShowToc = true
```

| 参数 | 推荐 | 说明 |
|------|------|------|
| `ShowReadingTime` | `true` | 估算阅读时间 |
| `ShowWordCount` | `true` | 显示字数统计 |
| `ShowCodeCopyButtons` | `true` | **技术博客强烈推荐**，代码块右上角复制按钮 |
| `ShowToc` | `true` | 文章右侧目录，长文章导航 |
| `ShowPostNavLinks` | `true` | 文章底部"上一篇/下一篇" |
| `ShowShareButtons` | `false` | 社交分享按钮，不需要就关 |
| `ShowBreadCrumbs` | `false` | 面包屑导航，扁平博客结构意义不大 |

### 列表与分页

```toml
ShowPageNums = true
ShowRssButtonInSectionTermList = true
ShowAllPagesInArchive = false
ShowFullTextinRSS = false
homePostCount = 8
```

| 参数 | 说明 |
|------|------|
| `ShowPageNums` | 分页显示页码 |
| `ShowRssButtonInSectionTermList` | 分类/标签页显示 RSS 订阅按钮 |
| `ShowAllPagesInArchive` | `false` 归档页只显示文章；`true` 会包含所有页面 |
| `ShowFullTextinRSS` | `false` RSS 只输出摘要；`true` 输出全文 |
| `homePostCount` | 首页显示的文章数量，建议 8~10 |

---

## 首页展示：homeInfoParams + homeCarousel

这是 PaperUI 首页最核心的配置，也是最容易理解错的地方。先看模板源码：

**`list.html` 第 7 行：**

```go
{{- if and .IsHome site.Params.homeInfoParams }}
{{- partial "home_info.html" . }}
{{- end }}
```

**入口条件是 `homeInfoParams` 存在**。只有它存在，`home_info.html` 才会被调用。

**`home_info.html` 内部逻辑：**

```go
{{- with site.Params.homeCarousel }}
  ...渲染轮播图...
{{- else }}
  {{- with site.Params.homeInfoParams }}
    ...渲染欢迎文字...
  {{- end }}
{{- end }}
```

进入后先检查 `homeCarousel`：有就渲染轮播图，没有就用 `homeInfoParams` 渲染欢迎文字。

**结论：**
- `homeInfoParams` 是**入口开关**，不能删
- `homeCarousel` 是**模式选择器**，有它就走轮播图
- 两者都配置 → 轮播图生效，欢迎文字不显示
- 只有 `homeInfoParams` → 显示欢迎文字

### 当前配置

```toml
[params.homeInfoParams]
Title = '新墨韬'
Content = '分享编程、开源与技术的个人博客'

[params.homeCarousel]
slides = [
  { image = '/images/hero-1.webp', url = '/posts/paperui-introduction/' },
  { image = '/images/hero-2.webp', url = '/posts/papermod-advantages/' },
  { image = '/images/hero-3.webp', url = '/posts/git-guide/' },
]
middle = [
  { image = '/images/square-1.webp', url = '/posts/python-tips/' },
  { image = '/images/square-2.webp', url = '/posts/linux-commands/' },
]
right = { image = '/images/portrait-1.webp', url = '/about/' }
```

轮播图布局分三个区域：

- **slides**：顶部 16:9 轮播大图，3 张自动切换，点击跳转文章
- **middle**：中间两个方形卡片
- **right**：右侧竖图

图片放在 `static/images/` 下，路径以 `/images/` 开头。`url` 指向的文章必须存在。

**最佳实践：**
- 轮播图建议 1200×675，体积 < 200KB
- 同时准备 `.webp` 版本，浏览器自动选用
- `url` 尾部带 `/`，指向文章 slug

### 如果只用欢迎信息

删掉 `[params.homeCarousel]` 整个段，首页顶部会显示 `homeInfoParams` 中的文字：

```toml
[params.homeInfoParams]
Title = '欢迎来到我的博客'
Content = '这里分享编程、开源和生活中的思考。'
```

---

## 站点图标

```toml
[params.assets]
favicon = '/favicon.svg'
favicon16x16 = '/favicon.svg'
favicon32x32 = '/favicon.svg'
```

PaperUI 支持 SVG favicon，放在 `static/` 目录即可。SVG 在所有分辨率下都清晰。

---

## Giscus 评论系统

```toml
[params.giscus]
repo = ''
repoId = ''
category = 'Announcements'
categoryId = ''
mapping = 'pathname'
lang = 'zh-CN'
```

PaperUI 在 `comments.html` 中集成了 Giscus。配置留空时评论功能不激活，填入信息后自动在每篇文章底部显示评论区。

**启用步骤：**

1. 确保 GitHub 仓库公开且开启了 Discussions
2. 安装 [Giscus App](https://github.com/apps/giscus)
3. 访问 [giscus.app](https://giscus.app) 获取配置参数
4. 填入 `repo`、`repoId`、`categoryId`

| 参数 | 说明 |
|------|------|
| `repo` | `用户名/仓库名` |
| `repoId` | giscus.app 生成的仓库 ID |
| `category` | Discussions 分类，建议 `Announcements` |
| `categoryId` | 分类 ID |
| `mapping` | `pathname` 按页面路径关联评论 |
| `lang` | 界面语言，`zh-CN` |

---

## 页脚

```toml
[params.footer]
hideCopyright = false
```

设为 `true` 隐藏页脚版权信息。

---

## 语言与导航菜单

```toml
[languages.zh-cn]
locale = 'zh-CN'
label = '中文'
title = '新墨韬'
weight = 1
```

`locale` 影响日期格式和界面翻译。中文站用 `zh-CN`。

### 导航菜单

```toml
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

每个菜单项用独立的 `[[...]]` 块：

| 字段 | 说明 |
|------|------|
| `name` | 导航栏显示的文字 |
| `url` | 跳转地址，`/` 开头为站内路径 |
| `weight` | 排序权重，数字越小越靠左 |

添加新菜单项只需追加一个块，比如搜索页：

```toml
[[languages.zh-cn.menu.main]]
name = '搜索'
url = '/search/'
weight = 6
```

外部链接同样支持：

```toml
[[languages.zh-cn.menu.main]]
name = 'GitHub'
url = 'https://github.com/scenlinx'
weight = 10
```

---

## 常见配置问题

| 现象 | 原因 | 解决 |
|------|------|------|
| 首页轮播图不显示 | 删了 `homeInfoParams` | 保留 `[params.homeInfoParams]`，它是入口开关 |
| 搜索不可用 | 缺少 JSON 输出 | `[outputs]` 中加 `'JSON'` |
| 文章不出现 | `date` 是未来日期 | 改过去，或 `hugo server -F` |
| 修改配置不生效 | 缓存 | 重启 `hugo server` |
| 评论不显示 | giscus 配置为空 | 填入完整 repo/repoId/categoryId |
| 分类页为空 | 文章没写 categories | Front Matter 加分类 |
| 轮播图链接 404 | 文章被删除 | 确保 `url` 指向存在的文章 |

---

## 快速上手模板

复制以下骨架，改三项即可拥有自己的博客：

```toml
baseURL = 'https://你的域名.com/'       # ← 改这里
title = '你的博客名'                      # ← 改这里
theme = 'PaperUI'
defaultContentLanguage = 'zh-cn'
enableRobotsTXT = true

[outputs]
home = ['HTML', 'RSS', 'JSON']

[params]
env = 'production'
description = '你的站点描述'
homePostCount = 8
defaultTheme = 'auto'
ShowReadingTime = true
ShowCodeCopyButtons = true
ShowToc = true
ShowPostNavLinks = true

[params.homeInfoParams]
Title = '你的博客名'
Content = '一句话介绍你的博客'

[params.giscus]
repo = ''                              # ← 改这里（或用 Giscus 后填入）
repoId = ''
category = 'Announcements'
categoryId = ''
mapping = 'pathname'
lang = 'zh-CN'

[languages.zh-cn]
locale = 'zh-CN'
title = '你的博客名'
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
name = '归档'
url = '/archives/'
weight = 3

[[languages.zh-cn.menu.main]]
name = '关于'
url = '/about/'
weight = 4
```
