---
title: 可持久化线段树笔记
tags:
- OI
- 算法
- 数据结构
- 线段树
- 可持久化
- 可持久化线段树
categories: 学习笔记
date: 2021-08-14
author: ChungZH
katex: true
draft: true
---

可持久化线段树，就是可以存储历史信息的线段树。

## 动态开点线段树

在学习可持久化线段树之前，先了解一下动态开点线段树。

## 可持久化线段树

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
    lc[rt] = lc[pre]; rc[rt] = rc[pre]; sm[rt] = sm[pre];
    if (l == r) {
        sm[rt] = v;
        return ;
    }
    int m = (l+r)>>1;
    if (q <= m) update(lc[rt], lc[pre], l, m, q, v);
    else update(rc[rt], rc[pre], m+1, r, q, v);
}
int query(int rt, int l, int r, int q) {
    if (l == r) return sm[rt];
    int m = (l+r)>>1;
    if (q <= m) return query(lc[rt], l, m, q);
    return query(rc[rt], m+1, r, q);
}
int main()
{
    ios::sync_with_stdio(false);
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
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
