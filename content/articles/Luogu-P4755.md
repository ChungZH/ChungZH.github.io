---
title: Luogu-P4755 Beautiful Pair
tags:
- OI
- 算法
- 数据结构
- 线段树
- 分治
- 主席树
categories: 题解
date: 2023-04-30
katex: true
---

[Luogu-P4755 Beautiful Pair](https://www.luogu.com.cn/problem/P4755)

## 题意

小 D 有个数列 $\{a\}$，当一个数对 $(i,j)$（$i \le j$）满足 $a_i$ 和 $a_j$ 的积不大于 $a_i, a_{i+1}, \ldots, a_j$ 中的最大值时，小 D 认为这个数对是美丽的。请你求出美丽的数对的数量。

$1\le n\le{10}^5$，$1\le a_i\le{10}^9$。

## 编程时的问题

- 对 ST 表不熟悉！
- 更 zz 的是，对 `lower_bound` 和 `upper_bound` 理解有问题，来复习一下**小学**知识：`lower_bound` 是找到“大于等于”的位置，`upper_bound` 是“大于”。写这道题的时候找小于某数的位置莫名其妙地用了 `lower_bound`，更没有 `-1`，完全是随手写的，半天也没察觉到这里有问题。

综上，我是 zz。
	
## 思路

考虑**分治**（据说这是套路），我们找出一个区间 $[l, r]$ 内的最大值位置 $mid$，然后统计所有跨过 $mid$ 的答案，再递归处理 $[l, mid-1], [mid+1, r]$。假设 $mid$ 左边的数是 $a_i$，右边的数是 $a_j$，根据题目得 $a_i * a_j \le a_{mid}$，即 $a_j \le \lfloor\frac{a_{mid}}{a_i}\rfloor$。那么我们枚举 $a_i$，然后用主席树统计右区间内小于 $\lfloor\frac{a_{mid}}{a_i}\rfloor$ 的数的个数。

注意每次要枚举左右区间中长度较小的那个，这样可以做到 $O(n\log^2n)$。否则会被卡成 $O(n^2\log n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 100005, LOGN = 18;
int n, a[N], b[N], bn, f[N][LOGN], logn[N], root[N], cnt;
struct node {
  int sum, ls, rs;
} t[N*25];
void update(int &rt, int pre, int pos, int l, int r) {
  rt = ++cnt;
  t[rt] = t[pre];
  t[rt].sum++;
  if (l == r) return;
  int mid = (l+r)>>1;
  if (pos <= mid) update(t[rt].ls, t[pre].ls, pos, l, mid);
  else update(t[rt].rs, t[pre].rs, pos, mid+1, r);
}
int query(int rt, int pre, int x, int y, int l, int r) {
  if (l >= x && r <= y) return t[rt].sum-t[pre].sum;
  int mid = (l+r)>>1;
  int ret = 0;
  if (x <= mid) ret += query(t[rt].ls, t[pre].ls, x, y, l, mid);
  if (y > mid) ret += query(t[rt].rs, t[pre].rs, x, y, mid+1, r);
  return ret;
}
void buildst() {
  logn[1] = 0;
  logn[2] = 1;
  for (int i = 3; i < N; i++) logn[i] = logn[i/2]+1;
  for (int i = 1; i <= n; i++) f[i][0] = i;
  for (int t = 1; t < LOGN; t++) {
    for (int i = 1; i+(1<<t)-1 <= n; i++) {
      if (a[f[i][t-1]] > a[f[i+(1<<(t-1))][t-1]])
        f[i][t] = f[i][t-1];
      else 
        f[i][t] = f[i+(1<<(t-1))][t-1];
    }
  }
}
int getmax(int l, int r) {
  int t = logn[r-l+1];
  // NOT  f[l+(1<<(t-1))-1][t]
  if (a[f[l][t]] > a[f[r-(1<<t)+1][t]]) return f[l][t];
  return f[r-(1<<t)+1][t];
}
long long ans = 0;
void solve(int l, int r) {
  if (l > r) return;
  if (l == r) { ans += (a[l]==1); return; }
  int mid = getmax(l, r);
  if (mid-l+1 <= r-mid+1) { // 枚举左半区间 
    for (int i = l; i <= mid; i++) {
      // 不能用lowerbound 
      int idx = upper_bound(b+1, b+1+bn, a[mid]/a[i])-b-1;
      if (idx != 0)
        ans += query(root[r], root[mid-1], 1, idx, 1, bn);
    }
  } else {  // 枚举右半区间 
    for (int i = mid; i <= r; i++) {
      int idx = upper_bound(b+1, b+1+bn, a[mid]/a[i])-b-1;
      if (idx != 0)
        ans += query(root[mid], root[l-1], 1, idx, 1, bn);
    }
  }	
  solve(l, mid-1);
  solve(mid+1, r);
}
int main()
{
  ios::sync_with_stdio(false);
  cin >> n;
  for (int i = 1; i <= n; i++)
    cin >> a[i], b[i] = a[i];
  sort(b+1, b+1+n);
  bn = unique(b+1, b+1+n)-b-1;
  root[0] = ++cnt;
  buildst();
  for (int i = 1; i <= n; i++) {
    int id = lower_bound(b+1, b+1+bn, a[i])-b;
    update(root[i], root[i-1], id, 1, bn);
  }
  solve(1, n);
  cout << ans << endl;
  return 0;
}
```