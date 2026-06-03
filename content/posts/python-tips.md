---
date: '2026-05-20'
title: 'Python 开发中值得养成的 8 个编码习惯'
categories: ["技术"]
tags: ["Python", "编程", "最佳实践"]
description: '分享日常 Python 开发中实用且容易上手的编码技巧，涵盖列表推导、字典操作、上下文管理器、类型提示等。'
cover:
  image: '/images/square-1.webp'
---

Python 以简洁优雅著称，但写出真正的 Pythonic 代码需要刻意练习。以下是日常开发中最值得养成的几个习惯。

## 1. 善用列表推导，但别滥用

列表推导清晰时非常优雅：

```python
# 过滤与转换一步到位
active_users = [u.name for u in users if u.is_active]

# 构建字典
name_map = {u.id: u.name for u in users}
```

但超过一层嵌套时，可读性会急剧下降。此时用普通循环更清晰：

```python
# 不推荐
result = [x for row in matrix for x in row if x > 0]

# 推荐：拆开写
result = []
for row in matrix:
    for x in row:
        if x > 0:
            result.append(x)
```

## 2. 用 `|` 合并字典（Python 3.9+）

```python
defaults = {"timeout": 30, "retries": 3}
user_config = {"timeout": 60}
final = defaults | user_config
# {'timeout': 60, 'retries': 3}
```

右边覆盖左边，语义直观。老版本用 `{**a, **b}` 也可以，但 `|` 更可读。

## 3. 用上下文管理器管理资源

不只是文件，任何需要"打开-关闭"的资源都适合：

```python
from contextlib import contextmanager
import time

@contextmanager
def timer(description: str = ""):
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print(f"{description}耗时: {elapsed:.3f}s")

# 使用
with timer("数据处理"):
    process_large_dataset()
```

## 4. 使用类型提示

Python 3.5+ 支持类型注解，配合编辑器能大幅减少低级错误：

```python
from typing import Optional

def find_user(user_id: int) -> Optional[dict]:
    """返回用户数据，不存在时返回 None"""
    return users_db.get(user_id)
```

团队项目中，类型提示的价值尤其明显——它们是可执行的文档。

## 5. `pathlib` 替代 `os.path`

```python
from pathlib import Path

# 旧方式
import os
path = os.path.join("data", "config", "app.json")

# 新方式
path = Path("data") / "config" / "app.json"
content = path.read_text(encoding="utf-8")
```

`Path` 对象支持 `/` 拼接、`read_text`、`write_text`，API 更统一。

## 6. 用 `enumerate` 替代 `range(len())`

```python
# 不 Pythonic
for i in range(len(items)):
    print(f"{i}: {items[i]}")

# Pythonic
for i, item in enumerate(items):
    print(f"{i}: {item}")
```

## 7. 用 `f-string` 格式化

```python
name = "World"
count = 42

# Python 3.6+
print(f"Hello {name}, count is {count}")
print(f"{count:04d}")           # 0042
print(f"{0.1234:.2%}")          # 12.34%
```

## 8. 异常处理要具体

```python
# 不好
try:
    value = config["key"]
except:
    value = "default"

# 好
try:
    value = config["key"]
except KeyError:
    value = "default"
```

捕获过于宽泛的异常会掩盖真正的 bug。永远只捕获你预期会发生的异常类型。

---

Python 的哲学是"应该有一种——最好只有一种——显而易见的写法"。这些习惯并不复杂，坚持用下去，代码质量会自然提升。
