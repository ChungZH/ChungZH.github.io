---
title: 队列浅析 - 数据结构笔记
tags: 
    - 编程
    - C++
    - 数据结构
date: 2019-02-23 11:44:00
author: ChungZH
location: Foshan
summary: awsl，太简单了，是队列！
vssue-title: queue-data-structure-note
---

本文讲解一个基本的数据结构：`队列`。

<!-- More --> <!-- more -->

## 队列的概念

队列是一种特殊的线性结构。它只允许在队列的头部(head)进行删除操作，即“出队”。只能在尾部(tail)进行插入操作，即“入队”。当队列中没有元素时（即 head == tail），称为空队列。在我们的日常生活中，有很多情况都符合队列的特性。如：买票时，每个卖票的窗口就是一个队列。在这个队列中，新来的人总是在队列的最后面，早来的人就在前面，也越早能买到票。我们可以把这种情况称为“先进先出(First In First Out, FIFO)”原则。

## 队列的定义

```cpp
struct queue {
    int data[101];  // 队列的主体，用来存储数据 
    int head;       // 队头
    int tail;       // 队尾
};
```

上面的代码定义了一个结构体类型，我们可以将它放在 main 函数的外面。

**注意：struct 结构体的定义末尾有一个分号**

## 队列的实现

我们先举一个例子，让大家理解队列。

键盘输入十个数，把这些数放进队列里。然后把这个序列从左到右边输出边删除这些数。

这里需要用到“入队”和“出队”两个操作。我们先来学习一下这两个操作的逻辑。

首先，我们要把 head 和 tail 变量初始化成 0。

入队：
```cpp
// 添加 1 到队尾
data[tail] = 1;
tail++;
```

出队：

```cpp
// 将队头出队
head++;
```

下面开始实现。

```cpp
#include <iostream>
using namespace std;
struct queue {
    int data[101];  // 队列的主体，用来存储数据 
    int head;       // 队头
    int tail;       // 队尾
};
int main()
{
	queue q;
	q.head = 0; q.tail = 0;      // 初始化为0
	for (int i = 0; i < 10; i++)
	{
		cin >> q.data[q.tail];   // 入队
		q.tail++;
	}
	while (q.head < q.tail)
	{
		cout << q.data[q.head++] << " ";  // 出队
	}
	cout << endl;
	return 0;
}
```

代码很简单。

输入：

```
1 2 3 4 5 6 7 8 9 10
```

输出：

```
1 2 3 4 5 6 7 8 9 10
```

其实 C++ 的 STL 库中已经有了队列的实现。。

<Vssue title="queue-data-structure-note" />