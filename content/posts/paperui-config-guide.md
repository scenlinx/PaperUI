---
date: '2026-05-25'
title: 'PaperUI 完整配置指南与参数说明'
categories: ["PaperUI"]
tags: ["Hugo", "PaperUI", "配置"]
description: 'PaperUI 主题的完整配置参数参考手册，包含基础参数、轮播配置、侧边栏小部件、SEO 相关等所有可配置项'
---

这篇文章是 PaperUI 主题的完整配置参考手册。你可以把它当作速查表来查阅。

> 如果你想知道**每个参数在模板层面的具体作用逻辑**，推荐阅读 [Hugo + PaperUI 配置文件逐行详解](/posts/hugo-toml-config-guide/)，它以本博客真实配置为例，结合模板源码进行拆解。

## 基础站点配置

```toml
baseURL = 'https://你的域名.com/'     # 站点 URL，上线前务必修改
title = '站点标题'                      # 显示在浏览器标签页和 header 中
theme = 'PaperUI'                      # 主题名称
defaultContentLanguage = 'zh-cn'       # 默认语言
enableRobotsTXT = true                 # 自动生成 robots.txt
enableEmoji = true                     # 支持 Emoji
```

## 输出格式

```toml
[outputs]
home = ['HTML', 'RSS', 'JSON']         # 首页输出 HTML、RSS 和搜索索引 JSON
```

## 全局参数

```toml
[params]
env = 'production'                     # 环境：development 或 production
description = '站点描述'               # SEO 描述，显示在搜索引擎结果中
keywords = ['博客', 'Hugo']            # SEO 关键词
defaultTheme = 'auto'                  # 默认主题：auto / dark / light
disableThemeToggle = false             # 禁用主题切换按钮
disableScrollToTop = false             # 禁用回到顶部按钮

# 文章展示相关
ShowReadingTime = true                 # 显示阅读时间估算
ShowWordCount = true                   # 显示字数统计
ShowShareButtons = false               # 显示分享按钮
ShowPostNavLinks = true                # 显示上一篇/下一篇文章链接
ShowBreadCrumbs = false                # 显示面包屑导航
ShowCodeCopyButtons = true             # 显示代码块复制按钮
ShowToc = true                         # 显示文章目录（侧边栏）
ShowPageNums = true                    # 分页显示页码
ShowRssButtonInSectionTermList = true  # 分类/标签页显示 RSS 按钮
ShowAllPagesInArchive = false          # 归档页显示所有文章（不推荐大量文章时开启）
ShowFullTextinRSS = false              # RSS 中显示全文
homePostCount = 8                      # 首页显示文章数量
```

## 首页信息

```toml
[params.homeInfoParams]
Title = '欢迎来到我的博客'             # 首页标题
Content = '分享技术和思考'             # 首页简介
```

## 首页轮播配置

```toml
[params.homeCarousel]
# 左侧主轮播（16:9 比例）
slides = [
  { image = '/images/hero-1.webp', url = '/posts/post-1/' },
  { image = '/images/hero-2.webp', url = '/posts/post-2/' },
  { image = '/images/hero-3.webp', url = '/posts/post-3/' },
]
# 中部正方形卡片（1:1 比例）
middle = [
  { image = '/images/square-1.webp', url = '/posts/post-4/' },
  { image = '/images/square-2.webp', url = '/posts/post-5/' },
]
# 右侧竖版图片（3:4 比例）
right = { image = '/images/portrait-1.webp', url = '/about/' }
```

> 不配置 `homeCarousel` 时，首页使用标准的 `homeInfoParams` 模式。

## Favicon 配置

```toml
[params.assets]
favicon = '/favicon.svg'
favicon16x16 = '/favicon.svg'
favicon32x32 = '/favicon.svg'
```

## 页脚配置

```toml
[params.footer]
hideCopyright = false                  # 隐藏版权信息
```

## 语言配置

```toml
[languages.zh-cn]
locale = 'zh-CN'
label = '中文'
title = '站点中文标题'
weight = 1
```

## 导航菜单

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
name = '标签'
url = '/tags/'
weight = 4

[[languages.zh-cn.menu.main]]
name = '归档'
url = '/archives/'
weight = 5

[[languages.zh-cn.menu.main]]
name = '搜索'
url = '/search/'
weight = 6

[[languages.zh-cn.menu.main]]
name = '关于'
url = '/about/'
weight = 7
```

`weight` 值越小越靠前，建议用 10 的倍数方便以后插入新项。

## 文章 Front Matter 配置

每篇文章的 Markdown 文件头部（YAML 格式）：

```yaml
---
date: '2026-05-25'
title: '文章标题'
categories: ["分类名"]
tags: ["标签1", "标签2", "标签3"]
description: '文章摘要，用于 SEO 和列表展示'
---
```

### 单篇文章的特殊参数

```yaml
---
ShowToc: false          # 禁用当前文章的目录
wideLayout: true        # 使用宽版布局（隐藏侧边栏）
searchHidden: true      # 从搜索结果中隐藏
hiddenInRss: true       # 从 RSS 中隐藏
---
```

## 图片资源建议

### 轮播图尺寸

| 位置 | 比例 | 推荐尺寸 |
|------|------|----------|
| slides（主轮播） | 16:9 | 1200×675 |
| middle（正方形） | 1:1 | 600×600 |
| right（竖版） | 3:4 | 600×800 |

### 图片格式

- 推荐同时提供 `.jpg` 和 `.webp` 两种格式
- `.webp` 格式体积更小，加载更快
- Hugo 可以在构建时自动转换格式（需配置 image processing）

## 完整配置示例

这个博客站点（新墨韬）使用的就是 PaperUI，你可以参考它的完整配置文件。下一篇我们将讨论 PaperUI 的 SEO 优化实践，让你的博客在搜索引擎中获得更好的排名。
