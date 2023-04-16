---
title: 二分图笔记
tags:
- OI
- 算法
- 二分图
- 匈牙利算法
- 图论
categories: 学习笔记
date: 2023-04-15
katex: true
---

## 定义

在图论中，**二分图**（bipartite graph）是一类特殊的图，又称为二部图、偶图、双分图。二分图的顶点可以分成两个互斥的独立集 $U$ 和 $V$ 的图，使得所有边都是连结一个 $U$ 中的点和一个 $V$ 中的点。

给定一个二分图 $G$，在 $G$ 的一个子图 $M$ 中，$M$ 的边集中的任意两条边都没有共同的端点，则称 $M$ 是一个**匹配**。

**最小点覆盖**：选最少的点，满足每条边至少有一个端点被选。

**交错路**始于非匹配点且由匹配边与非匹配边交错而成。

**增广路**是始于非匹配点且终于非匹配点的交错路。

## 特性

- 二分图中不存在奇环
  
  因为每一条边都是从一个集合走到另一个集合，只有走偶数次才可能回到同一个集合。

- König 定理：一个图是二分图当且仅当它的**最小顶点覆盖的顶点数**等于**最大匹配的边数**

  首先，最小点集覆盖一定 >= 最大匹配，因为假设最大匹配为 $n$，那么我们就得到了 $n$ 条互不相邻的边，光覆盖这些边就要用到 $n$ 个点。现在我们来思考为什么最小点击覆盖一定 <= 最大匹配。任何一种 $n$ 个点的最小点击覆盖，一定可以转化成一个 $n$ 的最大匹配。因为最小点集覆盖中的每个点都能找到至少一条只有一个端点在点集中的边（如果找不到则说明该点所有的边的另外一个端点都被覆盖，所以该点则没必要被覆盖，和它在最小点集覆盖中相矛盾），只要每个端点都选择一个这样的边，就必然能转化为一个匹配数与点集覆盖的点数相等的匹配方案。所以最大匹配至少为最小点集覆盖数，即最小点击覆盖一定 <= 最大匹配。综上，二者相等。

## 二分图判定

染色法：用 $1,2$ 两种颜色标记图中的节点，与一个节点相邻的所有节点的颜色必须和它不同，若标记过程中出现冲突，说明图中存在奇环。使用 DFS 实现。$O(N+M)$。

[CF687A NP-Hard Problem](https://www.luogu.com.cn/problem/CF687A) 二分图判定裸题。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 100005;
int n, m;
vector<int> e[N];
int c[N], cnt[3]; 
bool flag = true;
void dfs(int u, int col) {
	c[u] = col;
	for (int i = 0; i < e[u].size(); i++) {
		int v = e[u][i];
		if (c[v] == 0) {
			dfs(v, 3-col);        // 1 <=> 2
		} else if (c[v] == col) { // 出现冲突
			flag = 0;
		}
	}
}
int main()
{
	cin >> n >> m;
	for (int i = 0; i < m; i++) {
		int u, v;
		cin >> u >> v;
		e[u].push_back(v);
		e[v].push_back(u);
	}
	for (int i = 1; i <= n; i++) {
		flag = true;
		if (!c[i]) {
			dfs(i, 1);
		}
        if (!flag) {
            cout << "-1\n";
            return 0;
        }
	}
	vector<int> ans;
	for (int i = 1; i <= n; i++)
		if (c[i] == 1) ans.push_back(i);
	cout << ans.size() << endl;
	for (int i = 0; i < ans.size(); i++) cout << ans[i] << ' ';
	cout << endl;
	ans.clear();
	for (int i = 1; i <= n; i++)
		if (c[i] == 2) ans.push_back(i);
	cout << ans.size() << endl;
	for (int i = 0; i < ans.size(); i++) cout << ans[i] << ' ';
	cout << endl;
	
	return 0;
}
```

## 二分图最大匹配（Hungarian 算法）

运用了贪心的思想。

整体思想：将匹配边集 $M$ 置为空，寻找一条增广路径 $P$，$P$ 上的边取反得到一个更大的匹配 $M’$ 重复上一步直到找不到增广路径为止。$O(NM)$。

**具体步骤**：

依次考虑每个左部未匹配点，寻找一个右部点与之匹配。一个右部点能与之匹配，需要满足以下两个条件之一：

1. 该点是未匹配点：此时直接把两个点进行匹配。（`mat[i] == 0`）
2. 从与该节点匹配的左部点出发，可以找到另一个右部点与之匹配。此时递归进入该左部点，为其寻找匹配的右部点。（`dfs(mat[v]) == 1`）

利用访问标记（`use[]`）避免重复搜索。记得**每次 dfs 之前要清空 `use` 数组**！

[UOJ #78. 二分图最大匹配](https://uoj.ac/problem/78)

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1005, V = 500005;
int n, m, e, ans, outp[N];
int to[V], head[N], nxt[V], tot; 
bool use[N];
int mat[N];
void add(int x, int y) {
	to[++tot] = y;
	nxt[tot] = head[x];
	head[x] = tot;
}
bool dfs(int u) {
	for (int i = head[u]; i; i = nxt[i]) {
		int v = to[i];
		if (use[v] == 0) {
			use[v] = 1;
			if (mat[v] == 0 || dfs(mat[v])) {
				mat[v] = u;
				return true;
			}
		}
	}
	return false;
}
int main()
{
	cin >> n >> m >> e;
	for (int i = 0; i < e; i++) {
		int u, v;
		cin >> u >> v;
		add(u, v);
	}
	for (int i = 1; i <= n; i++) {
		memset(use, 0, sizeof use); // 记得清空 use
		if (dfs(i)) ans++;  // 从左部点 i 出发找增广路
	}
	cout << ans << endl;
	for (int i = 1; i <= m; i++) {
		outp[mat[i]] = i;
	}
	for (int i = 1; i <= n; i++) {
		cout << outp[i] << ' ';
	}
	return 0;
}
```

## 二分图最大权匹配

好复杂，不会。

## 参考资料

- [二分图匹配 - 菜MKのblog - 洛谷博客](https://www.luogu.com.cn/blog/195331/solution-p3386)
- [二分图 - Wikipedia](https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%88%86%E5%9B%BE)
- [二分图 - OI Wiki](https://oi-wiki.org/graph/bi-graph/)
- [简单理解增广路与匈牙利算法 - 朴楞蛾子](https://zhuanlan.zhihu.com/p/208596378) 理解增广路
- [匈牙利算法（二分图）](https://www.cnblogs.com/shenben/p/5573788.html) 证明 König 定理
- 图论 - 李煜东.pptx