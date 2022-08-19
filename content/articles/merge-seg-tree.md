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
---

前置知识：动态开点线段树。

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

## 例题「HNOI2012」永无乡

[Luogu-P3224 「HNOI2012」永无乡](https://www.luogu.com.cn/problem/P3224)

### 题意

永无乡包含 $n$ 座岛，编号从 $1$ 到 $n$ ，每座岛都有自己的独一无二的重要度，按照重要度可以将这 $n$ 座岛排名，名次用 $1$ 到 $n$ 来表示。某些岛之间由巨大的桥连接，通过桥可以从一个岛到达另一个岛。如果从岛 $a$ 出发经过若干座（含 $0$ 座）桥可以 到达岛 $b$ ，则称岛 $a$ 和岛 $b$ 是连通的。

现在有两种操作：

- `B x y` 表示在岛 $x$ 与岛 $y$ 之间修建一座新桥。

- `Q x k` 表示询问当前与岛 $x$ 连通的所有岛中第 $k$ 重要的是哪座岛，即所有与岛 $x$ 连通的岛中重要度排名第 $k$ 小的岛是哪座，请你输出那个岛的编号。

$1 \leq m \leq n \leq 10^5$, $1 \leq q \leq 3 \times 10^5$，$p_i$ 为一个 $1 \sim n$ 的排列，$op \in \{\texttt Q, \texttt B\}$，$1 \leq u, v, x, y \leq n$。

### 分析

先只看询问操作，实际上是一个第 k 大问题，可以用**权值线段树**解决。

通过建桥，我们可以得到几个连通块，同时还要合并操作。很容易联想到 **并查集**。

在这个过程中，每一个连通块都应拥有一棵权值线段树，所以一开始对于每一个岛都建立一个权值线段树，然后动态开点这座岛的重要度。建桥时，先进行线段树合并，再进行并查集合并。

注意合并过程中，线段树合并的方向要与并查集合并的方向一致。例如 `fa[a] = b;`，那么 `root[b]` 就要指向线段树合并的根。或者为了保险，将 `root[a]` 和 `root[b]` 都指向新的根也是没问题的。

[RECORD](https://www.luogu.com.cn/record/83755018)

```cpp
#include <bits/stdc++.h>
using namespace std;
const int MAXN = 300005;
int n, m;
int p[MAXN], ans[MAXN];
int root[MAXN << 5], lc[MAXN << 5], rc[MAXN << 5], tree[MAXN << 5], cnt = 0;
int fa[MAXN];
int find(int x) {
  if (fa[x] == x) return x;
  return fa[x] = find(fa[x]);
}
int bcmerge(int a, int b) {
  a = find(a), b = find(b);
  fa[a] = b;
}
void up(int u) { tree[u] = tree[lc[u]] + tree[rc[u]]; }
void ins(int &rt, int l, int r, int p) {
  if (!rt) rt = ++cnt;
  if (l == r) {
    tree[rt] = 1;
    return;
  }
  int m = (l + r) >> 1;

  if (p <= m)
    ins(lc[rt], l, m, p);
  else
    ins(rc[rt], m + 1, r, p);
  up(rt);
}
int merge(int u, int v, int l, int r) {
  if (!u || !v) return u ^ v;
  if (l == r) {
    tree[u] += tree[v];
    return u;
  }
  int m = (l + r) >> 1;
  lc[u] = merge(lc[u], lc[v], l, m);
  rc[u] = merge(rc[u], rc[v], m + 1, r);
  up(u);
  return u;
}
int kth(int u, int l, int r, int k) {
  if (l == r) return l;
  int m = (l + r) >> 1;
  if (k > tree[lc[u]]) return kth(rc[u], m + 1, r, k - tree[lc[u]]);
  return kth(lc[u], l, m, k);
}
int main() {
  cin >> n >> m;
  for (int i = 1; i <= n; i++) {
    cin >> p[i];
    ans[p[i]] = i;
    fa[i] = i;
    ins(root[i], 1, n, p[i]);
  }
  while (m--) {
    int u, v;
    cin >> u >> v;
    root[find(v)] = merge(root[find(u)], root[find(v)], 1, n);
    bcmerge(u, v);
  }
  int q;
  cin >> q;
  while (q--) {
    char op;
    int x, y;
    cin >> op >> x >> y;
    if (op == 'Q') {
      if (tree[root[find(x)]] < y)
        cout << -1 << endl;
      else
        cout << ans[kth(root[find(x)], 1, n, y)] << endl;
    } else {
      root[find(y)] = merge(root[find(x)], root[find(y)], 1, n);
      bcmerge(x, y);
    }
  }
  return 0;
}
```

## 习题

- [线段树合并：从入门到精通](https://www.luogu.com.cn/training/3858)
