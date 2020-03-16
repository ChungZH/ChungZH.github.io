---
title: 蛇形矩阵 - 日常刷题
tags: 
- 编程
- C++
- 蛇形矩阵
- 刷题
- 算法
date: 2019/02/23 11:48:00
author: ChungZH
location: Foshan
summary: 🐍蛇形矩阵
vssue-title: snake-matrix-note
---

>  经过九九八十一天的刷题之后，本蒟蒻终于刷到蛇形矩阵了......

<!-- More --> <!-- more -->

本文只讲三种蛇形矩阵。

## 蛇形矩阵1

![](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/CODE/18/SnakeMatrix1.png)

### 分析

很容易看出此题的算法。

看**行数的奇偶**决定是从左往右放数字还是从右往左放。

- 奇数：**从左往右**
- 偶数：**从右往左** 

### 代码

这里先解释一下下面代码一些变量的含义：

- `n`：矩阵的边长
- `num`：输出的结果
- `i`：行   `j`：列

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int main()
{
    int n;
    int t = 1;
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        int num;            	// 如果是练习，使用数组更好。我这里用一个变量是为了过评测系统
        if (i % 2 == 0)
        {
            t+=n-1;				// 倒着放数字
        } 
        for (int j = 1; j <= n; j++)
        {
            if (i % 2 == 0)
            {
                num = t--;
            } else {
                num = t++;
            }
            cout << num << ' ';
        }
        if (i % 2 == 0)
        {
            t+=n+1;
        } 
        cout << endl;
         
    }
    return 0;
}
```

#### 输入

```
5
```

#### 输出

```
1 2 3 4 5
10 9 8 7 6
11 12 13 14 15
20 19 18 17 16
21 22 23 24 25
```

这还是最简单的，我们看看下一个难一点的。

## 蛇形矩阵2

![](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/CODE/18/SnakeMatrix2.png)

### 分析

也是看**行数的奇偶**决定是从左往右放数字还是从右往左放。

**和上一题不同的是**，这里还要控制每行放多少个数。

### 代码

变量说明：

- `line`：行数
- `num`：输出的结果
- `lnu`： 每行数字的个数
- `i`：行   `j`：列

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int line;
    cin >> line;
    int num = 1;
    int lnu = 1;
    for (int i = 1; i <= line; i++)
    {
        if (i % 2 == 0)
        {
            num+=lnu-1;			
        }
        for (int j = 1; j <= lnu; j++)
        {
            if (i % 2 == 1)
            {
                cout << num++ << ' ';
            } else {
                cout << num-- << ' ';
            }
        }
        if (i % 2 == 0) num+=lnu+1;
        lnu++;
        cout << endl;
    }
    return 0;
}
```

#### 输入

```
3 
```

#### 输出

```
1
3 2
4 5 6
```



## 蛇形矩阵3

![](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/CODE/18/SnakeMatrix3.png)

这是一个螺旋形的蛇形矩阵，对于本蒟蒻来说就有点难啦~

一开始我还无从下手，看是看得懂规律，就是不会实现。。

过了几天我还硬逼自己做出来了😂

### 分析

大家都看得出来，这个矩阵是螺旋形的。

所以，我们可以用一个大循环，里面嵌四个小循环，分别是**从左上往右到右上**、**从右上往下到右下**、**从右下往左到左下**、**从左下往上到左上**，就是这样~



### 代码

说明：

- `n`：矩阵边长
- `a`：存储蛇形矩阵的数组
- 请不要问我循环条件是怎么想出来的！！！keso......

```cpp
#include <iostream>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int a[n][n] = {0};
    int val = 1;
    for (int i = 0; i <= n/2; i++)                // 主循环
    {
        for (int j = i; j < n-i; j++)     // 从左上往右到右上
        {
            a[i][j] = val++;
        }


        for (int j = i+1; j < n-i; j++)         // 从右上往下到右下
        {
            a[j][n-i-1] = val++;
        }


        for (int j = n-i-2; j >= i; j--)      // 从右下往左到左下
        {
            a[n-i-1][j] = val++;
        }

    
        for (int j = n-i-2; j > i; j--)       // 从左下往上到左上
        {
            a[j][i] = val++;
        }
    }
    
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << a[i][j] << ' ';
        }
        cout << endl;
    }

    
    return 0;
}
```

#### 输入

```
6
```

#### 输出

```
1 2 3 4 5 6
20 21 22 23 24 7
19 32 33 34 25 8
18 31 36 35 26 9
17 30 29 28 27 10
16 15 14 13 12 11
```

<Vssue tiele="snake-matrix-note" />