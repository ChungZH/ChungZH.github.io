---
title: ABC133F Colorful Tree
tags:
- OI
- 算法
- 可持久化线段树
- DFS 序
categories: 题解
date: 2023-04-14
katex: true
---

[F - Colorful Tree](https://atcoder.jp/contests/abc133/tasks/abc133_f)

## 题意

有一个 $N$ 个节点的树，每条边有颜色、边权。

您需要处理 $Q$ 个询问，每个询问给出 $x_i,y_i,u_i,v_i$，您需要求出**假定**所有颜色为 $x_i$ 的边边权全部变成 $y_i$ 后，$u_i$ 和 $v_i$ 之间的距离。**询问之间互相独立**。

## 分析

DFS 序的思想套上主席树，`root[i]` 的权值线段树存从根到 $i$ 结点的每种颜色的边数（$cnt$），以及该颜色的长度和（$sum$）。顺便记录从根到 $i$ 结点的距离。利用差分，$dis(i, j) = dis(root, i)+dis(root, j)-2dis(root, LCA(i, j)$。然后 $i, j$ 的路径中该颜色的长度和也用同样的方法求出。那么答案就是 $dis(i, j) - \text{该颜色的长度和} + \text{该颜色的边数}*y$。


```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 100005, LOGN = 20;
struct edge {
  int to, col, len;
};
vector<edge> g[N];
int n, bn, m, root[N], depth[N], f[N][LOGN], dis[N], sum[25*N], lson[25*N], rson[25*N], tot[25*N], cnt;
void modify(int &rt, int prt, int pos, int val, int l, int r) {
  rt = ++cnt;
  sum[rt] = sum[prt]+val;
  tot[rt] = tot[prt]+1;
  if (l == r) { return; }
  lson[rt] = lson[prt];
  rson[rt] = rson[prt];
  int mid = (l+r)>>1;
  if (pos <= mid)
    modify(lson[rt], lson[prt], pos, val, l, mid);
  else
    modify(rson[rt], rson[prt], pos, val, mid+1, r);
}
int query(int rt, int pos, int y, int l, int r) {
  if (l == r) return y*tot[rt]-sum[rt];
  int mid = (l+r)>>1;
  if (pos > mid) return query(rson[rt], pos, y, mid+1, r);
  else return query(lson[rt], pos, y, l, mid);
}
void dfs(int u, int fa) {
  f[u][0] = fa;
  depth[u] = depth[fa]+1;
  for (int i = 1; i < LOGN; i++)
    f[u][i] = f[f[u][i-1]][i-1];
  for (int i = 0; i < g[u].size(); i++){
    int v = g[u][i].to;
    if (v == fa) continue;
    dis[v] = dis[u]+g[u][i].len;
    modify(root[v], root[u], g[u][i].col, g[u][i].len, 1, n);
    dfs(v, u);
  }
}
int LCA(int u, int v) {
  if (depth[u] > depth[v]) swap(u, v);
  for (int i = LOGN-1; i >= 0; i--)
    if (depth[f[v][i]] >= depth[u])
      v = f[v][i];
  for (int i = LOGN-1; i >= 0; i--) {
    int s = f[u][i], t = f[v][i];
    if (s != t) {
      u = s;
      v = t;
    }
  }
  if (u != v) return f[u][0];
  return u;
}
int main()
{
  cin >> n >> m;
  for (int i = 1; i < n; i++) {
    int a, b, c, d;
    cin >> a >> b >> c >> d;
    g[a].push_back({b, c, d});
    g[b].push_back({a, c, d}); 
  } 
  root[1] = ++cnt;
  dfs(1, 1);
  while (m--) {
    int a, b, c, d;
    cin >> a >> b >> c >> d;
    int lc = LCA(c, d);
    int ans = dis[c]+dis[d]-2*dis[lc];
    ans += query(root[c], a, b, 1, n)+query(root[d], a, b, 1, n)-2*query(root[lc], a, b, 1, n);
    cout << ans << endl;
  }
  return 0;
}
```