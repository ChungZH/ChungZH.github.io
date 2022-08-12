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
draft: true
---

## 解法 1：二进制优化

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
			for (int k = 0; j+k*w[i] <= W; k++) {
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
