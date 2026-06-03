---
date: '2026-05-20'
title: 'Linux 命令行：从开发到运维的常用技巧'
categories: ["技术"]
tags: ["Linux", "命令行", "运维"]
description: '整理 Linux 命令行中日常开发和服务器运维的常用操作，包括文件处理、权限管理、进程监控和管道组合。'
cover:
  image: '/images/square-2.webp'
---

不管做开发还是运维，熟练使用 Linux 命令行都能让工作效率提升数倍。以下是我在开发、部署和排错中最常用的操作。

## 文件与目录操作

```bash
# 递归查找所有 .log 文件
find /var/log -name "*.log" -type f

# 查找大于 100MB 的文件
find . -type f -size +100M

# 在指定目录搜索包含关键词的文件
grep -r "ERROR" /var/log/nginx/ --include="*.log"

# 统计代码行数
find src/ -name "*.py" | xargs wc -l
```

## 权限管理

```bash
# 给脚本添加执行权限
chmod +x deploy.sh

# 递归修改目录权限
chmod -R 755 public/
chmod -R 644 public/*.html

# 修改所有者（常用于 Web 目录）
sudo chown -R www-data:www-data /var/www/site/
```

一个常见的坑：文件能否执行看权限位，能否被读取看父目录的 `x` 权限——目录没有执行权限时，即使文件权限正确也无法访问。

## 系统监控与排错

```bash
# 查看磁盘使用情况
df -h

# 查看某个目录占用
du -sh /var/log/* | sort -hr | head -10

# 内存使用
free -h

# 实时进程信息
top
htop    # 如果安装了的话，更友好

# 查看特定进程
ps aux | grep nginx

# 查看端口占用
ss -tlnp | grep :80
```

## 管道与文本处理

管道的核心思想是小工具组合：

```bash
# 分析 Nginx 访问日志中访问最多的 10 个 IP
cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -10

# 统计 API 接口调用次数
grep "POST /api/" access.log | awk '{print $7}' | sort | uniq -c | sort -rn

# 实时监控日志中的错误
tail -f app.log | grep --color "ERROR"
```

几个常用文本工具：

| 工具 | 用途 | 示例 |
|------|------|------|
| `awk` | 按列提取 | `awk '{print $1, $3}'` |
| `sed` | 文本替换 | `sed 's/foo/bar/g'` |
| `sort` | 排序 | `sort -nr`（按数字降序） |
| `uniq -c` | 去重计数 | 需先 sort |
| `xargs` | 参数转发 | `find ... \| xargs rm` |

## 实用快捷键

```bash
Ctrl + R    # 搜索命令历史（最有用的快捷键之一）
Ctrl + A    # 跳到行首
Ctrl + E    # 跳到行尾
Ctrl + U    # 删除光标前的内容
Ctrl + K    # 删除光标后的内容
!!          # 重复上一条命令
!$          # 上一条命令的最后一个参数
```

## 服务器部署常用

```bash
# 后台运行服务
nohup ./app > output.log 2>&1 &

# 查看后台任务
jobs

# systemd 服务管理
sudo systemctl status nginx
sudo systemctl restart nginx
sudo journalctl -u nginx -f    # 查看服务日志

# 快速备份
tar -czf backup-$(date +%Y%m%d).tar.gz /data/
```

---

Linux 命令行的精髓在于组合——每个工具只做一件事并把它做好，通过管道将它们串联起来就能解决复杂问题。不需要记住所有参数，知道有什么工具、能查到文档，就足够了。
