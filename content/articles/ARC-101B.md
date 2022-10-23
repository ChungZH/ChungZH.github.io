---
title: [ARC101B] Median of Medians - 中位数
tags:
- OI
- 算法
- 中位数
- 二分
categories: 题解
date: 2022-10-23
katex: true
---

[D - Median of Medians](https://atcoder.jp/contests/arc101/tasks/arc101_b)

## 题意

给定一个整数序列 $a[1],a[2],....a[n]$，那么对于 $a$ 序列的任意一个连续子序列 $a[L],a[L+1],......a[R]$，其中 $1<=L<=R<=n$, 求出该连续子序列的中位数，记为 $b[L][R]$。

显然 $b$ 数组共有 $n*(n+1)/2$ 个整数。

输出 $b$ 数组的中位数。

## 分析

关于中位数有一个 Trick：

- 我们二分一个数 $mid$，对于原序列中 $\ge mid$ 的数，我们标记为 $1$；反之，对于 $< mid$ 的数，我们标记为 $−1$。
- 标记结束后，如果一个区间内的标记和大于等于 $0$，说明中位数大于等于 $mid$，那么向右二分；反之向左。

------

对于本题，我们对 $b$ 数组二分它的中位数 $mid$，并按 $mid$ 对 $a$ 数组进行 $+1,-1$ 标记。然后问题就变为了：统计有多少个区间的标记和 $\ge 0$。

记这个区间数为 $cnt$，若 $cnt\ge \lfloor \frac{n(n+1)/2+1}{2} \rfloor$，说明 $b$ 数组实际中位数 $\ge mid$，向右二分。否则向左二分。

怎么求有多少个区间的标记和 $\ge 0$ 呢？我们可以做一个前缀和 $s$，统计 $i < j$ 且 $s[i] \le s[j]$ 的个数。这是一个二维偏序问题，可以搭配树状数组解决。

$O(nlog^2n)$。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define ll long long
int n;
int a[100005], b[100005], t[100005], s[100005], tree[200005];
int lowbit(int x) { return x&(-x); }
void add(int x) {
	while (x <= 2*n+1) {
		tree[x]++;
		x += lowbit(x);
	}
}
ll query(int x) {
	ll s = 0;
	while (x) {
		s += tree[x];
		x -= lowbit(x);
	}
	return s;
}
int read(){
	int s = 0, f = 1;
	char c = getchar();
	while (!isdigit(c)) {
		if (c == '-') f = -1;
		c = getchar();
	}
	while (isdigit(c)) {
		s = s*10+c-'0';
		c = getchar();
	}
	return s*f;
}
bool check(int x) {
	ll cnt = 0;
	for (int i = 1; i <= n; i++) {
		t[i] = a[i]>=x ? -1 : 1;
		s[i] = s[i-1]+t[i];
	}
	memset(tree, 0, sizeof tree);
	add(n+1);
	for (int i = 1; i <= n; i++) {
		cnt += query(s[i]+n);
		add(s[i]+n+1); 
	}
	return cnt >= (ll)n*(n+1)/4+1;
}
int main()
{
	n = read();
	for (int i = 1; i <= n; i++) a[i] = b[i] = read();
	sort(b+1, b+1+n);
	int L = 0, R = n+1;
	while (L + 1 < R) {
		int M = (L+R)>>1;
		if (check(b[M])) {
			R = M;
		} else {
			L = M;
		}
	}
	cout << b[L] << endl;
	return 0;
} 
```

---

- https://img.atcoder.jp/arc101/editorial.pdf
- https://www.luogu.com.cn/blog/DZN2004/atcoder-shang-di-yi-suo-ti
- https://zuytong.blog.luogu.org/post-20221012-d#

> @ 2022/10/15 SM 模拟赛。