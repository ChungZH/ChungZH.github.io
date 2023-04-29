---
title: CDQ 分治笔记
tags:
- OI
- 算法
- 分治
- CDQ 分治
categories: 学习笔记
date: 2023-04-28
katex: true
---

## 基本思想

CDQ 分治的基本思想十分简单。如下：

1. 我们要解决一系列问题，这些问题一般包含修改和查询操作，可以把这些问题排成一个序列，用一个区间 $[L,R]$ 表示。
2. 分。递归处理左边区间 $[L,M]$ 和右边区间 $[M+1,R]$ 的问题。
3. 治。合并两个子问题，同时考虑到 $[L,M]$ 内的修改对 $[M+1,R]$ 内的查询产生的影响。即，用左边的子问题帮助解决右边的子问题。

这就是 CDQ 分治的基本思想。和普通分治不同的地方在于，普通分治在合并两个子问题的过程中，$[L,M]$ 内的问题不会对 $[M+1,R]$ 内的问题产生影响。

## 前置知识：二维偏序

给定 $N$ 个有序对 $(a,b)$，求对于每个 $(a,b)$，满足 $a2<a$ 且 $b2<b$ 的有序对 $(a2,b2)$ 有多少个。

可以将归并排序求逆序对的思路套用过来，这题实际上就是求顺序对。首先根据 $a$ 的大小排序，然后归并排序 $b$，这样就可以忽略 $a$ 元素的影响，因为左边区间的元素的 $a$ 一定小于右边元素的 $a$。归并排序时，每次从右边区间的有序序列取一个元素，然后求左边区间多少个元素比它小即可。

更浅显的解法是，用树状数组代替 CDQ 分治。这里就不赘述。

放个求逆序对的代码：

```cpp
void mergesort(int l, int r) {
  if (l >= r) return ;
  int mid = (l+r)/2;
  mergesort(l, mid);
  mergesort(mid+1, r);
  int lp = l, rp = mid+1;
  int i = l;
  while (lp <= mid && rp <= r) {
    if (a[lp] > a[rp]) {
      ans += mid-lp+1;
      b[i++] = a[rp++];
    } else {
      b[i++] = a[lp++];
    }
  }
  while (lp <= mid) b[i++] = a[lp++];
  while (rp <= r) b[i++] = a[rp++];
  for (int i = l; i <= r; i++)
    a[i] = b[i];
}
```

## 例题

### 一：三维偏序

[Luogu-P3810 【模板】三维偏序（陌上花开）](https://www.luogu.com.cn/problem/P3810)

给定 $N$ 个有序三元组 $(a,b,c)$，求对于每个三元组 $(a,b,c)$，有多少个三元组$(a2,b2,c2)$ 满足$a2<a$ 且 $b2<b$ 且 $c2<c$。

同样地，我们要保证前两维的顺序，才可以计算出答案。

先按 $a$ 进行排序，然后在归并过程中按 $b$ 排序，但是此时不能像求逆序对一样利用下标轻松地统计个数了。

怎么办呢？我们可以维护 $c$ 的树状数组。如果 $b2 \le b$，那么 $c2$ 就可以对以后的 $b$ 产生贡献了，把 $c2$ 加入树状数组。统计时查询树状数组中 $c$ 的前缀和即可。

时间复杂度：$T(n)=O(n\log k)+T(\frac 2 n)=O(n\log n\log k)$

有一些细节问题：

- 每次处理完后，树状数组清零**不要用 `memset`**，否则会超时。要一个一个减去。
- 可能有完全相同的元素。本来它们相互之间都有贡献，可是 CDQ 的过程中只有左边的能贡献右边的。所以需要进行去重处理。

```cpp
#include <bits/stdc++.h>
using namespace std;
struct node {
  int a, b, c;
  int cnt, ans;
} a[100005], b[100005];
bool cmp1(node a, node b) {
  if (a.a != b.a) return a.a < b.a;
  if (a.b != b.b) return a.b < b.b;
  return a.c < b.c;
}
bool cmp2(node a, node b) {
  if (a.b != b.b) return a.b < b.b;
  return a.c < b.c;
}
int n, k, m;
int tree[200005], ans[200005];
int lowbit(int x) { return x&(-x); }
int query(int x) {
  int ret = 0;
  while (x) {
    ret += tree[x];
    x -= lowbit(x);
  }
  return ret;
}
void add(int x, int y) {
  while (x <= k) {
    tree[x] += y;
    x += lowbit(x);
  }
}
void cdq(int l, int r) {
  if (l == r) return;
  int mid = (l+r)>>1;
  cdq(l, mid);
  cdq(mid+1, r);
  sort(b+l, b+mid+1, cmp2);
  sort(b+mid+1, b+r+1, cmp2);
  int p = l, q = mid+1;
  while (q <= r) {
    while (p <= mid && b[p].b <= b[q].b) {
      add(b[p].c, b[p].cnt);
      p++;
    }
    b[q].ans += query(b[q].c);
    q++;
  }
  for (int i = l; i < p; i++) add(b[i].c, -b[i].cnt);// 拒绝 memset！
}
int main()
{
  cin >> n >> k;
  for (int i = 1; i <= n; i++) cin >> a[i].a >> a[i].b >> a[i].c;
  sort(a+1, a+1+n, cmp1);
  for (int i = 1; i <= n; i++) {
    int j = i;
    while (a[j+1].a == a[i].a && a[j+1].b == a[i].b && a[j+1].c == a[i].c) j++;
    b[++m] = a[i];
    b[m].cnt = j-i+1;
    i = j;
  }
  cdq(1, m);
  for (int i = 1; i <= m; i++)
    ans[b[i].ans+b[i].cnt-1] += b[i].cnt;
  for (int i = 0; i < n; i++) cout << ans[i] << endl;
  return 0;
}
```

### 二：天使玩偶/SJY 摆棋子

[Luogu-P4169 Violet 天使玩偶/SJY 摆棋子](https://www.luogu.com.cn/problem/P4169)

要算的 $dist(A,B)=|A_x-B_x|+|A_y-B_y|$ 有绝对值，为了简化问题，可以把原来的询问分成四个，分别计算在 $(x,y)$ 的左下、左上、右下、右上方向上距离最近的点有多远，再去最小值即为答案。

以左下方向为例，化简后得到 $(x+y)-\max(x_i+y_i)$，若扫描到一个点 $(x_i, y_i)$，则在树状数组中把 $y_i$ 位置上的值与 $x_i+y_i$ 取最大值，扫描到询问时，则求 $[0, y_i]$ 上的最大值 $val$，该询问（左下方向）的答案就是 $x+y-val$。简言之，套 CDQ，按照 $x$ 进行排序，然后树状数组处理 $y$。

对于另外三个方向，可以进行翻转后转换成左下方向。记所有点最大的 $x$ 或 $y$ 为 $maxxy$，例如将右上方向翻到左下方向时，坐标变成 $(maxxy-x, maxxy-y)$。为了避免出现 $0$ 使树状数组爆炸，可以将所有 $x$ 和 $y$ 值 $+1$，$maxxy$ 也要 $+1$。

要在 CDQ 过程中对 $x$ 进行归并排序，`sort` 太慢。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 3000005;
struct node {
	int type, x, y, id, ans;
} a[N], b[N], tmp[N];
int n, m, maxxy;
int tree[N];
int lowbit(int x) { return x&(-x); }
int query(int x) {
	int ret = 0;
	while (x) {
		ret = max(ret, tree[x]);
		x -= lowbit(x);
	}
	return ret ? ret : -1e9;
}
void upd(int x, int y) {
	while (x <= maxxy) {
		tree[x] = max(y, tree[x]);
		x += lowbit(x);
	}
}
void clear(int x) {
	while (x <= maxxy) {
		tree[x] = 0;
		x += lowbit(x);
	}
}
void cdq(int l, int r) {
	if (l == r) return;
	int mid = (l+r)>>1;
	cdq(l, mid);
	cdq(mid+1, r);
	int p = l, q = mid+1, t = l;
	while (q <= r) {
		while (p <= mid && b[p].x <= b[q].x) {
			if (b[p].type == 1)
				upd(b[p].y, b[p].x+b[p].y);
			tmp[t++] = b[p++];
		}
		if (b[q].type == 2)
			a[b[q].id].ans = min(a[b[q].id].ans, b[q].x+b[q].y-query(b[q].y));
		tmp[t++] = b[q++];
	}
	for (int i = l; i < p; i++) if (b[i].type == 1) clear(b[i].y);
	while (p <= mid) tmp[t++] = b[p++];
	for (int i = l; i <= r; i++) b[i] = tmp[i];
}
int main()
{
	cin >> n >> m;
	for (int i = 1; i <= n; i++) {
		cin >> a[i].x >> a[i].y;
		a[i].x++;
		a[i].y++;
		a[i].type = 1;
		a[i].id = i;
		maxxy = max(maxxy, max(a[i].x, a[i].y));
	}
	for (int i = n+1; i <= n+m; i++) {
		cin >> a[i].type >> a[i].x >> a[i].y;
		a[i].x++;
		a[i].y++;
		a[i].id = i;
		a[i].ans = 1e9;
		maxxy = max(maxxy, max(a[i].x, a[i].y));
	}
	maxxy++;
	
	for (int i = 1; i <= n+m; i++) b[i] = a[i];
	cdq(1, n+m);
	for (int i = 1; i <= n+m; i++) {
		b[i] = a[i];
		b[i].x = maxxy-a[i].x;
		b[i].y = maxxy-a[i].y;
	}
	cdq(1, n+m);
	for (int i = 1; i <= n+m; i++) {
		b[i] = a[i];
		b[i].x = maxxy-a[i].x;
	}
	cdq(1, n+m);
	for (int i = 1; i <= n+m; i++) {
		b[i] = a[i];
		b[i].y = maxxy-a[i].y;
	}
	cdq(1, n+m);
	
	for (int i = n+1; i <= n+m; i++)
		if (a[i].type == 2) cout << a[i].ans << endl;

	return 0;
}
```

### 三：动态逆序对

[Luogu-P3157 [CQOI2011]动态逆序对](https://www.luogu.com.cn/problem/P3157)

可以求出初始逆序对，然后每次求出降低的逆序对个数即可。

对于每一个被删的数，它对逆序对个数的影响可分为两类：

- 在它前面，权值比它大，删除时间比它晚的点个数
- 在它后面，权值比它小，删除时间比它晚的点个数

这样就可以转化为三维偏序了。

## 参考资料

- [【教程】简易CDQ分治教程&学习笔记 - mlystdcall - 博客园 (cnblogs.com)](https://www.cnblogs.com/mlystdcall/p/6219421.html)
- [CDQ分治总结（CDQ，树状数组，归并排序） - Flash_Hu - 博客园 (cnblogs.com)](https://www.cnblogs.com/flashhu/p/9381075.html)
