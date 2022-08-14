---
title: Luogu-P2254 「NOI2005」瑰丽华尔兹
tags:
- OI
- 算法
- 数据结构
- DP
- DP 优化
- 单调队列
categories: 题解
date: 2022-08-12
katex: true
draft: true
---

[「NOI2005」瑰丽华尔兹](https://www.luogu.com.cn/problem/P2254)

## 题意

不妨认为舞厅是一个 $N$ 行 $M$ 列的矩阵，矩阵中的某些方格上堆放了一些家具，其他的则是空地。钢琴可以在空地上滑动，但不能撞上家具或滑出舞厅，否则会损坏钢琴和家具，引来难缠的船长。每个时刻，钢琴都会随着船体倾斜的方向向相邻的方格滑动一格，相邻的方格可以是向东、向西、向南或向北的。而艾米丽可以选择施魔法或不施魔法：如果不施魔法，则钢琴会滑动；如果施魔法，则钢琴会原地不动。

艾米丽是个天使，她知道每段时间的船体的倾斜情况。她想使钢琴在舞厅里滑行的路程尽量长，这样 1900 会非常高兴，同时也有利于治疗托尼的晕船。但艾米丽还太小，不会算，所以希望你能帮助她。

$100\%$ 的数据中，$1\leq N$, $M \leq 200$，$K \leq 200$，$T\leq 40000$。

## 分析

[RECORD](https://www.luogu.com.cn/record/83442932)

```cpp
#include <bits/stdc++.h>
using namespace std;
int n, m, x, y, k;
char a[205][205];
int s[205], t[205], d[205];
int dp[205][205][205];
struct deq {
  int head, tail;
  int arr[20005];
  bool empty() { return head + 1 == tail; }
  void pop_front() { head++; }
  void pop_back() { tail--; }
  void push_back(int x) {
    arr[tail] = x;
    tail++;
  }
  void clear() {
    head = 0;
    tail = 1;
  }
  int front() { return arr[head + 1]; }
  int back() { return arr[tail - 1]; }
} q;
int main() {
  cin >> n >> m >> x >> y >> k;
  for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++) cin >> a[i][j];
  memset(dp, -1, sizeof(dp));
  dp[0][x][y] = 0;
  int ans = 1;
  for (int p = 1; p <= k; p++) {
    cin >> s[p] >> t[p] >> d[p];
    int tim = t[p] - s[p] + 1;

    // 下面进行对四个方向的分类讨论
    if (d[p] == 1) {
      for (int j = 1; j <= m; j++) {
        q.clear();

        for (int i = n; i >= 1; i--) {
          if (a[i][j] == 'x') {
            q.clear();
            continue;
          }
          dp[p][i][j] = dp[p - 1][i][j];
          while (!q.empty() && q.front() - i > tim) q.pop_front();
          if (!q.empty()) {
            dp[p][i][j] =
                max(dp[p][i][j], dp[p - 1][q.front()][j] + q.front() - i);
            ans = max(ans, dp[p][i][j]);
          }
          while (!q.empty() &&
                 dp[p - 1][i][j] - dp[p - 1][q.back()][j] >= q.back() - i)
            q.pop_back();
          if (dp[p - 1][i][j] != -1) q.push_back(i);
        }
      }
    } else if (d[p] == 2) {
      for (int j = 1; j <= m; j++) {
        q.clear();

        for (int i = 1; i <= n; i++) {
          if (a[i][j] == 'x') {
            q.clear();
            continue;
          }
          dp[p][i][j] = dp[p - 1][i][j];
          while (!q.empty() && i - q.front() > tim) q.pop_front();
          if (!q.empty()) {
            dp[p][i][j] =
                max(dp[p][i][j], dp[p - 1][q.front()][j] + i - q.front());
            ans = max(ans, dp[p][i][j]);
          }
          while (!q.empty() &&
                 dp[p - 1][i][j] - dp[p - 1][q.back()][j] >= i - q.back())
            q.pop_back();
          if (dp[p - 1][i][j] != -1) q.push_back(i);
        }
      }
    } else if (d[p] == 3) {
      for (int i = 1; i <= n; i++) {
        q.clear();

        for (int j = m; j >= 1; j--) {
          if (a[i][j] == 'x') {
            q.clear();
            continue;
          }
          dp[p][i][j] = dp[p - 1][i][j];
          while (!q.empty() && q.front() - j > tim) q.pop_front();
          if (!q.empty()) {
            dp[p][i][j] =
                max(dp[p][i][j], dp[p - 1][i][q.front()] + q.front() - j);
            ans = max(ans, dp[p][i][j]);
          }
          while (!q.empty() &&
                 dp[p - 1][i][j] - dp[p - 1][i][q.back()] >= q.back() - j)
            q.pop_back();
          if (dp[p - 1][i][j] != -1) q.push_back(j);
        }
      }
    } else {
      for (int i = 1; i <= n; i++) {
        q.clear();

        for (int j = 1; j <= m; j++) {
          if (a[i][j] == 'x') {
            q.clear();
            continue;
          }
          dp[p][i][j] = dp[p - 1][i][j];
          while (!q.empty() && j - q.front() > tim) q.pop_front();
          if (!q.empty()) {
            dp[p][i][j] =
                max(dp[p][i][j], dp[p - 1][i][q.front()] + j - q.front());
            ans = max(ans, dp[p][i][j]);
          }
          while (!q.empty() &&
                 dp[p - 1][i][j] - dp[p - 1][i][q.back()] >= j - q.back())
            q.pop_back();
          if (dp[p - 1][i][j] != -1) q.push_back(j);
        }
      }
    }
  }
  cout << ans << endl;
  return 0;
}
```
