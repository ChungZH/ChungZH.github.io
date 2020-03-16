---
title: 单链表浅析 - 数据结构笔记
tags: 
    - 编程
    - C++
    - 数据结构
date: 2019/02/23 11:46:00
author: ChungZH
location: Foshan
summary: awsl，太难了，是链表！
vssue-title: linklist-data-structure-note
---

`单链表` 简单解析。

<!-- More --> <!-- more -->

## 单链表概念

链表是使用 `链式存储结构` 的一种数据结构。`链式存储结构` 存储密度比顺序存储结构小，是一种物理存储单元上非连续、非顺序的存储结构。相较于 `顺序表` ，有 `存储的元素个数不受限制` 、 `插入和删除元素时，不用移动其他元素` 等优点。链表有 `单链表` 、 `双向链表` 、还有 `循环链表` 。对于链表中的 `数据元素` 来说，除了存储其本身的信息之外，还需要存储一个指示其后继（也可以是前继）结点的地址。这两个部分组成一个 `结点` 。

## 单链表实现

首先，我们来定义一个单链表中的结点。先上一个图：

![Node](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/CODE/14/node.png "结点示意图")

相应的，代码实现如下：

```cpp
struct Node {
    int data;      // 结点中的数据域
    Node * next;   // 指针域
};
```

**注意：在单链表中，一个结点中有数据域和指针域，即其本身存储的信息和它的后继的地址**

先上一个链表的图：

![LinkedList](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/CODE/14/LinkedList.png "链表示意图")

下面我们开始实现一个单链表，包括删除、插入等基本操作。

```cpp
#include <iostream>
using namespace std;
struct Node {
    int data;                 // 结点中的数据域
    Node * next;              // 指针域
};
Node * head = new Node;       // 头结点

void Init();                  // 链表的初始化
void Delete(int index);       // 删除链表的第 index 个元素
void Insert(int pos, int data);  // 向链表的第 pos 位置插入 data

int main()
{	
	Node * node = new Node;
	node = head;

	Init();
	for (int i = 1; i <= 10; i++)
	{
		Insert(i, i);          // 向链表插入 1 - 10 这10个数
	}
	cout << "向链表插入了 1 - 10 这十个数" << endl;

	Insert(5, 11);             // 向链表的第 5 个位置插入 11

	cout << "向链表的第 5 个位置插入了 11 这个数" << endl;
	cout << "链表当前情况：" << endl;

	while(node->next != NULL)
	{
		node = node->next;
		cout << node->data << " ";
	}
	
	cout << endl;

	Delete(1);                 // 删除第 1 个数
	Delete(3);                 // 删除第 3 个数

	cout << "删除了第一个数后，又删除了第三个数。" << endl;
 
	node = head;
	cout << "链表当前情况：" << endl;

	while(node->next != NULL)
	{
		node = node->next;
		cout << node->data << " ";
	}


	return 0;
}


void Init()
{ 
	head->next = NULL;   // 直接把头指针的 next 设为空
	head->data = 0;      // 这里用头指针的数据域存储链表的长度
}

void Delete(int index)
{
	Node * node, * currNode;
	node = new Node;
	currNode = new Node;
	currNode = head;
	for (int j = 0; j < index && currNode; j++)   // 找到要删除的结点和它的前一个节点
	{
		node = currNode;
		currNode = currNode->next;
	}
	
	if (node == NULL || currNode == NULL)
		return;
	
	node->next = currNode->next;      // 将要删除的前一个节点
	delete currNode;                  // 释放空间
}

void Insert(int pos, int data)
{
	Node * node, * insertData;
	node = new Node;
	node = head;

	insertData = new Node;
	insertData->data = data;
	insertData->next = NULL;

	if (pos == 1 && head->data == 0)         // 如果插入的位置是第一个位置并且链表为空
	{
		head->data++;
		head->next = insertData;             
		return;
	} else if (pos == 1 && head->data != 0) {
		insertData->next = head->next;       
		head->next = insertData;
		return;
	}

	int j = 1;

	while (j < pos && node->next != NULL)
	{
		node = node->next;
		j++;
	}
		
	if (node == NULL)
	{
		return;
	}

	insertData->next = node->next;
	node->next = insertData;

}
```



输出：

```
向链表插入了 1 - 10 这十个数
向链表的第 5 个位置插入了 11 这个数
链表当前情况：
1 2 3 4 11 5 6 7 8 9 10
删除了第一个数后，又删除了第三个数。
链表当前情况：
2 3 11 5 6 7 8 9 10
```

<Vssue title="linklist-data-structure-note" />