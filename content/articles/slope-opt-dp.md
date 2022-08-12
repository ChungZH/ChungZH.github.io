---
title: 斜率优化 DP 笔记
tags:
- OI
- 算法
- 数据结构
- DP
- DP 优化
- 斜率优化
categories: 学习笔记
date: 2022-08-12
draft: true
---

## 例题 [HNOI2008]玩具装箱

[Luogu](https://www.luogu.com.cn/problem/P3195) [LOJ](https://loj.ac/p/10188)

### 题目描述

P 教授要去看奥运，但是他舍不下他的玩具，于是他决定把所有的玩具运到北京。他使用自己的压缩器进行压缩，其可以将任意物品变成一堆，再放到一种特殊的一维容器中。

P 教授有编号为 $1 \cdots n$ 的 $n$ 件玩具，第 $i$ 件玩具经过压缩后的一维长度为 $C_i$。

为了方便整理，P 教授要求：

- 在一个一维容器中的玩具编号是连续的。

- 同时如果一个一维容器中有多个玩具，那么两件玩具之间要加入一个单位长度的填充物。形式地说，如果将第 $i$ 件玩具到第 $j$ 个玩具放到一个容器中，那么容器的长度将为 $x=j-i+\sum\limits_{k=i}^{j}C_k$。

制作容器的费用与容器的长度有关，根据教授研究，如果容器长度为 $x$，其制作费用为 $(x-L)^2$。其中 $L$ 是一个常量。P 教授不关心容器的数目，他可以制作出任意长度的容器，甚至超过 $L$。但他希望所有容器的总费用最小。

$1 \leq n \leq 5 \times 10^4$，$1 \leq L \leq 10^7$，$1 \leq C_i \leq 10^7$。

### 朴素 DP 做法

令状态 $f(i)$ 表示把前 $i$ 个玩具装箱的最小费用，$s(i)$ 为 $c_i$ 的前缀和。

假如将玩具 $j$ 到 $i$ 装在同一箱子，容易列出状态转移方程 $f(i) = \min_{1\le j\le i}\{f(j-1)+(i-j+s(i)-s(j-1)-L)^2\}$。

直接算的话时间复杂度是 $O(n^2)$，超时。

### 优化

在计算过程中，$i, s(i), L$ 这些项是已知的，而含有 $j$ 的项如 $f(j-1), j, s(j-1)$ 都是未知的。展开平方式，进行参数分离，定义 $g(i) = i+s(i)-L$，$x(j) = j+s(j-1)$。可选决策 $j$ 的费用记为 $f(i)_j$，则有 

$$
f(i)_j = f(j-1)+(g(i)-x(j))^2 = f(j-1) + g(i)^2 - 2 \times g(i) \times x(j) + x(j)^2
$$

式子中 $f(j-1), g(i)^2, x(j)^2$ 这三项中 $i$ 与 $j$ 这两个参数完全分离，但 $2 \times g(i) \times x(j)$ 却没有分离，不像普通单调队列优化的题目那样 「$j_2 > j_1, f(i)_{j_{2}} < f(i)_{j_{1}}$，$j_1$ 就可以删除」这么明显的单调性，需要深入分析。

**研究 $j_2 > j_1$ 时 $f(i)_{j_{2}} < f(i)_{j_{1}}$ 即「决策 $j_2$ 优于 决策 $j_1$」的前提条件**：

$$
f(j_2-1) + g(i)^2 - 2 \times g(i) \times x(j_2) + x(j_2)^2 < f(j_1-1) + g(i)^2 - 2 \times g(i) \times x(j_1) + x(j_1)^2
\\
(f(j_2-1) + x(j_2)^2) - (f(j_1-1) + x(j_1)^2) < 2 \times g(i) \times (x(j_2) - x(j_1))
$$

再令 $y(i) = f(i-1)+x(i)^2$，因 $x(i) = i+s(i-1)$ 是单调递增的，所以 $x(j_2)-x(j_1) > 0$，所以有

$$
\frac{y(j_2) - y(j_1)}{x(j_2)-x(j_1)} < 2 \times g(i)
$$

上面式子像 $j_1, j_2$ 两个点形成的斜率，于是用 **斜率优化**。

**斜率优化**：计算 $f(i)$ 时，可选决策 $j_2 > j_1$，如果 $j_2$ 比 $j_1$ 优，令 $T(j_1, j_2) = \frac{y(j_2)-y(j_1)}{x(j_2)-x(j_1)}$，则必须满足 $T(j_1, j_2) < 2 \times g(i)$。

该题 $x(i), g(i)$ 都是单调上升的。下面有两个重要结论：

1. 计算 $f(i)$ 时，所有可选决策是 $1, \cdots, i$，可以删除其中的冗余决策，使得队列中从小到大依次存储有价值的可选决策 $j_1, j_2, \cdots, j_k$，使得这些相邻决策之间的斜率都要大于 $2 \times g(i)$。即： $T(j_1, j_2) > 2 \times g(i), T(j_2, j_3) > 2 \times g(i), \cdots, T(j_{k-1}, j_k) > 2 \times g(i)$。最优决策是队首元素 $j_1$。

    证明：如果队列中相邻两个决策 $x, y$ 之间的斜率 $T(x, y) < 2 \times g(i)$，由于 $g(i)$ 是单调增的，则对于后面的 $i_1(i_1 > i)$，计算 $f(i_1)$ 时，有：$T(x, y) < 2 \times g(i) < 2 \times g(i_1)$，所以 $y$ 永远比 $x$ 优，$x$ 可以删除。所以 $T(j_1, j_2) > 2 \times g(i), T(j_2, j_3) > 2 \times g(i), \cdots, T(j_{k-1}, j_k) > 2 \times g(i)$。则对于 $f(i)$ 来说，$j_1$ 比 $j_2$ 优，$j_2$ 比 $j_3$ 优，...，$j_{k-1}$ 比 $j_k$ 优，所以**队首 $j_1$ 是最优的**。并且在 $f(i+1)$ 时可以在之前维护的队列基础上加入新的决策 $i+1$，再继续维护。

2. 可以维护相邻决策之间的斜率单调增。

    证明：设队列中三个相邻决策 $j_1, j_2, j_3$，假设出现相邻斜率单调递减的情况，即 $T(j_1, j_2) > T(j_2, j_3)$，分析 $j_2$ 有没有可能在计算 $f$ 的过程中成为最优决策。

    $$
    j_2 比 j_1 优 \Rightarrow T(j_1, j_2) < 2 \times g(i)
    \\
    j_2 比 j_3 优 \Rightarrow T(j_2, j_3) > 2 \times g(i)
    \\
    T(j_1, j_2) < 2 \times g(i) < T(j_2, j_3)
    $$

    矛盾。所以 $j_2$ 不可能成为最优决策，可以删除。得证。

综上：

1. 应该维护队列中相邻决策满足：$2 \times g(i) < T(j_1, j_2) < T(j_2, j_3) < \cdots < T(j_{k-1}, j_k)$。
2. 最优决策取队首元素。

**程序实现**：

1. **删尾**：要插入新的可选决策 $i$，每次选队列最后两个决策 $j_{k-1}, j_k$，如果 $T(j_{k-1}, j_k) > T(j_k, i)$，则删除队尾元素 $j_k$。循环做下去，直到队列中的元素个数小于 $2$ 或者 $T(j_{k-1}, j_k)<T(j_k, i)$；
2. **插入**：把新的可选决策 $i$ 加入队尾；
3. **删头**：取队首两个决策 $j_1, j_2$，如果 $T(j_1, j_2) < 2 \times g(i)$，则删除队首元素 $j_1$。如此循环下去，直到队列中元素个数小于 $2$ 或者 $T(j_1, j_2) > 2 \times g(i)$；
4. **取头**：最优决策在队首。

时间复杂度是 $O(n)$。

[RECORD](https://www.luogu.com.cn/record/83528457)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define LL long long
int n, L;
LL s[50050], dp[50050];
int head, tail, Q[50050];
LL x(int i) { return i+s[i-1]; }
LL y(int i) { return dp[i-1]+x(i)*x(i); }
LL g(int i) { return i+s[i]-L; }
double T(int i, int j) {
	return (y(j)-y(i))/(x(j)-x(i)); 
}
LL cost(int i, int j) {
	return abs((j-i+s[j]-s[i-1]-L)*(j-i+s[j]-s[i-1]-L));
}
int main()
{
	cin >> n >> L;
	for (int i = 1; i <= n; i++) {
		cin >> s[i];
		s[i] += s[i-1];
	}
	head = 1;
	tail = 0;
	for (int i = 1; i <= n; i++) {
		while (head <= tail-1 && T(Q[tail-1], Q[tail]) > T(Q[tail], i)) tail--;
		Q[++tail] = i;
		while (head <= tail-1 && T(Q[head], Q[head+1]) < 2*g(i)) head++;
		dp[i] = dp[Q[head]-1]+cost(Q[head], i);
	}
	cout << dp[n] << endl;
	return 0;
}
```

## 例题
