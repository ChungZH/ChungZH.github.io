---
title: 最短路笔记
tags:
- OI
- 算法
- 图论
- 最短路
categories: 学习笔记
date: 2022-10-01
katex: true
---

又是一年 CSP 复赛，~~已经一年没写过最短路了~~，赶紧复习一下。

## Floyd-Warshall 算法

Floyd 算法是用来求所有结点对最短路的。适用于所有不含负环的图。

这个算法运用了 DP 的思想。首先定义 `f[k][i][j]` 表示只允许经过结点 $1, 2, \cdots k$，结点 $i$ 到结点 $j$ 的最短路长度。初始化时，`f[i][i] = 0`，其他赋值为 $+\infty$。可以有 `f[k][i][j] = min(f[k-1][i][j], f[k-1][i][k] + f[k-1][k][j])`（`f[k-1][i][j]` 表示不经过 $k$ 点的最短路径，`f[k-1][i][k] + f[k-1][k][j]` 表示经过 $k$ 点的最短路径）。这时可以发现，数组的第一维是可以忽略的，所以直接写成 `f[i][j] = min(f[i][j], f[i][k] + f[k][j])`。

时间、空间复杂度均为 $O(N^3)$。

**实现**：

```cpp
for (int k = 1; k <= n; k++)
  for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++)
      f[i][j] = min(f[i][j], f[i][k] + f[k][j]);
```

### 无向图的最小环问题

[Luogu-P6175 无向图的最小环问题](https://www.luogu.com.cn/problem/P6175)

记原图中 $i,j$ 之间边的边权为 $val\left(i,j\right)$。

我们注意到 Floyd 算法有一个性质：在最外层循环到点 $k$ 时（尚未开始第 $k$ 次循环），最短路数组 $dis$ 中，$dis_{i,j}$ 表示的是从 $i$ 到 $j$ 且仅经过编号在 $\left[1, k\right)$ 区间中的点的最短路。

由最小环的定义可知其至少有三个顶点，设其中编号最大的顶点为 $w$，环上与 $w$ 相邻两侧的两个点为 $i,j$，则在最外层循环枚举到 $k=w$ 时，该环的长度即为 $dis_{i,j}+val\left(j,w\right)+val\left(w,i\right)$。

故在循环时对于每个 $k$ 枚举满足 $i<k,j<k$ 的 $(i,j)$，更新答案即可。

**实现**：

```cpp
int ans = INF;
for (int k = 1; k <= n; k++) {
  for (int i = 1; i < k; i++) {
    for (int j = i + 1; j < k; j++)
      ans = min(ans, dis[i][j] + val[j][k] + val[k][i]);
  for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++) 
      dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);
}
```

## Bellman-Ford 算法

Bellman-Ford 算法解决的是一般情况下的单源最短路径问题，边的权重可以为负值。它可以判断是否存在一个**从源节点可以到达的**负环。

先解释一下松弛操作。对于边 $(u, v)$，松弛操作表示 $dis(v) = \min(dis(v), dis(u)+w(u, v))$。含义很简单，就是用 $S\rightarrow u \rightarrow v$（其中 $S\rightarrow u$ 的路径取最短路）这条路径去更新 $v$ 的最短路的长度。

Bellman-Ford 算法就是不停地做松弛操作，当一次循环中没有成功地松弛操作时，算法停止。

每次循环是 $O(m)$ 的，在最短路存在的情况下，由于一次松弛操作会使最短路的边数至少 $+1$，而最短路的边数最多为 $n-1$，因此整个算法最多执行 $n-1$ 轮松弛操作。故总时间复杂度为 $O(nm)$。

但还有一种情况，如果从 $S$ 点出发，抵达一个负环时，松弛操作会无休止地进行下去。注意到前面的论证中已经说明了，对于最短路存在的图，松弛操作最多只会执行 $n-1$ 轮，因此如果第 $n$ 轮循环时仍然存在能松弛的边，说明从 $S$ 点出发，能够抵达一个负环。

**注意**：需要注意的是，以 $S$ 点为源点跑 Bellman-Ford 算法时，如果没有给出存在负环的结果，只能说明从 $S$ 点出发不能抵达一个负环，而不能说明图上不存在负环。如果需要判断整个图上是否存在负环，最严谨的做法是建立一个超级源点，向图上每个节点连一条权值为 0 的边，然后以超级源点为起点执行 Bellman-Ford 算法。

**实现**：

```cpp
vector<edge> G[MAXN];
int dis[MAXN];
bool bellmanford() {
  memset(dis, 0x3f, sizeof dis);
  dis[s] = 0;
  bool flag;  // 判断有没有松弛
  for (int i = 0; i < n; i++) {
    flag = false;
    for (int u = 1; u <= n; u++) {
      if (dis[u] == 0x3f3f3f3f) continue;
      // 无穷大与常数加减仍然为无穷大
      // 因此最短路长度为 inf 的点引出的边不可能发生松弛操作
      for (auto j : G[u]) {
        int v = j.to, w = j.w;
        if (dis[v] > dis[u] + w) {
          dis[v] = dis[u] + w;
          flag = true;
        }
      }
    }    
    // 没有可以松弛的边时就停止算法
    if (!flag) break;
  }
  return flag;  // 第 n 轮循环仍然可以松弛时（flag==true）说明 s 点可以抵达一个负环
}
```

### 队列优化：SPFA

> 关于 SPFA：它死了

很多时候我们并不需要那么多无用的松弛操作。显然，只有上一次被松弛的结点所连接的边，才有可能引起下一次的松弛操作。

那么我们用队列来维护“哪些结点可能会引起松弛操作”，就能只访问必要的边了。

SPFA 也可以用于判断 $s$ 点是否能抵达一个负环，只需记录最短路经过了多少条边，当经过了至少 $n$ 条边时，说明 $s$ 点可以抵达一个负环。

**慎用**！SPFA 在最坏情况下时间复杂度和 Bellman-Ford 一样为 $O(nm)$。如果没有负权边时，一定要使用 Dijkstra 算法。

**实现**：

```cpp
vector<edge> G[MAXN];
bool vis[MAXN];
int dis[MAXN], cnt[MAXN]; // cnt 记录最短路经过的边数
bool SPFA() {
  memset(dis, 0x3f, sizeof dis);
  dis[s] = 0;
  queue<int> q;
  q.push(s);
  while (!q.empty()) {
    int u = q.front();
    q.pop();
    vis[u] = 0;
    for (auto i : G[u]) {
      int v = i.to, w = i.w;
      if (dis[v] > dis[u] + w) {
        dis[v] = dis[u] + w;
        cnt[v] = cnt[u] + 1;
        // 在不经过负环的情况下，最短路至多经过 n - 1 条边
        // 因此如果经过了多于 n 条边，一定说明经过了负环
        if (cnt[v] >= n) return true;
        if (!vis[v]) {
          vis[v] = 1;
          q.push(v);
        }
      }
    }
  }
  return false;
}
```

## Dijkstra 算法

Dijkstra 算法要求所有边的权重都为非负值，运用贪心策略。我们把结点分为两个集合：已确定最短路长度的点集 $S$ 和未确定最短路长度的点集 $T$。算法重复从 $T$ 中选择最短路径估计最小的结点 $u$，将 $u$ 加入到集合 $S$，然后对所有从 $u$ 发出的边进行松弛。

暴力 Dijkstra 实现需要每次暴力寻找一个最小值，共寻找 $n$ 次，为 $O(n^2)$。每条边可能要进行一次松弛，为 $O(m)$。因此时间复杂度是 $O(n^2+m) = O(n^2)$。

**实现**：

```cpp
int n, m, s;
struct edge {
  int to, w;
};
vector<edge> G[MAXN];
bool used[MAXN];
int dis[MAXN];
void dijkstra() {
  memset(dis, 0x3f, sizeof dis);
  dis[s] = 0;
  for (int i = 1; i <= n; i++) {
    int minn = n + 1;
    for (int j = 1; j <= n; j++)
      if (!used[j] && dis[j] < dis[minn]) minn = j;
    used[minn] = 1;
    for (auto j : G[minn]) dis[j.to] = min(dis[j.to], dis[minn] + j.w);  // RELAX
  }
}
```

### 优先队列优化

可以用优先队列来寻找最短路长度的最小值，时间复杂度优化为 $O(m\log m)$。

**实现**：

```cpp
struct edge {
  int to, w;
  bool operator>(const edge b) { return w > b.w; }
};
vector<edge> G[MAXN];
bool used[MAXN];
int dis[MAXN];
priority_queue<edge, vector<edge>, greater<>> pq;
void dijkstra() {
  memset(dis, 0x3f, sizeof dis);
  dis[s] = 0;
  pq.push({s, 0});
  while (!pq.empty()) {
    edge t = pq.top();
    pq.pop();
    if (used[t.to]) continue;
    used[t.to] = 1;
    for (auto i : G[t.to]) {
      int v = i.to, w = i.w;
      if (dis[v] > dis[t.to] + w) {
        dis[v] = dis[t.to] + w;
        pq.push({v, dis[v]});
      }
    }
  }
}
```

要注意 `priority_queue` 默认是大根堆。换成小根堆需要重载 `>` 运算符，并使用 `priority_queue<edge, vector<edge>, greater<>> pq;`。

在松弛成功后，需要重新修改结点 `v` 的优先级，但是 STL 中优先队列不允许这样的操作。所以我们只能将新的元素插入优先队列（这样做不会影响正确性，因为新的元素的最短路长度更小，会更早出队），为了避免结点重复扩展，如果发现新取出的结点已经扩展过（`used[]`）就应该扔掉。另一种方法是把 `if (used[t.to])` 换成 `if (t.w == dis[t.to])`（`dis[t.to]` 一定是当前最短的）。

## 不同方法的比较

| 最短路算法    | Floyd      | Bellman-Ford | Dijkstra     |
| -------- | ---------- | ------------ | ------------ |
| 最短路类型    | 每对结点之间的最短路 | 单源最短路        | 单源最短路        |
| 作用于      | 任意图        | 任意图          | 非负权图         |
| 能否检测负环？  | 能          | 能            | 不能           |
| 推荐作用图的大小 | 小          | 中/小          | 大/中          |
| 时间复杂度    | $O(N^3)$   | $O(NM)$      | $O(M\log M)$

注：表中的 Dijkstra 算法在计算复杂度时均用 `priority_queue` 实现。

## 输出方案

比如 Floyd 就要记录 `pre[i][j] = k`，Bellman-Ford 和 Dijkstra 一般记录 `pre[v] = u`。

## 参考资料

- [OI Wiki](https://oi-wiki.org/) [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.zh)
- 《算法导论》
- 《算法竞赛入门经典》
