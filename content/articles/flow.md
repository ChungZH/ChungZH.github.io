---
title: 网络流笔记
tags:
- OI
- 算法
- 网络流
- 最大流
- 最小割
- 费用流
- EK
- Dinic
categories: 学习笔记
date: 2023-07-29
katex: true
---

## 最大流

### 概念

- 容量：$capacity(e)$ 表示一条有向边 $e(u, v)$ 的最大允许的流量。
- 流量：$flow(e)$ 表示一条有向边 $e(u, v)$ 总容量中已被占用的流量。
- 剩余流量（残量）：$w(e) = c(e)-f(e)$，表示当前时刻某条有向边 $e(u, v)$ 总流量中未被占用的部分。
- 反向边：原图中每一条有向边在残量网络中都有对应的反向边，反向边的容量为 $0$，容量的变化与原边相反；『反向边』的概念是相对的，即一条边的反向边的反向边是它本身。
- 残量网络：在原图的基础之上，添加每条边对应的反向边，并储存每条边的当前流量。残量网络会在算法进行的过程中被修改。
- 增广路（augmenting path）：残量网络中从源点到汇点的一条路径，增广路上所有边中最小的剩余容量为**增广流量**。
- 增广（augmenting）：在残量网络中寻找一条增广路，并将增广路上所有边的流量加上**增广流量**的过程。
- 层次：$level(u)$ 表示节点 $u$ 在层次图中与源点的距离。
- 层次图：在原残量网络中按照每个节点的层次来分层，只保留**相邻两层**的节点的图，**满载（即流量等于容量）的边不存在于层次图中**。

流的三个重要性质：

1. **容量限制**：对于每条边，流经该边的流量不得超过该边的容量，即，$f(u,v)\leq c(u,v)$
2. **斜对称性**：每条边的流量与其相反边的流量之和为 0，即 $f(u,v)=-f(v,u)$
3. **流守恒性**：从源点流出的流量等于汇点流入的流量，即 $\forall x\in V-\{s,t\},\sum_{(u,x)\in E}f(u,x)=\sum_{(x,v)\in E}f(x,v)$

最大流问题：指定合适的流 $f$，以最大化整个网络的流量（即 $\sum_{(s,v)\in E}f(s,v)$）。


### Ford-Fulkerson 增广

增广路指一条从 $s$ 到 $t$ 的路径，路径上每条边残余容量都为正。把残余容量为正（$w(u, v) \gt 0$）的边设为可行边，然后搜索寻找增广路。

找到一条增广路后，这条路能够增广的流值由路径上边的最小残留容量 $w(u, v)$（记为 $flow$）决定。将这条路径上每条边的 $w(u, v)$ 减去 $flow$。最后，路径上每条边的反向边残留容量要加上 $flow$。

**为什么增广路径上每条边的反向边的残留容量值要加上 $flow$**？因为**斜对称性**，残量网络=容量网络-流量网络，容量网络不变时，流量网络上的边的流量增加 $flow$，反向边流量减去 $flow$，残量网络就会发生相反的改变。从另一个角度来说，这个操作可以理解为「退流」，给了我们一个反悔的机会，让增广路的顺序不受限制。

增广路算法好比是自来水公司不断的往水管网里一条一条的通水。

这个算法基于**増广路定理**：网络达到最大流当且仅当残留网络中没有増广路。

**建图技巧**：从 $2$ 开始对边编号，这样 $i$ 的反向边就是 $i \oplus 1$。

### Edmonds–Karp 算法

用 BFS 找增广路：

- 如果在 $G_f$ 上我们可以从 $s$ 出发 BFS 到 $t$，则我们找到了新的增广路。
- 对于增广路 $p$，我们计算出 $p$ 经过的边的剩余容量的最小值 $\Delta = \min_{(u, v) \in p} c_f(u, v)$。我们给 $p$ 上的每条边都加上 $\Delta$ 流量，并给它们的反向边都退掉 $\Delta$ 流量，令最大流增加了 $\Delta$。
- 因为我们修改了流量，所以我们得到新的 $G_f$，我们在新的 $G_f$ 上重复上述过程，直至增广路不存在，则流量不再增加。

显然，单轮 BFS 增广的时间复杂度是 $O(m)$。增广总轮数的上界是 $O(nm)$。相乘后得到 EK 算法的时间复杂度是 $O(nm^2)$

代码实现中，$w$ 表示边的容量。

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const int MAXN = 250, MAXM = 5005;
const ll INF = 0x3f3f3f3f;

struct Edge {
  int from, to;
  ll w;
} edges[2 * MAXM];
int n, m, s, t, tot = 1;
vector<int> G[MAXN];  // G: x 的所有边在 edges 中的下标
ll a[MAXN];           // a: BFS 过程中最近接近点 x 的边给它的最大流
int p[MAXN];          // p: 最近接近 x 的边
void addEdge(int from, int to, ll w) {
  edges[++tot] = {from, to, w};
  edges[++tot] = {to, from, 0};
  G[from].push_back(tot - 1);
  G[to].push_back(tot);
}
bool bfs(int s, int t) {
  memset(a, 0, sizeof a);
  memset(p, 0, sizeof p);
  queue<int> Q;
  Q.push(s);
  a[s] = INF;
  while (!Q.empty()) {
    int x = Q.front();
    Q.pop();
    for (int i = 0; i < G[x].size(); i++) {
      Edge &e = edges[G[x][i]];
      if (!a[e.to] && e.w) {
        p[e.to] = G[x][i];         // G[x][i] 是最接近 e.to 的边
        a[e.to] = min(a[x], e.w);  // 最接近 e.to 的边赋给它的流
        Q.push(e.to);
        if (e.to == t) return true;
      }
    }
  }
  return false;
}
ll EK(int s, int t) {
  ll flow = 0;
  while (bfs(s, t)) {
    for (int u = t; u != s; u = edges[p[u]].from) {  // 回溯路径
      edges[p[u]].w -= a[t];
      edges[p[u] ^ 1].w += a[t];
    }
    flow += a[t];
  }
  return flow;
}
int main() {
  ios::sync_with_stdio(false);
  cin >> n >> m >> s >> t;
  for (int i = 0; i < m; i++) {
    int u, v;
    ll w;
    cin >> u >> v >> w;
    addEdge(u, v, w);
  }
  cout << EK(s, t) << endl;
  return 0;
}
```

### Dinic 算法

EK 在有些情况中比较低效，我们引入另一个算法：Dinic。

考虑在增广前先对 $G_f$ 做 BFS 分层，即根据结点 $u$ 到源点 $s$ 的距离 $d(u)$ 把结点分成若干层。令经过 $u$ 的流量只能流向下一层的结点 $v$，即删除 $u$ 向层数标号相等或更小的结点的出边，我们称 $G_f$ 剩下的部分为层次图（Level Graph）。形式化地，我们称 $G_L = (V, E_L)$ 是 $G_f = (V, E_f)$ 的层次图，其中 $E_L = \left\{ (u, v) \mid (u, v) \in E_f, d(u) + 1 = d(v) \right\}$。

如果我们在层次图 $G_L$ 上找到一个最大的增广流 $f_b$，使得仅在 $G_L$ 上是不可能找出更大的增广流的，则我们称 $f_b$ 是 $G_L$ 的阻塞流（Blocking Flow）。

定义层次图和阻塞流后，Dinic 算法的流程如下。

1. 在 $G_f$ 上 BFS 出层次图 $G_L$。
2. 在 $G_L$ 上 DFS 出阻塞流 $f_b$。
3. 将 $f_b$ 并到原先的流 $f$ 中，即 $f \leftarrow f + f_b$。
4. 重复以上过程直到不存在从 $s$ 到 $t$ 的路径。

此时的 $f$ 即为最大流。

我们还需要**当前弧优化**。注意到在 $G_L$ 上 DFS 的过程中，如果结点 $u$ 同时具有大量入边和出边，并且 $u$ 每次接受来自入边的流量时都遍历出边表来决定将流量传递给哪条出边，则 $u$ 这个局部的时间复杂度最坏可达 $O(|E|^2)$。事实上，如果我们已经知道边 $(u, v)$ 已经增广到极限（边 $(u, v)$ 已无剩余容量或 $v$ 的后侧已增广至阻塞），则 $u$ 的流量没有必要再尝试流向出边 $(u, v)$。据此，对于每个结点 $u$，我们维护 $u$ 的出边表中第一条还有必要尝试的出边。习惯上，我们称维护的这个指针为当前弧，称这个做法为当前弧优化。

将单轮增广的时间复杂度 $O(nm)$ 与增广轮数 $O(n)$ 相乘，Dinic 算法的时间复杂度是 $O(n^2m)$。

对于 Dinic 算法的复杂度，有如下 $3$ 种情况：

- 一般的网络图：$O(n^2m)$
- 单位容量的图：$O(\min(\sqrt m,n^{\frac{2}{3}})\cdot m)$
- 二分图：$O(m\sqrt n)$

（Dinic 中 DFS 最好要写 vis，因为求费用流一定要）

错误：有一次漏判了 `dep[v] == dep[u] + 1`！玄学：若 `dep` 默认值为 $0$，则一定要 $dep[S]=1$！！！

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int MAXN = 250, MAXM = 5005;
const ll INF = 0x3f3f3f3f;

struct Edge {
  int to, nxt;
  ll cap, flow;
} e[2 * MAXM];
int fir[MAXN];
int n, m, s, t, tot = 1;
int dep[MAXN], cur[MAXN];  // cur 记录当前弧
bool vis[MAXN];
void addEdge(int from, int to, ll w) {
  e[++tot] = {to, fir[from], w, 0};
  fir[from] = tot;
  e[++tot] = {from, fir[to], 0, 0};
  fir[to] = tot;
}
bool bfs(int s, int t) {
  queue<int> Q;
  memset(dep, 0, sizeof dep);
  dep[s] = 1;
  Q.push(s);
  while (!Q.empty()) {
    int x = Q.front();
    Q.pop();
    for (int i = fir[x]; ~i; i = e[i].nxt) {
      int v = e[i].to;
      if (!dep[v] && e[i].cap > e[i].flow) {
        dep[v] = dep[x] + 1;
        Q.push(v);
      }
    }
  }
  return dep[t];
}
ll dfs(int u, int t, ll flow) {
  if (u == t) return flow;
  ll ans = 0;
  vis[u] = 1;
  for (int &i = cur[u]; ~i; i = e[i].nxt) {  // i 用引用：当前弧优化
    int v = e[i].to;
    if (!vis[v] && dep[v] == dep[u] + 1 && e[i].cap > e[i].flow) {
      ll d = dfs(v, t, min(flow - ans, e[i].cap - e[i].flow));
      ans += d;
      e[i].flow += d;
      e[i ^ 1].flow -= d;
      if (ans == flow) break;  // 剪枝，残余流量用尽，停止增广
    }
  }
  vis[u] = 0;
  return ans;
}
ll Dinic(int s, int t) {
  ll ans = 0;
  while (bfs(s, t)) {
    memcpy(cur, fir, sizeof cur);  // 当前弧优化
    ans += dfs(s, t, INF);
  }
  return ans;
}
int main() {
  ios::sync_with_stdio(false);
  cin >> n >> m >> s >> t;
  memset(fir, -1, sizeof fir);
  for (int i = 0; i < m; i++) {
    int u, v;
    ll w;
    cin >> u >> v >> w;
    addEdge(u, v, w);
  }
  cout << Dinic(s, t) << endl;
  return 0;
}
```

## 最小割

### 概念

- 割：对于一个网络流图 $G=(V,E)$，其割的定义为一种 **点的划分方式**：将所有的点划分为 $S$ 和 $T=V-S$ 两个集合，其中源点 $s\in S$，汇点 $t\in T$。
- 割的容量：我们的定义割 $(S,T)$ 的容量 $c(S,T)$ 表示所有从 $S$ 到 $T$ 的边的容量之和，即 $c(S,T)=\sum_{u\in S,v\in T}c(u,v)$。当然我们也可以用 $c(s,t)$ 表示 $c(S,T)$。
- 最小割：最小割就是求得一个割 $(S,T)$ 使得割的容量 $c(S,T)$ 最小。

### 最大流最小割定理

证明：

**定理**：$f(s,t)_{\max}=c(s,t)_{\min}$

对于任意一个可行流 $f(s,t)$ 的割 $(S,T)$，我们可以得到：

$$
f(s,t)=S\text{出边的总流量}-S\text{入边的总流量}\le S\text{出边的总流量}=c(s,t)
$$

如果我们求出了最大流 $f$，那么残余网络中一定不存在 $s$ 到 $t$ 的增广路经，也就是 $S$ 的出边一定是满流，$S$ 的入边一定是零流，于是有：

$$
f(s,t)=S\text{出边的总流量}-S\text{入边的总流量}=S\text{出边的总流量}=c(s,t)
$$

结合前面的不等式，我们可以知道此时 $f$ 已经达到最大。

### 实现

最小割：最大流

方案：我们可以通过从源点 $s$ 开始 DFS，每次走残量大于 $0$ 的边，找到所有 $S$ 点集内的点。

最小割边数量：如果需要在最小割的前提下最小化割边数量，那么先求出最小割，把没有满流的边容量改成 $\infty$，满流的边容量改成 $1$，重新跑一遍最小割就可求出最小割边数量；如果没有最小割的前提，直接把所有边的容量设成 $1$，求一遍最小割就好了。

### 模型一：二者取其一问题

有 $n$ 个物品和两个集合 $A,B$，如果一个物品没有放入 $A$ 集合会花费 $a_i$，没有放入 $B$ 集合会花费 $b_i$；还有若干个形如 $u_i,v_i,w_i$ 限制条件，表示如果 $u_i$ 和 $v_i$ 同时不在一个集合会花费 $w_i$。每个物品必须且只能属于一个集合，求最小的代价。

这是一个经典的 **二者选其一** 的最小割题目。我们对于每个集合设置源点 $s$ 和汇点 $t$，第 $i$ 个点由 $s$ 连一条容量为 $a_i$ 的边、向 $t$ 连一条容量为 $b_i$ 的边。对于限制条件 $u,v,w$，我们在 $u,v$ 之间连容量为 $w$ 的双向边。

注意到当源点和汇点不相连时，代表这些点都选择了其中一个集合。如果将连向 $s$ 或 $t$ 的边割开，表示不放在 $A$ 或 $B$ 集合，如果把物品之间的边割开，表示这两个物品不放在同一个集合。

最小割就是最小花费。

### 模型二：最大权值闭合图

最大权值闭合图，即给定一张有向图，每个点都有一个权值（可以为正或负或 $0$），你需要选择一个权值和最大的子图，使得子图中每个点的后继都在子图中。

做法：建立超级源点 $s$ 和超级汇点 $t$，若节点 $u$ 权值为正，则 $s$ 向 $u$ 连一条有向边，边权即为该点点权；若节点 $u$ 权值为负，则由 $u$ 向 $t$ 连一条有向边，边权即为该点点权的相反数。原图上所有边权改为 $\infty$。跑网络最大流，将所有正权值之和减去最大流，即为答案。

几个小结论来证明：

1. 每一个符合条件的子图都对应流量网络中的一个割。因为每一个割将网络分为两部分，与 $s$ 相连的那部分满足没有边指向另一部分，于是满足上述条件。这个命题是充要的。
2. 最小割所去除的边必须与 $s$ 和 $t$ 其中一者相连。因为否则边权是 $\infty$，不可能成为最小割。
3. 我们所选择的那部分子图，权值和 $=$ 所有正权值之和 $-$ 我们未选择的正权值点的权值之和 $+$ 我们选择的负权值点的权值之和。当我们不选择一个正权值点时，其与 $s$ 的连边会被断开；当我们选择一个负权值点时，其与 $t$ 的连边会被断开。断开的边的边权之和即为割的容量。于是上述式子转化为：权值和 $=$ 所有正权值之和 $-$ 割的容量。
4. 于是得出结论，最大权值和 $=$ 所有正权值之和 $-$ 最小割 $=$ 所有正权值之和 $-$ 最大流。

P2057 [SHOI2007] 善意的投票 / [JLOI2010] 冠军调查
[Title](https://www.luogu.com.cn/problem/solution/P1345)

小M的作物[Title](https://blog.csdn.net/qq_45577430/article/details/105354600)

## 最小费用最大流

### 费用流

给定一个网络 $G=(V,E)$，每条边除了有容量限制 $c(u,v)$，还有一个单位流量的费用 $w(u,v)$。

当 $(u,v)$ 的流量为 $f(u,v)$ 时，需要花费 $f(u,v)\times w(u,v)$ 的费用。

$w$ 也满足斜对称性，即 $w(u,v)=-w(v,u)$。

则该网络中总花费最小的最大流称为 **最小费用最大流**，即在最大化 $\sum_{(s,v)\in E}f(s,v)$ 的前提下最小化 $\sum_{(u,v)\in E}f(u,v)\times w(u,v)$。

### SSP 算法

SSP（Successive Shortest Path）算法是一个贪心的算法。它的思路是每次寻找单位费用最小的增广路进行增广，直到图上不存在增广路为止。

如果图上存在单位费用为负的圈，SSP 算法无法正确求出该网络的最小费用最大流。此时需要先使用消圈算法消去图上的负圈。

时间复杂度：
如果使用 Bellman–Ford 求解最短路，每次找增广路的时间复杂度为 $O(nm)$。设该网络的最大流为 $f$，则最坏时间复杂度为 $O(nmf)$。事实上，SSP 算法是伪多项式时间的。

### 实现

可以在 Dinic 基础上改进，将 BFS 求分层图换为 SPFA（有负权边不能用 Dijkstra）求一条单位费用之和最小的路径，也就是把 $w(u, v)$ 当做边权然后在残量网络上求最短路，在 DFS 中**一定要用 `vis` 数组记录点是否访问过**。这样就可以求得最小费用最大流了。

建反向边时，费用取反即可。

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const int MAXN = 100055, MAXM = 100005;
const int INF = 0x3f3f3f3f;

struct Edge {
  int to, nxt, cap, cost;
} e[2 * MAXM];
int fir[MAXN];
int n, m, s, t, tot = 1;
int dis[MAXN];
bool vis[MAXN];
int cur[MAXN];  // cur 记录当前弧
void addEdge(int from, int to, int w, int cost) {
  e[++tot] = {to, fir[from], w, cost};
  fir[from] = tot;
  e[++tot] = {from, fir[to], 0, -cost};
  fir[to] = tot;
}
bool spfa(int s, int t) {
  memset(dis, 0x3f, sizeof dis);
  queue<int> q;
  q.push(s), dis[s] = 0, vis[s] = 1;
  while (!q.empty()) {
    int f = q.front();
    q.pop();
    vis[f] = 0;
    for (int i = fir[f]; ~i; i = e[i].nxt) {
      int v = e[i].to;
      if (e[i].cap && dis[f] + e[i].cost < dis[v]) {
        dis[v] = dis[f] + e[i].cost;
        if (!vis[v]) {
          vis[v] = 1;
          q.push(v);
        }
      }
    }
  }
  return dis[t] < INF;
}
int dfs(int u, int t, int flow) {
  if (u == t) return flow;
  int ans = 0;
  vis[u] = 1;
  for (int &i = cur[u]; ~i; i = e[i].nxt) {  // i 用引用：当前弧优化
    int v = e[i].to;
    if (!vis[v] && dis[v] == dis[u] + e[i].cost && e[i].cap) {
      int d = dfs(v, t, min(flow - ans, e[i].cap));
      ans += d;
      e[i].cap -= d;
      e[i ^ 1].cap += d;
      // 易错：这里不写 return ans，应为 break，需要执行下面的 vis[u] = 0
      if (ans == flow) break;  // 剪枝，残余流量用尽，停止增广
    }
  }
  vis[u] = 0;
  return ans;
}
pair<int, int> Dinic(int s, int t) {
  int maxFlow = 0, minCost = 0;
  while (spfa(s, t)) {
    memcpy(cur, fir, sizeof cur);  // 当前弧优化
    int x = dfs(s, t, INF);
    maxFlow += x;
    minCost += x * dis[t];
  }
  return make_pair(maxFlow, minCost);
}
int main() {
  cin >> n >> m >> s >> t;
  memset(fir, -1, sizeof fir);
  for (int i = 0; i < m; i++) {
    int u, v, w, c;
    cin >> u >> v >> w >> c;
    addEdge(u, v, w, c);
  }
  pair<int, int> ans = Dinic(s, t);
  cout << ans.first << " " << ans.second << endl;
  return 0;
}
```

## 参考资料

- OI Wiki
- [最大权闭合子图 - kikokiko](https://www.cnblogs.com/kikokiko/p/12996168.html)
- [网络流 - Siyuan](https://blog.siyuanw.cn/archives/Network-Flow-Maximum-Flow/)
- [最详细（也可能现在不是了）网络流建模基础 - ~victorique~](https://www.cnblogs.com/victorique/p/8560656.html)