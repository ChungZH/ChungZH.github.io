---
title: 2020 DL 信息学冬令营游记
tags:
- 游记
- 信息学
date: 2020/01/20 16:03:00
vssue-title: 2020DLwintercamp
---

## Detail

- 时间：2020/1/16 至 2020/1/20，共计 5 日。

- 地点：石门实验学校（太平新校区）

- 老师：czf、lzl

## Day 1

新校区还是蛮气派的。

竟然搞了一个开幕式，大佬 卢yq 上台讲话，还见到了金培星老师 %%%。

然后还拍了一张大合照。

不得不说老师还是很厉害的。

### 早上

讲了镇赛的 T5 和 T6，茅塞顿开。

[PDF link](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/oi/2020dlwc/2019%E5%B9%B4%E5%A4%A7%E6%B2%A5%E9%95%87%E5%B0%8F%E5%AD%A6%E7%94%B2%E7%BB%84%E4%BF%A1%E6%81%AF%E5%AD%A6%E8%AF%95%E9%A2%98.pdf)

```cpp
// DLOI T5 魔术数组 
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;

    int a[n][n];
    for (int i = 0; i < n; i++)    cin >> a[0][i];
    for (int i = 0; i < n; i++) cin >> a[i][i];

    if (n == 1)
    {
        cout << a[0][0] << endl;
        return 0;
    }

    // 前一行与后一行的所有数之间都有公差 
    int cha;
    for (int i = 1; i < n; i++)
    {
        cha = a[i-1][i]-a[i][i];
        for (int j = 0; j < n; j++)
            a[i][j] = a[i-1][j] - cha;
    }

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
            cout << a[i][j] << ' ';
        cout << '\n';
    }
    return 0;
}
```

```cpp
// DLOI T6 三角形个数
// OnlineJudge: [Mr.Huang OJ] http://111.230.62.117/problem.php?id=1905 
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;

    long long cnt = 0;
    for (int i = 0; i < n; i++)
    {
        long long l;
        cin >> l;
        if (l > 0) cnt++;  // 负数不算 
    }

    // 排列
    // 只要是正数都可组成三角形
    // 求 从 n 个整数中取出 3 个数，有多少种排列方案

    long long ans = cnt*(cnt-1)*(cnt-2)/6;
    cout << ans << endl;
    return 0;
} 
```

然后去吃了一顿丰盛但不美味的午餐，感觉不值 ￥20。。。

### 下午

STL 专题开始。

讲了 vector，基本上都会。

清空 vector 还是第一次见，方法：

```cpp
vector<int>().swap(v);  //清空v,并释放空间;  惯用法。
```

## Day 2

主要考 `set` `map` `queue` 的应用，思考难度不是非常大。

### 早上

STL 专题之 set、map。

![](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/oi/2020dlwc/ranking-setmap.png)

NO.2 ~

### 下午

![](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/oi/2020dlwc/ranking-queue.png)

STL 专题之 queue。

NO.1！

~~应 rank 4 要求，顺带截了他的图。。~~

## Day 3

二分。

战况惨烈，不截图了。。

以后还要恶补一下二分。

## Day 4

宽搜。

![](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/oi/2020dlwc/ranking-bfs.png)

## Day 5

### 早上

结营考。

rank 7。

不太理想

### 下午

结营。

获得优秀营员称号。

## 总结

先放一张朋友看到我结营照片时的点评。

![](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/oi/2020dlwc/comment.jpg)

这几天过得很充实，也很累，学到了很多知识。

近几天教育部也发了一个「强基计划」，对我们信息竞赛生影响很大。

但，我还是会坚持下去的。

------

ChungZH

2020 - 1 - 20 @ 广东 - 佛山

#EOF

<Vssue title="2020DLwintercamp" />