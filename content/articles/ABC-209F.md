---
title: ABC209F Deforestation
tags:
- OI
- 算法
- 插入 DP
categories: 题解
date: 2023-04-28
katex: true
---

[ABC209F Deforestation](https://www.luogu.com.cn/problem/AT_abc209_f)

题意：给出 $n$ 棵树的高度，砍第 $i$ 棵树的花费是 $h_i+h_{i-1}+h_{i+1}$，求有多少种方案能使得砍完所有树的总代价最小。

------

砍一棵树的代价只与相邻的树高度有关。下面研究砍 $h_i$ 与 $h_{i+1}$ 的先后顺序对答案的影响。

1. 先砍 $h_i$ 后砍 $h_{i+1}$：$h_i+h_{i-1}+h_{i+1}+h_{i+1}+h_{i+2}$
2. 先砍 $h_{i+1}$ 后砍 $h_i$：$h_{i+1}+h_i+h_{i+2}+h_i+h_{i-1}$

作差后得到：$h_{i+1}-h_i$。当 $h_{i+1}>h_i$ 时，应该先砍 $h_{i+1}$。当 $h_{i+1}<h_i$ 时，应该先砍 $h_i$。因此，**对于相邻的两棵树，先砍高的那棵最优**。

------

**插入 DP（insertion DP）**：先考虑排好前 $i-1$ 个数，再往中间插入第 $i$ 个数。

令 $\mathit{f}_{i,j}$ 表示排好了前 $i$ 棵树的砍树次序，且第 $i$ 棵树排在第 $j$ 位，得到最小代价的方案数。

当 $h_{i+1} > h_i$ 时，应先砍 $i+1$，那么 $\mathit{f}_{i+1,j} = \sum_{k=j}^{i}\mathit{f}_{i,k}$

当 $h_i > h_{i+1}$ 时，应先砍 $i$，那么 $\mathit{f}_{i+1,j}  = \sum_{k=1}^{j-1}\mathit{f}_{i,k}$

当 $h_i = h_{i+1}$ 时，砍哪棵都可以，$\mathit{f}_{i+1,j}  = \sum_{k=1}^i\mathit{f}_{i,k}$

可以用前缀和优化 DP，$O(n^2)$。

**弱智错误！**：减法忘记加 MOD。

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const LL MOD = 1e9+7;
LL n, h[4005];
LL dp[4005][4005], sum[4005][4005];
int main()
{
  cin >> n;
  for (int i = 1; i <= n; i++) cin >> h[i];
  dp[1][1] = sum[1][1] = 1; 
  for (int i = 2; i <= n; i++) {
    for (int j = 1; j <= i; j++) {
      if (h[i] > h[i-1]) {
        dp[i][j] = (sum[i-1][i-1]-sum[i-1][j-1]+MOD)%MOD;
      } else if (h[i] < h[i-1]) {
        dp[i][j] = (sum[i-1][j-1])%MOD;
      } else {
        dp[i][j] = (sum[i-1][i-1])%MOD;
      }
    sum[i][j] = (sum[i][j-1]+dp[i][j])%MOD;
    }
  }
  LL ans = 0;
  for (int i = 1; i <= n; i++) ans = (ans+dp[n][i])%MOD;
  cout << ans << endl;
  return 0;
}
```

------

Thanks to [ABC 209 F - Deforestation - hzy0227](https://www.cnblogs.com/hzy717zsy/p/16356781.html)
