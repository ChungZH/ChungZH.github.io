---
title: Segment Tree Beats 吉司机线段树笔记
tags:
- OI
- 算法
- 数据结构
- 线段树
- Segment Tree Beats
categories: 学习笔记
date: 2022-08-18
katex: true
draft: true
---

## 区间最值操作（chmin/chmax）

Segment Tree Beats 的一个重要应用就是处理区间最值操作，例如 chmin：$\forall i \in [l, r], a_i = min(a_i, x)$。chmax 同理。

引出例题：[HDU5306 Gorgeous Sequence](https://acm.hdu.edu.cn/showproblem.php?pid=5306)

> 维护一个序列 $a$：
>
> 1. `0 l r t` $\forall l\le i\le r,\ a_i=\min(a_i,t)$。
> 2. `1 l r` 输出区间 $[l,r]$ 中的最大值。
> 3. `2 l r` 输出区间和。
>
> 多组数据，$T\le 100,n\le 10^6,\sum m\le 10^6$。

对于这个问题，用普通的线段树难以解决。因为 chmin 操作修改的数只有大于 $t$ 的数，而其它则不变，并不是对整个区间做修改。

吉老师线段树的每个结点需要额外维护：最大值 $mx$，次大值 $se$ 和最大值个数 $cnt$。在区间 chmin 时要做以下操作：

1. $t > mx$，显然这一操作是没有意义的，直接返回；
2. $se < t <= mx$，那么这一区间内的最大值需要变小成为 $t$。所以区间和 $sum$ 减去 $(mx-t)\times cnt$，更新 $mx$ 为 $t$，并做标记。
3. $t <= se$，不止有一个值会受到影响，需要递归处理左右子树，最后记得上传信息。

使用势能分析法可以得到复杂度是 $O(m\log n)$。

实现时，需要留心 `pushdown` 和 `pushup` 函数，步骤较多。用 `pushtag` 函数给当前结点加上 tag。

[RECORD](https://vjudge.net/solution/37834417)

```cpp
#include <bits/stdc++.h>
using namespace std;
using LL = long long;
const int MAXN = 1000000, MAXM = 1000000;
int maxx[MAXN << 2], se[MAXN << 2], cnt[MAXN << 2], tag[MAXN << 2];
LL sum[MAXN << 2];
int n, m;
int a[MAXN];
void pushup(int u) { // 维护 u 的信息
  sum[u] = sum[u << 1] + sum[u << 1 | 1];
  if (maxx[u << 1] > maxx[u << 1 | 1]) {
    maxx[u] = maxx[u << 1];
    se[u] = max(maxx[u << 1 | 1], se[u << 1]);
    cnt[u] = cnt[u << 1];
  } else if (maxx[u << 1] < maxx[u << 1 | 1]) {
    maxx[u] = maxx[u << 1 | 1];
    se[u] = max(maxx[u << 1], se[u << 1 | 1]);
    cnt[u] = cnt[u << 1 | 1];
  } else { // ==
    maxx[u] = maxx[u << 1];
    se[u] = max(se[u << 1], se[u << 1 | 1]);
    cnt[u] = cnt[u << 1] + cnt[u << 1 | 1];
  }
}
void pushtag(int u, int x) {  // 给当前点加 tag
  if (maxx[u] <= x) return;
  sum[u] -= (1ll * maxx[u] - x) * cnt[u]; // 更新 sum
  maxx[u] = tag[u] = x; // 更新 maxx、tag
}
void pushdown(int u) { // 下放 tag
  if (tag[u] == -1) return;
  pushtag(u << 1, tag[u]);
  pushtag(u << 1 | 1, tag[u]);
  tag[u] = -1;
}
void build(int u, int l, int r) {
  tag[u] = -1;
  if (l == r) {
    maxx[u] = sum[u] = a[l];
    cnt[u] = 1;
    se[u] = -1; // 次大值初始化为 -1
    return;
  }
  int mid = (l + r) >> 1;
  build(u << 1, l, mid);
  build(u << 1 | 1, mid + 1, r);
  pushup(u);
}
void modify(int u, int l, int r, int x, int y, int t) {
  if (maxx[u] <= t) return;
  if (l >= x && r <= y && se[u] < t) { // 该区间的最大值都变为 t
    pushtag(u, t);
    return;
  }
  pushdown(u);
  int mid = (l + r) >> 1;
  if (x <= mid) modify(u << 1, l, mid, x, y, t);
  if (y > mid) modify(u << 1 | 1, mid + 1, r, x, y, t);
  pushup(u);
}
int querymax(int u, int l, int r, int x, int y) {
  if (l >= x && r <= y) return maxx[u];
  int ans = -1e9;
  pushdown(u);
  int mid = (l + r) >> 1;
  if (x <= mid) ans = max(ans, querymax(u << 1, l, mid, x, y));
  if (y > mid) ans = max(ans, querymax(u << 1 | 1, mid + 1, r, x, y));
  return ans;
}
LL querysum(int u, int l, int r, int x, int y) {
  if (l >= x && r <= y) return sum[u];
  LL ans = 0;
  pushdown(u);
  int mid = (l + r) >> 1;
  if (x <= mid) ans += querysum(u << 1, l, mid, x, y);
  if (y > mid) ans += querysum(u << 1 | 1, mid + 1, r, x, y);
  return ans;
}
int main() {
  //ios::sync_with_stdio(false);
  int t;
  scanf("%d", &t);
  while (t--) {
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    build(1, 1, n);
    while (m--) {
      int op, l, r, t;
      scanf("%d%d%d", &op, &l, &r);
      if (op == 0) {
        scanf("%d", &t);
        modify(1, 1, n, l, r, t);
      } else if (op == 1) {
        printf("%d\n", querymax(1, 1, n, l, r));
      } else {
        printf("%lld\n", querysum(1, 1, n, l, r));
      }
    }
  }
  return 0;
}
```
