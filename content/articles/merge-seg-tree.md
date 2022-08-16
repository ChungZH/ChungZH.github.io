---
title: 线段树合并笔记
tags:
- OI
- 算法
- 数据结构
- 线段树
- 线段树合并
categories: 学习笔记
date: 2021-08-14 11:00
author: ChungZH
katex: true
draft: true
---

## 二叉树合并

合并是一个递归的过程。首先合并两棵以 $u, v$ 为根的二叉树：

1. 考虑左子树
  - 如果 $u, v$ 都没有左子树，那么直接留空；
  - 如果只有 $u$ 有左子树，那么 $u$ 的左子树保留不动；
  - 如果只有 $v$ 有左子树，那么将 $v$ 的左子树接过来，成为 $u$ 的左子树；
  - 如果 $u, v$ 均有左子树，那么递归合并 $u, v$ 的左子树，结果赋给 $u$ 的左子树。
2. 考虑右子树
  - 如果 $u, v$ 都没有右子树，那么直接留空；
  - 如果只有 $u$ 有右子树，那么 $u$ 的右子树保留不动；
  - 如果只有 $v$ 有右子树，那么将 $v$ 的右子树接过来，成为 $u$ 的右子树；
  - 如果 $u, v$ 均有右子树，那么递归合并 $u, v$ 的右子树，结果赋给 $u$ 的右子树。

最后我们就将两棵二叉树合并成了一个以 $u$ 为根的二叉树。

**复杂度分析**：在上面的过程中，仅当 $u, v$ 均有左（右）孩子时才会进行递归，访问这个左（右）孩子。时间复杂度就是两棵二叉树中**重复的结点的数量**。

**程序实现：**

指针实现如下：

```cpp
TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
  if (!root1 && !root2) return NULL; // 事实上这一个判断略显多余，仅保留后面两行也可以
  if (!root1) return root2;
  if (!root2) return root1;
  root1->left = mergeTrees(root1->left, root2->left);
  root1->right = mergeTrees(root1->right, root2->right);
  return root1;
}
```

数组实现：

```cpp
int mergeTrees(int root1, int root2) {
  if (!root1 || !root2) return root1 ^ root2; // 非常简便的写法
  lc[root1] = mergeTrees(lc[root1], lc[root2]);
  rc[root1] = mergeTrees(rc[root1], rc[root2]);
  return root1;
}
```


## 线段树合并之维护信息

线段树本质上也是二叉树，因此合并线段树和合并二叉树是差不多的。不同的是，线段树每个结点还维护了**其他的信息**，例如区间最大值，总和等等。

我们知道，线段树上一个结点的信息需要从它的子结点中得出，因此只要在合并完一个结点的左子树和右子树之后，将左右儿子结点的信息取出来维护即可。叶子结点就更加简单了。

```cpp
void up(int root) {
  maxx[root] = max(maxx[lc[root]], maxx[rc[root]]);
  sum[root] = sum[lc[root]] + sum[rc[root]];
}
int mergeSegTrees(int root1, int root2) {
  if (!root1 || !root2) return root1 ^ root2;
  lc[root1] = mergeSegTrees(lc[root1], lc[root2]);
  rc[root1] = mergeSegTrees(rc[root1], rc[root2]);
  // 维护信息
  up(root1);
  return root1;
}
```

## 线段树合并之修改操作

我们在做线段树区间修改时，通常会使用懒标记（lazy tag）。一旦向下访问，当前结点的标记就要下放（pushdown）。但当我们要支持线段树合并时，两棵树的标记该怎么处理呢？

关键点在于：一棵线段树上做的标记，只代表对这个线段树的结点的修改，与另一棵无关。因此，在合并这两个结点之前，**先将这两个标记下放**。

**复杂度分析**：

## 习题

- [线段树合并：从入门到精通](https://www.luogu.com.cn/training/3858)
