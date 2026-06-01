---
date: '2026-05-20'
title: 'Linux 命令行实用技巧'
categories: ["技术"]
tags: ["Linux", "命令行"]
---

Linux 命令行是程序员的重要工具，掌握这些技巧能让你事半功倍。

## 文件操作

```bash
# 查找文件
find . -name "*.py"

# 查找文件内容
grep -r "keyword" .

# 查看文件前10行
head filename

# 查看文件后10行
tail -f filename
```

## 权限管理

```bash
# 修改文件权限
chmod 755 script.sh

# 修改文件所有者
chown user:group filename

# 查看权限
ls -la
```

## 系统信息

```bash
# 查看磁盘使用
df -h

# 查看内存使用
free -h

# 查看进程
ps aux | grep nginx

# 查看端口占用
netstat -tlnp
# 或
ss -tlnp
```

## 小技巧

```bash
# 历史命令搜索（Ctrl+R）

# 上次使用的参数
mkdir newdir
cd !$

# 管道组合
cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr
```
