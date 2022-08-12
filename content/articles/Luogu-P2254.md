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
	bool empty() { return head+1 == tail; }
	void pop_front() { head++; }
	void pop_back() { tail--; }
	void push_back(int x) { arr[tail] = x; tail++; }
	void clear() { head = 0; tail = 1; }
	int front() { return arr[head+1]; }
	int back() { return arr[tail-1]; }
} q;
int main()
{
	cin >> n >> m >> x >> y >> k;
	for (int i = 1; i <= n; i++)
		for (int j = 1; j <= m; j++)
			cin >> a[i][j];
	memset(dp, -1, sizeof(dp));
	dp[0][x][y] = 0;
	int ans = 1;
	for (int p = 1; p <= k; p++) {
		cin >> s[p] >> t[p] >> d[p];
		int tim = t[p]-s[p]+1;
    
    // 下面进行对四个方向的分类讨论
		if (d[p] == 1) { 
			for (int j = 1; j <= m; j++) {
				q.clear();
				
				for (int i = n; i >= 1; i--) {
					if (a[i][j] == 'x') {
						q.clear();
						continue;
					}
					dp[p][i][j] = dp[p-1][i][j];
					while (!q.empty() && q.front()-i > tim) q.pop_front();
					if (!q.empty()) {
						dp[p][i][j] = max(dp[p][i][j], dp[p-1][q.front()][j]+q.front()-i);
						ans = max(ans, dp[p][i][j]);
					}
					while (!q.empty() && dp[p-1][i][j]-dp[p-1][q.back()][j]>=q.back()-i) q.pop_back();
					if (dp[p-1][i][j] != -1) q.push_back(i);
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
					dp[p][i][j] = dp[p-1][i][j];
					while (!q.empty() && i-q.front() > tim) q.pop_front();
					if (!q.empty()) {
						dp[p][i][j] = max(dp[p][i][j], dp[p-1][q.front()][j]+i-q.front());
						ans = max(ans, dp[p][i][j]);
					}
					while (!q.empty() && dp[p-1][i][j]-dp[p-1][q.back()][j]>=i-q.back()) q.pop_back();
					if (dp[p-1][i][j] != -1) q.push_back(i);
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
					dp[p][i][j] = dp[p-1][i][j];
					while (!q.empty() && q.front()-j > tim) q.pop_front();
					if (!q.empty()) {
						dp[p][i][j] = max(dp[p][i][j], dp[p-1][i][q.front()]+q.front()-j);
						ans = max(ans, dp[p][i][j]);
					}
					while (!q.empty() && dp[p-1][i][j]-dp[p-1][i][q.back()]>=q.back()-j) q.pop_back();
					if (dp[p-1][i][j] != -1) q.push_back(j);
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
					dp[p][i][j] = dp[p-1][i][j];
					while (!q.empty() && j-q.front() > tim) q.pop_front();
					if (!q.empty()) {
						dp[p][i][j] = max(dp[p][i][j], dp[p-1][i][q.front()]+j-q.front());
						ans = max(ans, dp[p][i][j]);
					}
					while (!q.empty() && dp[p-1][i][j]-dp[p-1][i][q.back()]>=j-q.back()) q.pop_back();
					if (dp[p-1][i][j] != -1) q.push_back(j);
				}
			}
		}
	}
	cout << ans << endl;
	return 0;
}
```
