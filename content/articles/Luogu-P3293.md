---
title: Luogu-P3293 「SCOI2016」美味
tags:
- OI
- 算法
- 数据结构
- 贪心
- 线段树
- 主席树
- 可持久化
categories: 题解
date: 2022-08-13 21:02
katex: true
draft: true
---

## 题意

一家餐厅有 $n$ 道菜，编号 $1,2,...,n$ ，大家对第 $i$ 道菜的评价值为 $a_i$。有 $m$ 位顾客，第 $i$ 位顾客的期望值为 $b_i$，而他的偏好值为 $x_i$。因此，第 $i$ 位顾客认为第 $j$ 道菜的美味度为 $b_i \ xor \ (a_j+x_i)$， $xor$ 表示异或运算。

第 $i$ 位顾客希望从这些菜中挑出他认为最美味的菜，即美味值最大的菜，但由于价格等因素，他只能从第 $l_i$ 道到第 $r_i$ 道中选择。请你帮助他们找出最美味的菜。

对于 $100\%$ 的数据，满足 $1 \le n \le 2 \times 10^5$ ， $0 \le a_i,b_i,x_i < 10^5$ ， $1 \le l_i \le r_i \le n$（ $1 \le i \le m$）， $1 \le m \le 10^5$。

## 分析

[RECORD](https://www.luogu.com.cn/record/83676747)

```cpp
#include <bits/stdc++.h>
using namespace std;
const int MAXN = 200005, MAXM = 100005;
int n, m, q;
int a[MAXN], b[MAXN];
int rt[MAXN << 5], lc[MAXN << 5], rc[MAXN << 5], sm[MAXN << 5], tot = 0;
void build(int& rt, int l, int r) {
  rt = ++tot;
  if (l == r) return;
  int m = (l + r) >> 1;
  build(lc[rt], l, m);
  build(rc[rt], m + 1, r);
}
void update(int& rt, int pre, int l, int r, int q) {
  rt = ++tot;
  lc[rt] = lc[pre];
  rc[rt] = rc[pre];
  sm[rt] = sm[pre] + 1;
  if (l == r) return;
  int m = (l + r) >> 1;
  if (q <= m)
    update(lc[rt], lc[pre], l, m, q);
  else
    update(rc[rt], rc[pre], m + 1, r, q);
}
bool query(int rt, int pre, int l, int r, int ql, int qr) {
  int x = sm[rt] - sm[pre];
  if (x < 1) return 0;
  if (l >= ql && r <= qr) return 1;
  int m = (l + r) >> 1;
  bool ret = 0;
  if (ql <= m) ret |= query(lc[rt], lc[pre], l, m, ql, qr);
  if (qr > m) ret |= query(rc[rt], rc[pre], m + 1, r, ql, qr);
  return ret;
}
int main() {
  scanf("%d%d", &n, &m);
  // 注意 0 <= a[i], b[i], x[i] < 1e5
  build(rt[0], 0, MAXM);
  for (int i = 1; i <= n; i++) {
    scanf("%d", &a[i]);
    update(rt[i], rt[i - 1], 0, MAXM, a[i]);
  }

  while (m--) {
    int b, x, l, r;
    scanf("%d%d%d%d", &b, &x, &l, &r);
    int ans = 0;
    for (int i = 17; i >= 0; i--) {
      int tmp = 1 << i, L, R, opt;
      if (b & tmp) {  // 倒数第 i 位为 1
        // 这一位的 ans 尽量为 0
        L = ans;
        R = ans + (1 << i) - 1;
        opt = 0;
      } else {
        L = ans + (1 << i);
        R = ans + (1 << (i + 1)) - 1;
        opt = 1;
      }
      if (!query(rt[r], rt[l - 1], 0, MAXM, max(L - x, 0), min(R - x, MAXM)))
        opt ^= 1;
      ans += opt << i;
    }
    printf("%d\n", ans ^ b);
  }
  return 0;
}
```
