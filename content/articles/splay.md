---
title: Splay 笔记
tags:
- OI
- 算法
- 数据结构
- 平衡树
- Splay
categories: 学习笔记
date: 2021-08-17
author: ChungZH
katex: true
draft: true
---

## 前置知识

之前介绍过的 [Treap](http://blog.chungzh.cn/articles/treap)。

## 简介

Splay Tree（又名伸展树）是一种二叉查找树，它通过 Splay 操作，即不断将某个节点旋转到根节点，使得整棵树仍然满足二叉查找树的性质，并且保持平衡而不至于退化为链。它由 Daniel Sleator 和 Robert Tarjan 发明。

## 旋转操作

**旋转需要保证**：

- 整棵 Splay 的中序遍历不变（不能破坏二叉查找树的性质）。
- 受影响的节点维护的信息依然正确有效。
- `root` 必须指向旋转后的根节点。

单旋包括：

1. 右旋（Zig）
2. 左旋（Zag）

**具体分析旋转步骤**（设需要旋转的节点为 $x$，其父亲为 $y$，其祖父为 $z$，以右旋为例）：

1. 将 $z$ 的某个儿子（原来 $y$ 所在的儿子位置即 `y->get()`）指向 $x$，且 $x$ 的父亲指向 $z$。

    `z->ch[y->get()] = x, x->fa = z;`
2. 将 $y$ 的左儿子指向 $x$ 的右儿子，且 $x$ 的右儿子的父亲指向 $y$。

    `y->ch[0] = x->ch[1], x->ch[1]->fa = y;`
3. 将 $x$ 的右儿子指向 $y$，且 $y$ 的父亲指向 $x$。

    `x->ch[1] = y, y->fa = x;`
4. 分别更新 $y$ 节点的信息（节点 $x$ 信息在后文会更新，当然此时更新了也没事）。

    `y->pushup();`

## Splay 操作

Splay 操作的目标就是将当前结点旋转至根结点。我们发现，如果**只用单旋操作**，时间复杂度是可能被卡到 $O(n)$ 的。而 Splay 还要使用双旋。

双旋：

1. 如果当前点是父亲的左儿子，且父亲是祖父的左儿子，那么先右旋祖父结点，再右旋父结点（Zig-Zig）
2. 如果当前点是父亲的右儿子，且父亲是祖父的右儿子，那么先左旋祖父结点，再左旋父结点（Zag-Zag）
3. 如果当前点是父亲的左儿子，且父亲是祖父的右儿子，那么先右旋父亲，再左旋祖父（Zig-Zag）
4. 如果当前点是父亲的右儿子，且父亲是祖父的左儿子，那么先左旋父亲，再右旋祖父（Zag-Zig）


## 参考资料

- [Splay - OI Wiki](https://oi-wiki.org//ds/splay/) [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.zh)
- [Lecture 6 - Splay Trees | MIT OpenCourseWare](https://ocw.mit.edu/courses/6-854j-advanced-algorithms-fall-2008/resources/lec6/)
