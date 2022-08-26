---
title: 拓扑排序笔记
tags:
- OI
- 算法
- 数据结构
- 图论
- 拓扑排序
categories: 学习笔记
date: 2022-08-26
katex: true
---

## 引入

给定一张有向无环图（DAG, Directed Acyclic Graph），对其顶点进行排序，使得对于每条从 $u$ 到 $v$ 的有向边 $(u, v)$，$u$ 在排序中都在 $v$ 的前面。这种排序就称为**拓扑排序**（Topological sorting）。

当且仅当图中没有定向环时（即有向无环图），才有可能进行拓扑排序。如果排序失败，就说明该有向图存在环，不是 DAG。

任何有向无环图至少有一个拓扑排序。

## 算法

### Kahn 算法

初始状态下，集合 $S$ 装着所有入度为 $0$ 的点，$L$ 是一个空列表。

每次从 $S$ 中任意取出一个点 $u$ 放入 $L$, 然后将 $u$ 的所有边 $(u, v_1), (u, v_2), (u, v_3) \cdots$ 删除。对于边 $(u, v)$，若将该边删除后点 $v$ 的入度变为 $0$，则将 $v$ 放入 $S$ 中。

不断重复以上过程，直到集合 $S$ 为空。检查图中是否存在任何边，如果有，那么这个图一定有环路，否则返回 $L$，$L$ 中顶点的顺序就是拓扑排序的结果。

基本上就是 BFS 的框架。

**代码实现**：

```cpp
int n, m;
vector<int> G[MAXN];
int in[MAXN];  // 存储每个结点的入度
bool toposort() {
  vector<int> L;
  queue<int> S;
  for (int i = 1; i <= n; i++)
    if (in[i] == 0) S.push(i);
  while (!S.empty()) {
    int u = S.front();
    S.pop();
    L.push_back(u);
    for (auto v : G[u]) {
      if (--in[v] == 0) { S.push(v); }
    }
  }
  if (L.size() == n) {
    for (auto i : L) cout << i << ' ';
    return true;
  } else {
    return false;
  }
}
```

### DFS 算法

借助 DFS 完成拓扑排序：在访问完一个结点之后把它加到当前拓扑序的**首部**。

**代码实现**：

当 `c[u] == 0` 时，表示从来没有被访问过（从来没有调用过 `dfs(u)`）；`c[u] == 1` 时，表示已经访问过，而且还递归访问过它的所有子孙（即调用过 `dfs(u)` 且已返回）；`c[u] == -1` 时表示正在访问（即递归调用 `dfs(u)` 正在栈帧中，尚未返回）。

```cpp
int n, m;
vector<int> G[MAXN];
int c[MAXN], topo[MAXN], t;
bool dfs(int u) {
  c[u] = -1;
  for (auto v : G[u]) {
    if (c[v] < 0)
      return false;
    else if (c[v] == 0 && !dfs(v))
      return false;
  }
  c[u] = 1;
  topo[--t] = u;
  return true;
}
bool toposort() {
  t = n;
  memset(c, 0, sizeof(c));
  for (int i = 1; i <= n; i++)
    if (!c[i])
      if (!dfs(i)) return false;
  return true;
}
```

## 练习

- [UVA10305 给任务排序 Ordering Tasks](https://www.luogu.com.cn/problem/UVA10305) 例题
- [CF1385E Directing Edges](https://www.luogu.com.cn/problem/CF1385E)

## 参考资料

- [OI Wiki](https://oi-wiki.org/graph/topo) [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.zh)
- 《算法竞赛入门经典》
