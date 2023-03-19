---
title: 割点和桥笔记
tags:
- OI
- 算法
- Tarjan
- 图论
- 割点和桥
categories: 学习笔记
date: 2023-03-19
katex: true
---

## 定义

若对于无向连通图的一个点 $x$，从图中删去这个点和与这个点相连的所有边后，图不再是连通图，则 $x$ 为这个图的割点。

若对于无向连通图的一条边 $e$，从图中删去这条边后，图不再是连通图，则 $e$ 为这个图的割边（桥）。

## 求解

### 无向图的搜索树

从任意一个点出发进行 DFS，每个点只能访问一次，所有被访问过的结点和边构成一棵搜索树。

然后就可以将图上的边分为两类，树边和返祖边，返祖边连接了一个点和它的一个祖先。

### 时间戳 dfn 和追溯值 low

$dfn[x]$ 表示在 DFS 的过程中，$x$ 第一次被访问的顺序。

$low[x]$ 表示 $x$ 和 $x$ 的子树中所有点的时间戳 和 从 $x$ 的子树中的点通过**仅一条**返祖边可以达到的点的时间戳 的最小值。

更新 $low$ 的方法：

- 如果 $v$ 是 $u$ 的儿子：$low[u] = min(low[u], low[v])$
- 否则：$low[u] = min(low[u], dfn[v])$

### 割点的判定

对于某个点 $u$，如果它的儿子中存在一个点 $v$，使得 $low[v] \ge dfn[u]$，即不能回到祖先，那么 $u$ 就是割点。

对于搜索树的根节点就比较特殊，如果它在搜索树中只有一个儿子，是不能成为割点的，需要特判。

树的叶子节点由于没有儿子，也不能成为割点。

```cpp
void tarjan(int u, int father) {
	int child = 0;
	vis[u] = 1;
	low[u] = dfn[u] = ++inde;
	for (int i = 0; i < g[u].size(); i++) {
		int v = g[u][i];
		if (!vis[v]) {
			child++;
			tarjan(v, u);
			low[u] = min(low[u], low[v]);
			if (father != u && low[v] >= dfn[u] && !flag[u]) {
				flag[u] = 1;
				res++;
			}
		} else if (v != father) {
			low[u] = min(low[u], dfn[v]);
		}
	}
	if (u == father && child >= 2 && !flag[u]) { // 特判根节点
		flag[u] = 1;
		res++;
	}
}
```

### 割边的判定

与割点同理，只需要修改成：$low[v] \gt dfn[u]$ 即可，不需要考虑是否为根节点。

```cpp
void tarjan(int u, int fa) {
  father[u] = fa;
  low[u] = dfn[u] = ++inde;
  for (int i = 0; i < G[u].size(); i++) {
    int v = G[u][i];
    if (!dfn[v]) {
      tarjan(v, u);
      low[u] = min(low[u], low[v]);
      if (low[v] > dfn[u]) {
        isbridge[v] = true;
        ++cnt_bridge;
      }
    } else if (dfn[v] < dfn[u] && v != fa) {
      low[u] = min(low[u], dfn[v]);
    }
  }
}
```

## 参考资料

- [[算法笔记] 割点与割边 - installb](https://www.luogu.com.cn/blog/ltzlInstallBl/post-suan-fa-bi-ji-shuang-lian-tong-fen-liang)
- [割点和桥 - OI Wiki](https://oi-wiki.org/graph/cut/)