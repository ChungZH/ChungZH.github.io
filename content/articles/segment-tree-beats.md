---
title: Segment Tree Beats 吉司机线段树笔记
tags:
- OI
- 算法
- 数据结构
- 线段树
- Segment Tree Beats
categories: 学习笔记
date: 2022-08-18
katex: true
draft: true
---

## 区间最值操作（chmin/chmax）

Segment Tree Beats 的一个重要应用就是处理区间最值操作，例如 chmin：$\forall i \in [l, r], a_i = min(a_i, x)$。chmax 同理。

引出例题：[HDU5306 Gorgeous Sequence](https://acm.hdu.edu.cn/showproblem.php?pid=5306)

> 维护一个序列 $a$：
>
> 1. `0 l r t` $\forall l\le i\le r,\ a_i=\min(a_i,t)$。
> 2. `1 l r` 输出区间 $[l,r]$ 中的最大值。
> 3. `2 l r` 输出区间和。
>
> 多组数据，$T\le 100,n\le 10^6,\sum m\le 10^6$。

对于这个问题，用普通的线段树难以解决。因为 chmin 操作修改的数只有大于 $t$ 的数，而其它则不变，并不是对整个区间做修改。

吉老师线段树的每个结点需要额外维护：最大值 $mx$，次大值 $se$ 和最大值个数 $cnt$。在区间 chmin 时要做以下操作：

1. $t > mx$，显然这一操作是没有意义的，直接返回；
2. $se < t <= mx$，那么这一区间内的最大值需要变小成为 $t$。所以区间和 $sum$ 减去 $(mx-t)\times cnt$，更新 $mx$ 为 $t$，并做标记。
3. $t <= se$，不止有一个值会受到影响，需要递归处理左右子树，最后记得上传信息。

使用势能分析法可以得到复杂度是 $O(m\log n)$。
