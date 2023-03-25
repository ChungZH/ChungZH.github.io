---
title: 欧拉回路笔记
tags:
- OI
- 算法
- 欧拉回路
- 图论
categories: 学习笔记
date: 2023-03-25
katex: true
---

## 定义

- 欧拉回路：通过图中每条边恰好一次的回路
- 欧拉通路（欧拉路径）：通过图中每条边恰好一次的通路
- 欧拉图：具有欧拉回路的图
- 半欧拉图：具有欧拉通路但不具有欧拉回路的图

## 判定

1. 无向图是欧拉图当且仅当：
    - 非零度顶点是连通的
    - 顶点的度数都是偶数
2. 无向图是半欧拉图当且仅当：
    - 非零度顶点是连通的
    - 恰有 0 或 2 个奇度顶点
3. 有向图是欧拉图当且仅当：
    - 非零度顶点是强连通的
    - 每个顶点的入度和出度相等
4. 有向图是半欧拉图当且仅当：
    - 非零度顶点是弱连通的
    - 至多一个顶点的出度与入度之差为 1
    - 至多一个顶点的入度与出度之差为 1
    - 其他顶点的入度和出度相等

弱连通：将所有有向边替换为无向边后，整张图连通。

## Hierholzer 算法

Hierholzer 算法的具体步骤：遍历当前节点的所有出边，并 DFS 访问相邻顶点，将经过的边删掉。遍历完所有出边后，将 $u$ 加入栈中。最后把栈中的顶点反过来，再输出，就是欧拉回路。

如果要求字典序最小，只需在一开始对每个点的所有出边从小到大排序。这样一来，欧拉回路上从左往右看，每个点的后继都取到了理论最小值。

对于无向图和有向图的欧拉路径，必须从奇点或唯一的出度比入度大 1 的点开始 dfs。

[Luogu-P7771 【模板】欧拉路径](https://www.luogu.com.cn/problem/P7771) 

实现时，要注意一个小细节：用 `hd[x]` 数组记录节点 $x$ 目前删到了哪条边，每次走过一条边时要 `hd[x]++`，然后下次到达这个点时再调用这个值。否则的话，每次到了这个点都要从 0 开始判断这些边是否被删除掉，会超时。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 2e5+5;
int n, m, S, top, sta[N], in[N], hd[N];
vector<int> e[N];
void dfs(int u) {
	for (int &i = hd[u]; i < e[u].size(); ) { // 细节
		dfs(e[u][i++]);
	}
	sta[++top] = u;
}
int main()
{
	cin >> n >> m;
	for (int i = 0; i < m; i++) {
		int u, v;
		cin >> u >> v;
		e[u].push_back(v);
		in[v]++;
	}
	for (int i = 1; i <= n; i++) {
		sort(e[i].begin(), e[i].end());
		if (abs((int)e[i].size()-in[i]) > 1) { puts("No");	return 0; }
		if (e[i].size() > in[i]) { 
			if (S) { puts("No"); return 0; } 
			else S = i; 
		}
	}
	dfs(S ? S : 1);
	if (top != m+1) puts("No");
	else {
		reverse(sta+1, sta+top+1);
		for (int i = 1; i <= top; i++) {
			cout << sta[i] << " ";
		}
	}
	return 0;
 } 
```

## 习题

- [Luogu-P1341 无序字母对](https://www.luogu.com.cn/problem/P1341)：把每个字符当做一个点，把输入的字符串看做两个字符间可以连一条边，最后要求的字符串就是找一笔画，即欧拉回路（路径）。要判断图是否连通。
- [Luogu-P1127 词链](https://www.luogu.com.cn/problem/P1127)：与上一道题类似
- [ABC286G Unique Walk](https://www.luogu.com.cn/problem/AT_abc286_g)：对于非关键边，走多少次都无所谓，可以把非关键边形成的连通块缩成一个点，然后再判欧拉路

## 参考资料

- [初级图论 - qAlex_Weiq - 博客园](https://www.cnblogs.com/alex-wei/p/basic_graph_theory.html)
- [欧拉图 - OI Wiki](https://oi-wiki.org/graph/euler/)
