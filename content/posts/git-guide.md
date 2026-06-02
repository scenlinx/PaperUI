---
date: '2026-05-28'
title: 'Git 实用指南：从日常操作到团队协作'
categories: ["技术"]
tags: ["Git", "版本控制", "团队协作"]
description: '一份面向日常开发的 Git 实用指南，涵盖分支管理、合并冲突解决、提交规范与团队协作流程。'
cover:
  image: '/images/hero-3.jpg'
---

Git 是目前最主流的分布式版本控制系统。但学会 Git 不只是记住命令——理解背后的工作流才能真正高效协作。

## 三个关键区域

每次操作 Git，数据在四个区域流转：

```
工作目录 → 暂存区 → 本地仓库 → 远程仓库
```

理解这个模型后，`add`、`commit`、`push` 的关系就很清晰了：

```bash
git add .              # 工作目录 → 暂存区
git commit -m "..."    # 暂存区 → 本地仓库
git push origin main   # 本地仓库 → 远程仓库
```

## 分支策略

日常开发中最常用的分支模型是 **GitHub Flow**：

- `main` — 始终可部署
- `feature/*` — 每个功能独立分支
- `hotfix/*` — 紧急修复

```bash
# 从 main 切出功能分支
git checkout -b feature/add-login

# 开发过程中频繁小提交
git commit -m "feat: add login form"
git commit -m "feat: add form validation"

# 完成后推送到远程
git push origin feature/add-login
```

## 合并 vs 变基

这是 Git 中最容易困惑的地方。简单原则：

| 场景 | 推荐方式 | 原因 |
|------|---------|------|
| 将 main 更新合入 feature 分支 | `git rebase main` | 保持提交历史线性整洁 |
| 将 feature 合并回 main | `git merge --no-ff feature` | 保留功能分支的完整记录 |

**实际工作流示例：**

```bash
# 在 feature 分支上，先把 main 的最新代码变基过来
git checkout feature/add-login
git fetch origin
git rebase origin/main

# 解决冲突后继续
git rebase --continue

# 推到远程（注意需要 force，因为历史被改写了）
git push --force-with-lease origin feature/add-login

# 然后发 Pull Request 合并到 main
```

## 解决合并冲突

冲突不可怕，可怕的是不知道怎么处理：

```bash
# 发生冲突时
git status                    # 查看哪些文件冲突

# 冲突文件内标记：
# <<<<<<< HEAD         (当前分支的内容)
# =======
# >>>>>>> feature-xxx  (要合并进来的内容)

# 手动编辑解决后
git add conflicted_file.txt
git commit                 # 不需要 -m，Git 会生成 merge commit
```

## 提交信息规范

推荐使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```bash
<type>(<scope>): <subject>

# 常用 type：
feat:     新功能
fix:      修复 bug
docs:     文档变更
refactor: 重构（不改变功能）
chore:    构建/工具变更
style:    格式调整
```

好的提交信息让 `git log` 一目了然：

```bash
feat(auth): add JWT token refresh
fix(upload): handle file size exceed error
docs(readme): update deployment guide
```

## 常见场景速查

```bash
# 撤销工作区修改
git checkout -- filename

# 撤销暂存区
git reset HEAD filename

# 修改最近一次提交信息
git commit --amend -m "new message"

# 暂存当前工作（临时切换分支）
git stash
git stash pop

# 查看某次提交的详情
git show <commit-hash>

# 查看谁改过某行代码
git blame filename
```

Git 的关键不在于记住所有命令，而在于理解数据流向和形成一套稳定的协作流程。从 `add → commit → push` 的基础操作，到 `rebase → merge` 的分支管理，一步一个脚印就好。
