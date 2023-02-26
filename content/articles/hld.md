---
title: 树链剖分笔记
tags:
- OI
- 算法
- 数据结构
- 树链剖分
categories: 学习笔记
date: 2023-02-25
katex: true
---

树链剖分（本文仅介绍 重链剖分（Heavy-Light Decomposition））的用途：

- 更新树上两点之间的路径上的所有点的值
- 求树上两点之间的路径上的最大值、最小值、和（或任意满足结合律的运算）

## 思想

树链剖分即把整棵树剖分成若干条链，然后用线段树等数据结构来维护链上的信息。重链剖分可以将树上的任何一条路径划分成不超过 $O(\log n)$ 条连续的链。

定义：

- **重子节点** 表示其子节点中子树最大的子结点。如果有多个子树最大的子结点，取其一。如果没有子节点，就无重子节点。
- **轻子节点** 表示剩余的所有子结点。
- 从这个结点到重子节点的边为 **重边**。
- 到其他轻子节点的边为 **轻边**。
- 若干条首尾衔接的重边构成 **重链**。

把落单的结点也当作重链，那么整棵树就被剖分成若干条重链。

## 性质

- **树上每个节点都属于且仅属于一条重链**。
- 重链开头的结点不一定是重子节点（因为重边是对于每一个结点都有定义的）。
- 所有的重链将整棵树 **完全剖分**。
- 在剖分时 **重边优先遍历**，最后树的 DFN 序上，重链内的 DFN 序是连续的。按 DFN 排序后的序列即为剖分后的链。
- 一颗子树内的 DFN 序是连续的。
- 可以发现，当我们向下经过一条 **轻边** 时，所在子树的大小至少会除以二。

- 因此，对于树上的任意一条路径，把它拆分成从 $lca$ 分别向两边往下走，分别最多走 $O(\log n)$ 次，因此，树上的每条路径都可以被拆分成不超过 $O(\log n)$ 条重链。

## 实现

模板 [RECORD](https://loj.ac/s/1710349)。

定义：

- $fa(x)$ 表示节点 $x$ 在树上的父亲。
- $dep(x)$ 表示节点 $x$ 在树上的深度。
- $siz(x)$ 表示节点 $x$ 的子树的节点个数。
- $son(x)$ 表示节点 $x$ 的 **重儿子**。
- $top(x)$ 表示节点 $x$ 所在 **重链** 的顶部节点（深度最小）。
- $dfn(x)$ 表示节点 $x$ 的 **DFS 序**，也是其在线段树中的编号。
- $rnk(x)$ 表示 DFS 序所对应的节点编号，有 $rnk(dfn(x))=x$。

需要用两次 DFS 求出以上的所有值。

```cpp
void dfs1(int u, int f) {
  fa[u] = f;
  dep[u] = dep[f] + 1;
  siz[u] = 1;
  for (int i = 0; i < g[u].size(); i++) {
    int v = g[u][i];
    if (v == f) continue;
    dfs1(v, u);
    if (son[u] == 0 || siz[v] > siz[son[u]]) son[u] = v;
    siz[u] += siz[v];
  }
}

void dfs2(int u, int topp) {
  top[u] = topp;
  dfn[u] = ++cnt;
  rnk[dfn[u]] = u;
  if (son[u] != 0) dfs2(son[u], topp); // 小心！要判断该节点有无重儿子
  for (int i = 0; i < g[u].size(); i++) {
    int v = g[u][i];
    if (v == fa[u] || v == son[u]) continue;
    dfs2(v, v);
  }
}
```

然后用 DFN 序来代表每一个点，套上普通的线段树：

```cpp
void build(int u, int l, int r) {
  if (l == r) {
    tree[u].maxx = tree[u].sum = w[rnk[l]];
    return;
  }
  build(u << 1, l, mid);
  build(u << 1 | 1, mid + 1, r);
  pushup(u);
}
// ... 修改查询什么的的就不贴上来了
```

### 处理路径信息

处理两个点 $u$，$v$ 之间的信息，重复以下步骤：

1. 如果 $u$，$v$ 不在同一条链上，设 **$u$ 所在链链顶深度较大**，则查出 $u$ 的链顶到 $u$ 的信息（依据同一条重链上 DFN 序是连续的），然后将 $u$ 跳到 **$u$ 所在链链顶的父亲**
2. 如果 $u$，$v$ 在同一条链上，直接查询。结束。

```cpp
int ans = -INF;
while (top[x] != top[y]) {
  if (dep[top[x]] < dep[top[y]]) swap(x, y);
  ans = max(ans, queryMax(1, 1, cnt, dfn[top[x]], dfn[x]));
  x = fa[top[x]];
}
if (dep[x] > dep[y]) swap(x, y);
ans = max(ans, queryMax(1, 1, cnt, dfn[x], dfn[y]));
cout << ans << endl;
```

运用同样的方法，可以求出两个点的 LCA。

### 处理子树信息

根据一颗子树内的 DFN 序是连续的，我们可以记录所在子树连续区间末端的结点，就可以把子树转化为连续的一段区间。

## 参考资料

- 本文中的理论内容基本来自 [树链剖分 - OI Wiki](https://oi-wiki.org/graph/hld/)。
- [树链剖分学习笔记 - Menci](https://oi.men.ci/tree-chain-split-notes/)

🙇‍