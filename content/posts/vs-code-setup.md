---
date: '2026-05-22'
title: 'VS Code 高效配置指南'
categories: ["教程"]
tags: ["VS Code", "编辑器"]
---

Visual Studio Code 是目前最受欢迎的代码编辑器之一，通过合理配置可以极大提升开发效率。

## 必备扩展

1. **Prettier** - 代码格式化
2. **ESLint** - JavaScript 代码检查
3. **GitLens** - Git 增强功能
4. **Live Server** - 本地开发服务器
5. **Material Icon Theme** - 文件图标主题

## 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+P` | 快速打开文件 |
| `Ctrl+Shift+P` | 打开命令面板 |
| `Ctrl+\`` | 打开终端 |
| `Ctrl+D` | 选中下一个相同词 |
| `Alt+↑/↓` | 移动行 |

## 用户设置

```json
{
  "editor.fontSize": 14,
  "editor.fontFamily": "JetBrains Mono, Consolas",
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "workbench.colorTheme": "One Dark Pro"
}
```
