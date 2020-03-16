---
title: 栈浅析 - 数据结构笔记
tags: 
    - 编程
    - C++
    - 数据结构
date: 2019/02/23 11:45:00
author: ChungZH
location: Foshan
summary: awsl，太简单了，是栈！
vssue-title: stack-data-structure-note
---

这篇文章简介一下 `栈`。

<!-- More --> <!-- more -->

## 栈的概念

栈（Stack），它是一种运算受限的线性表。其限制是仅允许在表的一端进行插入和删除运算。人们把此端称为栈顶（top），栈顶的第一个元素被称为栈顶元素，相对地，把另一端称为栈底。向一个栈插入新元素又称为进栈或入栈（push），它是把该元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称为出栈或退栈（pop)，它是把栈顶元素删除掉，使其下面的相邻元素成为新的栈顶元素。

通过上面的概念，我们可以知道栈是一种 **后进先出（LIFO Last In First Out）** 的数据结构。



## 栈的定义

```cpp
struct stack {
    int data[101];  // 用来存储数据
    int top;        // 栈顶
};
```



## 栈的实现

首先我们要了解几个栈的基本操作。

### 进栈 push

```cpp
data[++top] = 1;
```

### 出栈 pop

```cpp
top--;
```



现在我们举个栗子，输入 10 个数，然后倒序输出并删除它们。

上代码：

```cpp
#include <iostream>
using namespace std;
struct stack {
    int data[101];  // 用来存储数据
    int top;        // 栈顶
};
int main()
{
	stack s;
	s.top = 0;
	for (int i = 0; i < 10; i++)
	{
		cin >> s.data[++s.top]; 
	}
	
	for (int i = 0; i < 10; i++)
	{
		cout << s.data[s.top--] << " ";
	}
	return 0;
}
```

很简单。

输入：

```
1 2 3 4 5 6 7 8 9 10
```

输出：

```
10 9 8 7 6 5 4 3 2 1
```

<Vssue title="stack-data-structure-note" />