---
date: '2026-05-25'
title: 'Python 开发实用技巧'
categories: ["技术"]
tags: ["Python", "编程"]
---

Python 是一门优雅且强大的编程语言，这里分享一些日常开发中的实用技巧。

## 列表推导式

```python
# 传统写法
squares = []
for i in range(10):
    squares.append(i * i)

# 列表推导式
squares = [i * i for i in range(10)]
```

## 字典合并

```python
# Python 3.9+
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = dict1 | dict2
# {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

## 上下文管理器

```python
# 使用 with 语句自动管理资源
with open("file.txt", "r") as f:
    content = f.read()
# 文件会自动关闭
```

### 自定义上下文管理器

```python
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield
    end = time.time()
    print(f"耗时: {end - start:.2f}秒")

with timer():
    # 要计时的代码
    sum(range(1000000))
```
