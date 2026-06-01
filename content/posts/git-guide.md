---
date: '2026-05-28'
title: 'Git 常用命令速查手册'
categories: ["技术"]
tags: ["Git", "版本控制"]
---

Git 是目前最流行的分布式版本控制系统，掌握常用命令是每个开发者的必备技能。

## 基础操作

```bash
# 初始化仓库
git init

# 克隆仓库
git clone https://github.com/user/repo.git

# 添加文件到暂存区
git add .
git add filename.txt

# 提交更改
git commit -m "提交信息"
```

## 分支管理

```bash
# 查看分支
git branch

# 创建新分支
git branch feature-a

# 切换分支
git checkout feature-a
# 或
git switch feature-a

# 创建并切换
git checkout -b feature-b
```

## 远程操作

```bash
# 查看远程仓库
git remote -v

# 推送代码
git push origin main

# 拉取更新
git pull origin main

# 合并分支
git merge feature-a
```
