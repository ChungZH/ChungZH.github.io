---
title: 可持久化线段树笔记
tags:
- OI
- 算法
- 数据结构
- 线段树
- 可持久化
- 可持久化线段树
- 权值线段树
categories: 学习笔记
date: 2021-08-14
author: ChungZH
katex: true
draft: true
---

## 动态开点线段树

常规写法的线段树只能维护不算很长的数组，由于空间不够，对于 $10^9$ 级别的数组却不能很好地维护。所以，我们要用到动态开点线段树。

核心思想：**节点只有在有需要的时候才被创建**。

比如说，要求在一个长度为 $n < 10^9$ 的数组上实现区间求和、单点修改的操作，初始数组元素值均为 0。

那么，我们一开始只创建一个根结点，接下来遵循动态开点的核心思想进行操作。

比如下面这张图的例子，我们依次修改 1, 2, 8 三个结点，途中创建了必要的结点。而在图中没有显示的空结点并没有被创建，视为 0，这样就节省了空间。

![dynamic](https://cdn.luogu.com.cn/upload/image_hosting/qn9gtw1o.png)

那么对于区间修改时，会有 `pushdown()` 操作，可能会修改一个不存在的结点。这时有两个解决方案：

1. 在 `pushdown()` 时，如果缺少孩子，就直接创建一个新的孩子就可以了。
2. 使用 **标记永久化** 技巧（李超线段树），让结点不再进行 `pushdown()`，进一步节省了空间。

**复杂度分析**：单次操作的时间复杂度是不变的，为 $O(\log n)$。对于空间复杂度，由于每次操作都有可能创建并访问**全新的一系列结点**，因此 $m$ 次操作的空间复杂度是 $O(m\log n)$，不再是原本线段树的 $O(n)$。

**代码实现**：

```cpp
int n, cnt, root, tree[N]; // cnt 表示当前结点个数
int a[N], ls[N], rs[N];
void upd(int &rt, int l, int r, int val, int f) { // 注意这里传入一个引用，可以修改 ls 或 rs 数组
    if (!rt) rt = ++cnt; // 当结点为空时，创建一个新的
    if (l == r) { tree[rt] += f; return ; } // 修改叶子
    int m = (l+r) >> 1;
    if (val <= m) upd(ls[rt], l, m, val, f);
    else upd(rs[rt], m+1, r, val, f);
    tree[rt] = tree[ls[rt]] + tree[rs[rt]];
}
int query(int rt, int l, int r, int L, int R) {
    if (!rt) return 0; // 如果结点为空，返回 0
    if (l >= L && r <= R) return tree[rt];
    int m = (l+r) >> 1, ans = 0;
    if (L <= m) ans = query(ls[rt], l, m, L, R);
    else ans = query(rs[rt], m+1, r, L, R);
    return ans;
}
```

## 可持久化线段树

可持久化线段树，就是可以存储历史信息的线段树。

比如我们对数组进行了 n 次修改，然后突然希望回到第 i 个版本，然后又基于这个版本进行一些新的修改等，就是可持久化线段树需要解决的问题。

### 例题

[Luogu-P3919 【模板】可持久化线段树 1（可持久化数组）](https://www.luogu.com.cn/problem/P3919)

如题，你需要维护这样的一个长度为 $ N $ 的数组，支持如下几种操作

1. 在某个历史版本上修改某一个位置上的值
2. 访问某个历史版本上的某一位置的值

此外，每进行一次操作（**对于操作2，即为生成一个完全一样的版本，不作任何改动**），就会生成一个新的版本。版本编号即为当前操作的编号（从1开始编号，版本0表示初始状态数组）

$ 1 \leq N, M \leq {10}^6, 1 \leq {loc}_i \leq N, 0 \leq v_i < i, -{10}^9 \leq a_i, {value}_i  \leq {10}^9$

**程序实现**：

为了保险，线段树数组的大小应设为 `n << 5`。[洛谷上关于此的讨论](https://www.luogu.com.cn/discuss/354067)。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int MAXN = 1000006;
int n, m;
int a[MAXN];
int rt[MAXN<<5], lc[MAXN<<5], rc[MAXN<<5], sm[MAXN<<5], ver = 0, tot = 0;
void build(int& rt, int l, int r) {
    rt = ++tot;
    if (l == r) {
        sm[rt] = a[l];
        return ;
    }
    int m = (l+r)>>1;
    build(lc[rt], l, m);
    build(rc[rt], m+1, r);
}
void update(int &rt, int pre, int l, int r, int q, int v) {
    rt = ++tot;
    lc[rt] = lc[pre]; rc[rt] = rc[pre]; sm[rt] = sm[pre]; // 复制原结点的信息，之后按需修改
    if (l == r) {
        sm[rt] = v;
        return ;
    }
    int m = (l+r)>>1;
    if (q <= m) update(lc[rt], lc[pre], l, m, q, v); // 新建左子结点，但是右子结点不变
    else update(rc[rt], rc[pre], m+1, r, q, v);      // 反之
}
int query(int rt, int l, int r, int q) {
    if (l == r) return sm[rt];
    int m = (l+r)>>1;
    if (q <= m) return query(lc[rt], l, m, q);
    return query(rc[rt], m+1, r, q);
}
int main()
{
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    build(rt[0], 1, n);
    while (m--) {
        int v, opt, loc, val;
        cin >> v >> opt >> loc;
        if (opt == 1) {
            cin >> val;
            update(rt[++ver], rt[v], 1, n, loc, val);
        } else {
            cout << query(rt[v], 1, n, loc) << endl;
            rt[++ver] = rt[v];
        }
    }
    return 0;
}
```

## 权值线段树

普通的线段树维护的是区间内最值或总和，而权值线段树每个结点维护的是在一个区间内某个数出现的次数。因此，可以把权值线段树看作一个桶。

一个常见的应用是把权值线段树用于查询区间第 $K$ 大的值。

## 可持久化权值线段树（主席树）

> 主席树名称来源于其发明人黄嘉泰的姓名的首字母缩写 HJT。

## 参考资料

- [算法学习笔记(49): 线段树的拓展 - Pecco](https://zhuanlan.zhihu.com/p/246255556)
- [算法学习笔记(50): 可持久化线段树 - Pecco](https://zhuanlan.zhihu.com/p/250565583)
- [数据结构 线段树--权值线段树 详解 - HeartFireY](https://blog.csdn.net/yanweiqi1754989931/article/details/117380913)
