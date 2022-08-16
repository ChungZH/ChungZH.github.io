---
title: 李超线段树笔记
tags:
- OI
- 算法
- 数据结构
- 线段树
- 李超线段树
categories: 学习笔记
date: 2022-08-16
katex: true
draft: true
---

## 线段树之标记永久化

普通的线段树在做区间修改时依赖懒标记（lazy tag），当我们从一个点向下访问时，需要将标记 pushdown。能否避免如此多的 pushdown 操作呢？这时需要用到**标记永久化**技巧。

我们要做的就是将 lazy tag **永久地留在**当前的结点，这时子树中的所有结点都不会被这个 tag 所影响。因此，子树中询问的最大值 = 实际最大值 - tag。当我们想得到正确答案时，只要将子树返回的最大值加上当前 tag 即可。

标记永久化存在局限性，需要满足**不同的修改操作可以交换顺序，或者说对答案的贡献是独立的**这一条件。

举个例子：**区间设置+区间加法**，先设置后加和先加后设置的结果是不一样的，因此不能交换顺序。如果使用标记永久化，就可能改变了这个顺序。

1. 比如我们先设置后加，并且令设置的区间比加的区间大，因此加的 tag 在下方，设置的 tag 在上方。
2. 根据前面的方法，我们会从下往上取 tag，也就是先加法，再设置。
3. 这时我们发现，由于上层是一个设置操作，下面的所有答案最终都变成了设置的那个数字，下层操作就失效了。显然有问题。

**总结**：标记永久化就是不再下放标记，而是让标记永久地停留在当前结点上。在统计答案时再考虑标记的影响。

**复杂度分析**：由于标记不会下放，但如果有两个标记落在了一个结点上，我们不会分别存储这两个标记，而是加起来合成一个标记（$(+2) + (+3) = (+5)$）。因此，**每个结点最多只有一个标记**。询问时最多考虑 $\log n$ 个标记，复杂度和普通线段树相同 $O(\log n)$。

**程序实现**：

```cpp
int up(int p) { tree[p].mx = max(tree[p<<1].mx, tree[p<<1|1].mx)+tree[p].tag; }
int query(int p, int l, int r, int x, int y) {
  if (l >= x && r <= y) return tree[p].mx;
  int mid = (l + r) / 2, ans = -INF;
  if (x <= mid) ans = max(ans, query(p << 1, l, mid, x, y));
  if (y > mid) ans = max(ans, query(p << 1 | 1, mid + 1, r, x, y));
  return ans+tree[p].tag;
}
void update(int cur, int l, int r, int x, int y, int c) {
  if (l >= x && r <= y) {
    tree[cur].tag += c;
    tree[cur].mx += c;
    return;
  }
  int mid = (l + r) / 2;
  if (x <= mid) update(cur << 1, l, mid, x, y, c);
  if (y > mid) update(cur << 1 | 1, mid + 1, r, x, y, c);
  up(cur);
}
```

## 李超线段树

**例题**：[Luogu-4097 [HEOI2013]Segment](https://www.luogu.com.cn/problem/P4097)
要求在平面直角坐标系下维护两个操作（强制在线）：
    
1. 在平面上加入一条线段。记第 $i$ 条被插入的线段的标号为 $i$，该线段的两个端点分别为 $(x_0,y_0)$，$(x_1,y_1)$。
2. 给定一个数 $k$，询问与直线 $x = k$ 相交的线段中，交点纵坐标最大的线段的编号（若有多条线段与查询直线的交点纵坐标都是最大的，则输出编号最小的线段）。特别地，若不存在线段与给定直线相交，输出 $0$。
    
操作总数 $1 \leq n \leq 10^5$，$1 \leq k, x_0, x_1 \leq 39989$，$1 \leq y_0, y_1 \leq 10^9$。

------

将问题转化成以下的操作：

- 加入一个一次函数，定义域为 $[l,r]$；
- 给定 $k$，求定义域包含 $k$ 的所有一次函数中，在 $x=k$ 处取值最大的那个，如果有多个函数取值相同，选编号最小的。

**注意**：当线段垂直于 $y$ 轴时，如果按照一般的式子计算，会出现除以零的情况。假设线段两端点分别为 $(x,y_0)$ 和 $(x,y_1)$，$y_0<y_1$，则插入定义域为 $[x,x]$ 的一次函数 $f(x)=0\cdot x+y_1$。

------

[RECORD](https://www.luogu.com.cn/record/84062455)

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1000005;
const int MOD1 = 39989;
const int MOD2 = 1000000000;
const double EPS = 1e-12;
struct line {
  double k, b;
  int l, r;
  int id;
} tree[N << 2];
int n;
double calc(line a, int x) {  // 计算纵坐标
  return x * a.k + a.b;
}
int cross(line a, line b) {  // 求两条线段交点横坐标
  // a.k*x +a.b = b.k*x+b.b
  return floor((a.b - b.b) / (b.k - a.k));
}
/* 坑！！！
注意 cmp 的写法，以下是错误的：
int cmp(double a, double b) {
  if (a-b > EPS) return 1;
  if (a-b < EPS) return -1;
  return 0;
}
*/
int cmp(double a, double b) {
  if (a - b > EPS) return 1;
  if (b - a > EPS) return -1;
  return 0;
}
void build(int rt, int l, int r) {
  tree[rt] = {0, 0, 1, 40000, 0};
  if (l == r) return;
  int m = (l + r) >> 1;
  build(rt << 1, l, m);
  build(rt << 1 | 1, m + 1, r);
}
void modify(int root, int l, int r, line k) {
  if (l >= k.l && r <= k.r) {
    // 1. 新线段完全覆盖了之前记录的线段
    if (cmp(calc(k, l), calc(tree[root], l)) == 1 &&
        cmp(calc(k, r), calc(tree[root], r)) == 1) {
      tree[root] = k;
      // 2. 两个线段在区间内有交点
    } else if (l <= cross(tree[root], k) && cross(tree[root], k) <= r) {
      int m = (l + r) >> 1;
      // 与中点交点更高的线段作为 [l, r] 当前优势线段
      if (cmp(calc(tree[root], m), calc(k, m)) == -1) { swap(tree[root], k); }
      
      /* 这是判断往左还是往右递归的错误方法：两条线段的交点横坐标大于 m 还是小于 m
      Hack：假如两条线段交点横坐标等于 m 怎么办？？？
      if (cmp(m, cross(tree[root], k)) == 1)
        modify(root << 1, l, m, k);
      else
        modify(root << 1 | 1, m + 1, r, k);
      */
      // 正确方法：判断两条线段与 x=l, x=r 的交点，找到 k 线段较高的一端进行递归
      if (cmp(calc(k, l), calc(tree[root], l)) == 1)
        modify(root << 1, l, m, k);
      else
        modify(root << 1 | 1, m + 1, r, k);
    }
  } else {
    int m = (l + r) >> 1;
    if (k.l <= m) modify(root << 1, l, m, k);
    if (k.r > m) modify(root << 1 | 1, m + 1, r, k);
  }
}
pair<double, int> pmax(pair<double, int> x,
                       pair<double, int> y) { // 注意题目要求下标尽量小
  if (cmp(x.first, y.first) == -1)
    return y;
  else if (cmp(x.first, y.first) == 1)
    return x;
  else
    return x.second < y.second ? x : y;
}

pair<double, int> query(int root, int l, int r, int x) {
  if (l == r) 
    return {calc(tree[root], x), tree[root].id};
  
  int m = (l + r) >> 1;
  pair<double, int> ans = {calc(tree[root], x), tree[root].id};
  if (x <= m)
    ans = pmax(ans, query(root << 1, l, m, x));
  else
    ans = pmax(ans, query(root << 1 | 1, m + 1, r, x));
  return ans;
}
int main() {
  ios::sync_with_stdio(false);
  cin >> n;
  build(1, 1, 40000);
  int lastans = 0;
  int segi = 0;
  while (n--) {
    int op;
    cin >> op;
    if (op == 0) {
      int k;
      cin >> k;
      k = (k + lastans - 1 + MOD1) % MOD1 + 1;
      lastans = query(1, 1, 40000, k).second;
      cout << lastans << endl;
    } else {
      int a, b, x, y;
      cin >> a >> b >> x >> y;
      a = (a + lastans - 1 + MOD1) % MOD1 + 1;
      b = (b + lastans - 1 + MOD2) % MOD2 + 1;
      x = (x + lastans - 1 + MOD1) % MOD1 + 1;
      y = (y + lastans - 1 + MOD2) % MOD2 + 1;
      if (a > x) {
        swap(a, x);
        swap(b, y);
      }
      line t;
      if (a == x) { // 垂直于 y 的函数的特殊处理
        t.k = 0;
        t.b = max(b, y);
      } else {
        t.k = (double)(y - b) / (x - a);
        t.b = b - t.k * a;
      }
      t.l = a;
      t.r = x;
      t.id = ++segi;
      modify(1, 1, 40000, t);
    }
  }
  return 0;
}
```

## 习题

- [Luogu-P4254 [JSOI2008]Blue Mary 开公司](https://www.luogu.com.cn/problem/P4254) 本题给出的是直线，比例题更简单

## 参考资料

- [李超线段树 - OI Wiki](https://oi-wiki.org/ds/li-chao-tree/) [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
