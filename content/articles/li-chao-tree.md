---
title: 李超线段树笔记
tags:
- OI
- 算法
- 数据结构
- 线段树
- 李超线段树
categories: 学习笔记
date: 2022-08-16
katex: true
draft: true
---

## 线段树之标记永久化

普通的线段树在做区间修改时依赖懒标记（lazy tag），当我们从一个点向下访问时，需要将标记 pushdown。能否避免如此多的 pushdown 操作呢？这时需要用到**标记永久化**技巧。

我们要做的就是将 lazy tag **永久地留在**当前的结点，这时子树中的所有结点都不会被这个 tag 所影响。因此，子树中询问的最大值 = 实际最大值 - tag。当我们想得到正确答案时，只要将子树返回的最大值加上当前 tag 即可。

标记永久化存在局限性，需要满足**不同的修改操作可以交换顺序，或者说对答案的贡献是独立的**这一条件。

举个例子：**区间设置+区间加法**，先设置后加和先加后设置的结果是不一样的，因此不能交换顺序。如果使用标记永久化，就可能改变了这个顺序。

1. 比如我们先设置后加，并且令设置的区间比加的区间大，因此加的 tag 在下方，设置的 tag 在上方。
2. 根据前面的方法，我们会从下往上取 tag，也就是先加法，再设置。
3. 这时我们发现，由于上层是一个设置操作，下面的所有答案最终都变成了设置的那个数字，下层操作就失效了。显然有问题。

**总结**：标记永久化就是不再下放标记，而是让标记永久地停留在当前结点上。在统计答案时再考虑标记的影响。

**复杂度分析**：由于标记不会下放，但如果有两个标记落在了一个结点上，我们不会分别存储这两个标记，而是加起来合成一个标记（$(+2) + (+3) = (+5)$）。因此，**每个结点最多只有一个标记**。询问时最多考虑 $\log n$ 个标记，复杂度和普通线段树相同 $O(\log n)$。

**程序实现**：

```cpp
int up(int p) { tree[p].mx = max(tree[p<<1].mx, tree[p<<1|1].mx)+tree[p].tag; }
int query(int p, int l, int r, int x, int y) {
  if (l >= x && r <= y) return tree[p].mx;
  int mid = (l + r) / 2, ans = -INF;
  if (x <= mid) ans = max(ans, query(p << 1, l, mid, x, y));
  if (y > mid) ans = max(ans, query(p << 1 | 1, mid + 1, r, x, y));
  return ans+tree[p].tag;
}
void update(int cur, int l, int r, int x, int y, int c) {
  if (l >= x && r <= y) {
    tree[cur].tag += c;
    tree[cur].mx += c;
    return;
  }
  int mid = (l + r) / 2;
  if (x <= mid) update(cur << 1, l, mid, x, y, c);
  if (y > mid) update(cur << 1 | 1, mid + 1, r, x, y, c);
  up(cur);
}
```

## 李超线段树之维护直线

## 李超线段树之维护线段
