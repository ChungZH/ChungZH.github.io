---
title: Luogu-P3521 「POI2011」ROT-Tree Rotations
tags:
- OI
- 算法
- 数据结构
- 线段树
- 权值线段树
- 线段树合并
categories: 题解
date: 2022-08-14
katex: true
---

## 题意

给定一颗有 $n$ 个**叶节点**的二叉树。每个叶节点都有一个权值 $p_i$（注意，根不是叶节点），所有叶节点的权值构成了一个 $1 \sim n$ 的排列。  

对于这棵二叉树的任何一个结点，保证其要么是叶节点，要么左右两个孩子都存在。  

现在你可以任选一些节点，交换这些节点的左右子树。  

在最终的树上，按照先序遍历遍历整棵树并依次写下遇到的叶结点的权值构成一个长度为 $n$ 的排列，你需要最小化这个排列的逆序对数。

$2 \leq n \leq 2 \times 10^5$， $0 \leq x \leq n$，所有叶节点的权值是一个 $1 \sim n$ 的排列。

## 分析

按照先序遍历整棵树，取叶结点，用人话说就是从左到右取叶子结点。

重要性质：交换了一个点的左右子树之后，不会影响**左子树内**和**右子树内**的逆序对数量。

考虑一个任意的结点，对它的子树中叶子的逆序对进行分类讨论：

1. 都在左子树内；
2. 都在右子树内；
3. 跨越左右子树。

交换左右子树之后，受到影响的显然只有第三种情况。第一、第二种情况分治下去就可以转化成第三种再计算。

如何计算答案呢？一开始，对于每一个叶子结点，我们都建立一棵权值线段树（动态开点）并记录 $p_i$ 出现了 $1$ 次。合并 $r1, r2$ 时，逆序对的个数就是 $tree[rc[r1]] \times tree[lc[r2]]$。因为 $r1, r2$ 对应的权值区间 $[L, R]$ 是相同的，而 $lc[r1], lc[r2]$ 对应的权值区间就是 $[L, M]$， $rc[r1], rc[r2]$ 对应的权值区间是 $[M+1, R]$，$rc[]$ 中记录的数都比 $lc[]$ 中的要大，而 $r1$ 对应的数的编号小于 $r2$（也就是 $r1$ 是左子树，$r2$ 是右子树），满足逆序对的条件。

这时算出来的逆序对的个数是**不交换左右子树**的情况，我们只要再计算出**交换左右子树**的逆序对的个数 $tree[rc[r2]] \times tree[lc[r1]]$，进行比较，取较小值为当前层级的答案即可。

[RECORD](https://www.luogu.com.cn/record/83804384)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define LL long long
const int MAXN = 200005;
int n;
LL ans = 0, u = 0, v = 0;
int cnt = 0, roc = 0, root[MAXN << 5], lc[MAXN << 5], rc[MAXN << 5],
    tree[MAXN << 5];
int build(int l, int r, int p) {
  int pos = ++cnt;
  if (l == r) {
    tree[pos] = 1;
    return pos;
  }
  int m = (l + r) >> 1;
  if (p <= m)
    lc[pos] = build(l, m, p);
  else
    rc[pos] = build(m + 1, r, p);
  tree[pos] = tree[lc[pos]] + tree[rc[pos]];
  return pos;
}
int merge(int r1, int r2, int l, int r) {
  if (!r1 || !r2) return r1 ^ r2;
  if (l == r) {
    tree[r1] += tree[r2];
    return r1;
  }
  int m = (l + r) >> 1;
  u += (LL)tree[rc[r1]] * tree[lc[r2]];
  v += (LL)tree[rc[r2]] * tree[lc[r1]];
  lc[r1] = merge(lc[r1], lc[r2], l, m);
  rc[r1] = merge(rc[r1], rc[r2], m + 1, r);
  tree[r1] = tree[lc[r1]] + tree[rc[r1]];
  return r1;
}
int dfs() {
  int x, pos;
  cin >> x;
  if (x == 0) {
    int ls = dfs(), rs = dfs();
    u = v = 0;
    pos = merge(ls, rs, 1, n);
    ans += min(u, v);
  } else {
    pos = build(1, n, x);
  }
  return pos;
}
int main() {
  cin >> n;
  dfs();
  cout << ans << endl;
  return 0;
}
```
