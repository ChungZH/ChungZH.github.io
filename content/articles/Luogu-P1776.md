---
title: Luogu-P1776 宝物筛选
tags:
- OI
- 算法
- 数据结构
- DP
- DP 优化
- 单调队列
- 二进制优化
categories: 题解
date: 2022-08-12
katex: true
---

[Luogu-P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776)

## 题意

终于，破解了千年的难题。小 FF 找到了王室的宝物室，里面堆满了无数价值连城的宝物。

这下小 FF 可发财了，嘎嘎。但是这里的宝物实在是太多了，小 FF 的采集车似乎装不下那么多宝物。看来小 FF 只能含泪舍弃其中的一部分宝物了。

小 FF 对洞穴里的宝物进行了整理，他发现每样宝物都有一件或者多件。他粗略估算了下每样宝物的价值，之后开始了宝物筛选工作：小 FF 有一个最大载重为 $W$ 的采集车，洞穴里总共有 $n$ 种宝物，每种宝物的价值为 $v_i$，重量为 $w_i$，每种宝物有 $m_i$ 件。小 FF 希望在采集车不超载的前提下，选择一些宝物装进采集车，使得它们的价值和最大。

对于 $100\%$ 的数据，$n\leq \sum m_i \leq 10^5$，$0\le W\leq 4\times 10^4$，$1\leq n\le 100$。

## 解法 1：二进制优化

每一个数都可以表示成 $2$ 的幂的和（因为每一个数都可以用二进制表示）。

时间复杂度：$O(nW\sum \log m_i)$

```cpp
#include <bits/stdc++.h>
using namespace std;
int dp[40005];
int main()
{
	int n, W;
	scanf("%d%d", &n, &W);
	for (int i = 0; i < n; i++) {
		int t, c, p;
		scanf("%d%d%d", &c, &t, &p);
		int tmp = 1;
		while (p >= tmp) {
			p -= tmp;
			for (int j = W; j >= t*tmp; j--)
				dp[j] = max(dp[j], dp[j-t*tmp]+c*tmp);
			tmp *= 2;
		}
		if (p == 0) continue;
		for (int j = W; j >= t*p; j--) {
			dp[j] = max(dp[j], dp[j-t*p]+c*p);
		}
	}
	printf("%d\n", dp[W]);
	return 0;
} 
```

## 解法 2：单调队列优化

设 $f[i][j]$ 表示前 $i$ 种物品重量不超过 $j$ 的最大价值。显然有一个状态转移方程：

$$
f[i][j] = max_{0<=k<=m[i]}\{f[i-1][j-k\times w[i]]+k\times v[i]\}
$$

我们设 $j=k_1*w[i]+d$：

$$
f[i][j]=max\{f[i-1][(k_1-k)\times w[i]+d]-(k_1-k)\times v[i] \}+ k_1\times v[i]
$$

我们枚举余数 $d$ 和 $k_1$，就可以表示出每一个数，然后维护一个单调队列，这个队列里面的决策通过加上第 $i$ 种物品都可以凑成 $j$，因此增加的数量不能超过 $m[i]$，也就是 $k_1-k <= m[i]$。

时间复杂度：$O(nW)$

[RECORD](https://www.luogu.com.cn/record/83449866)

```cpp
#include <bits/stdc++.h>
using namespace std;
int n, W;
int v[105], w[105], m[105];
int dp[105][40004];
struct deq {
	int head, tail;
	int arr[40004];
	bool empty() { return head+1 == tail; }
	void pop_front() { head++; }
	void pop_back() { tail--; }
	void push_back(int x) { arr[tail] = x; tail++; }
	void clear() { head = 0; tail = 1; }
	int front() { return arr[head+1]; }
	int back() { return arr[tail-1]; }
} dq;
int main()
{
	cin >> n >> W;
	int ans = 0;
	for (int i = 1; i <= n; i++) {
		cin >> v[i] >> w[i] >> m[i];
		if (w[i] == 0) {
			ans += v[i]*m[i];
			continue;
		}
		for (int j = 0; j < w[i]; j++) { // 余数 
			dq.clear();
			// k 实际上表示的是文中的 k_1
			for (int k = 0; j+k*w[i] <= W; k++) {
				// dq.front() 实际上表示的是文中的 k_1 - k
				while (!dq.empty() && k-dq.front() > m[i]) dq.pop_front();
				while (!dq.empty() && dp[i-1][j+dq.back()*w[i]]+(k-dq.back())*v[i] <= dp[i-1][j+k*w[i]]) dq.pop_back();
				dq.push_back(k);
				if (!dq.empty()) dp[i][j+k*w[i]] = max(dp[i][j+k*w[i]], dp[i-1][j+dq.front()*w[i]]+(k-dq.front())*v[i]);
			}
		}
	}
	cout << dp[n][W]+ans << endl;
	return 0;
}
```
