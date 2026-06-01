---
date: '2026-05-18'
title: 'Docker 容器化入门'
categories: ["技术"]
tags: ["Docker", "容器"]
---

Docker 改变了应用的部署方式，让"在我机器上能运行"成为过去。

## 什么是 Docker？

Docker 是一个容器化平台，可以将应用及其依赖打包到一个轻量级的容器中。

## 基本概念

- **镜像 (Image)** - 应用的只读模板
- **容器 (Container)** - 镜像的运行实例
- **Dockerfile** - 构建镜像的脚本
- **仓库 (Registry)** - 存储镜像的地方

## 常用命令

```bash
# 拉取镜像
docker pull nginx:latest

# 运行容器
docker run -d -p 80:80 --name my-nginx nginx

# 查看运行中的容器
docker ps

# 停止容器
docker stop my-nginx

# 查看日志
docker logs my-nginx
```

## Dockerfile 示例

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
