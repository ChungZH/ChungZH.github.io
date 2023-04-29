---
title: 高斯消元笔记
tags:
- OI
- 算法
- 数学
- 高斯消元
- 线性代数
categories: 学习笔记
date: 2023-04-28
katex: true
---

## 消元法及高斯消元法思想

消元法是将方程组中的一方程的未知数用含有另一未知数的代数式表示，并将其带入到另一方程中，这就消去了一未知数，得到一解；或将方程组中的一方程倍乘某个常数加到另外一方程中去，也可达到消去一未知数的目的。消元法主要用于二元一次方程组的求解。

### 消元法理论的核心

消元法理论的核心主要如下：

- 两方程互换，解不变；
- 一方程乘以非零数 $k$，解不变；
- 一方程乘以数 $k$ 加上另一方程，解不变。

## 过程

解方程组：

$$
\begin{cases}
2x_1+x_2-x_3=8  \\
-3x_1-x_2+2x_3=-11 \\
-2x_1+x_2+2x_3=-3 
\end{cases}
$$

写成矩阵的形式为：

$$
\left[\begin{matrix}
2 & 1 & -1 \\
-3 & -1 & 2 \\
-2 & 1 & 2
\end{matrix} \middle|
\begin{matrix}
8 \\
-11 \\
-3
\end{matrix} \right]
$$

这种矩阵称为**增广矩阵**。所谓增广矩阵，即为方程组系数矩阵 $A$ 与常数列 $b$ 的并生成的新矩阵，即 $(A | b)$，增广矩阵行初等变换化为行最简形，即是利用了高斯消元法的思想理念，省略了变量而用变量的系数位置表示变量，增广矩阵中用竖线隔开了系数矩阵和常数列，代表了等于符号。

我们从上到下依次处理每一行，处理完第 $i$ 行后，让 $A_{ii}$ 非 $0$，而 $A_{ji}(j\gt i)$ 均为 $0$。过程如下。

$$
\left[\begin{matrix}
2 & 1 & -1 \\
-3 & -1 & 2 \\
-2 & 1 & 2
\end{matrix} \middle|
\begin{matrix}
8 \\
-11 \\
-3
\end{matrix} \right] \\

\Rightarrow

\left[\begin{matrix}
-3 & -1 & 2 \\
 & 1/3 & 1/3 \\
 & 5/3 & 2/3
\end{matrix} \middle|
\begin{matrix}
-11 \\
2/3 \\
13/3
\end{matrix} \right] \\

\Rightarrow

\left[\begin{matrix}
-3 & -1 & 2 \\
 & 5/3 & 2/3 \\
     & & 1/5
\end{matrix} \middle|
\begin{matrix}
-11 \\
13/3 \\
-1/5
\end{matrix} \right]
$$

其中最后一个增广矩阵的系数部分是上三角阵（$0$ 用空白表示），而且主对角元 $a_{ii}$ 均非 $0$。该矩阵对应的方程组为：

$$
\begin{cases}
-3x_1-x_2+2x_3=-11 \\
5x_2/3+2x_3/3=13/3 \\
x_3/5=-1/5
\end{cases}
$$

可得 $x_3=-1$，再代入前面两个方程可求解。

在消元部分中，假设正在处理第 $i$ 行，则首先需要找一个 $r\gt i$ 且绝对值最大的 $a_{ri}$，然后交换第 $r$ 行和第 $i$ 行。交换两个方程的位置不会对解产生影响，但可以减小计算误差。当 $A$ 可逆时，可以保证交换后 $a_{ii}$ 一定不等于 $0$。这种方法称为列主元法。

接下来进行所谓的“加减消元”。比如在上面的例子中的第一步，首先交换第一个和第二个方程的位置，然后用第一个方程 $(-3, 1, 2-11)$ 消去第二个方程 $(2, 1,-1, 8)$ 的第一列，方法是把第二个方程中的每个数都减去第一行对应元素的 $-2/3$ 倍。

一般情况下，如果要用第 $i$ 个方程来消去第 $k$ 个方程的第 $i$ 列，那么第 $k$ 行的所有元素 $A[k][j]$ 都应该减去 $A[i][j]$ 的 $A[k][i]/A[i][i]$ 倍。

下一个过程是回代。现在 $A$ 已经是一个上三角矩阵了，即第 $1,2,3…$ 行的最左边非 $0$ 元素分别在第 $1,2,3…$ 列。这样，最后一行实际上已经告诉我们 $x_n$ 的值了；接下来像前面说的那样不停地回代计算，最终会得到每个变量的唯一解。代码如下。

[Luogu-P3389 【模板】高斯消元法](https://www.luogu.com.cn/problem/P3389)

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 106;
const double EPS = 1e-7;
int n;
double a[N][N];
bool gauss() {
	int r;
	for (int i = 0; i < n; i++) {
		r = i; 
		for (int j = i+1; j < n; j++)
			if (fabs(a[j][i]) > fabs(a[r][i])) r = j;
		if (fabs(a[r][i]) < EPS) return false; // 为 0 无法化简
		if (r != i) swap(a[r], a[i]);
		for (int k = i+1; k < n; k++) {
			double f = a[k][i]/a[i][i];
			for (int j = i; j <= n; j++) a[k][j] -= f*a[i][j];
		} 
	}
	
	// 回代
	for (int i = n-1; i >= 0; i--) {
		for (int j = i+1; j < n; j++)
			a[i][n] -= a[j][n]*a[i][j];
		a[i][n] /= a[i][i];
	} 
	return true;
}
int main()
{
	cin >> n;
	for (int i = 0; i < n; i++)
		for (int j = 0; j <= n; j++)
			cin >> a[i][j];
	if (gauss()) {
		for (int i = 0; i < n; i++)
			printf("%.2lf\n", a[i][n]);
	} else {
		puts("No Solution");
	}
	return 0;
}
```

## 高斯-约旦消元

~~高斯-乔丹~~？这个消元法不需要回代，代码更简单。

将高斯消元的上三角形式化为对角线形式，就是高斯-约旦消元。最终结果的系数部分的矩阵只有对角线上的可以为 $1$，其余都为 $0$。在代码上的区别就是将回代的部分转移到前面的循环而已。

```cpp
bool gauss_jordan() {
	int r;
	for (int i = 0; i < n; i++) {
		r = i; 
		for (int j = i+1; j < n; j++)
			if (fabs(a[j][i]) > fabs(a[r][i])) r = j;
		if (fabs(a[r][i]) < EPS) return false; // 为 0 无法化简
		if (r != i) swap(a[r], a[i]);
		for (int k = 0; k < n; k++) { // 区别：高斯消元不处理小于 i 的行，因此最后需要回代
			if (k == i) continue;
			double f = a[k][i]/a[i][i];
			for (int j = i; j <= n; j++) a[k][j] -= f*a[i][j];
		} 
	}
	return true;
}
// 最后的输出部分改为：
printf("%.2lf\n", a[i][n]/a[i][i]);
```

### 判断无解和无穷多解

[Luogu-P2455 SDOI2006 线性方程组](https://www.luogu.com.cn/problem/P2455)

高斯-约旦的一个缺点：相比于普通高斯，它更难判断无解和无穷多解。

具体地，我们用 $r$ 来记录当前行，如果主元为 $0$，那么 `continue` 到下一列，**但 $r$ 不变**；否则消元后令 $r\gets r+1$。

遍历完所有列后：

- 若 $r=n$，说明有唯一解；
- 若 $r\lt n$，说明第 $r+1\sim n$ 行系数矩阵全都是 $0$，若列向量全是 $0$，说明有无穷多解，否则无解。说人话就是，**左边系数为 $0$ 而右边系数不为 $0$ 则无解**，**两边系数都为 $0$ 则有无穷多解**。

注意首先判无解，再判多解。

------

为什么要额外用 $r$ 记录当前行，而不是向前面一样直接把 $i$ 看作当前行呢？~~想了很久终于明白了~~考虑[这组数据](https://www.luogu.com.cn/discuss/247701)：

```
input:
4
1 1 1 1 0
0 0 2 4 6
0 0 1 1 2
0 0 4 8 12
output:
0
```

首先对于 $x_1$ 没有问题。到了 $x_2$，我们发现剩下三个方程 $x_2$ 的系数都是 $0$，说明没有唯一解。如果不用 $r$ 记录，我们处理第三个元时就会从第三行方程开始，而第二行的方程 $(0, 0, 2, 4, 6)$ 就会被忽略，答案就错了。

之前的普通高斯消元中，我们认为只有 $i$ 之后的式子是可用的，因为我们不用管具体是无解还是无数解，系数为 $0$ 直接判掉。

但这里，我们有可能会在系数为 $0$ 之后继续做下去。这就是受到消元顺序影响的原因。**这就是为什么要用 $r$ 记录当前行**。另一种方法见文后参考资料中 Rui_R 的题解。

------

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 106;
const double EPS = 1e-7;
int n;
double a[N][N], ans[N];
int gauss_jordan() {
	int r = 0;
	for (int i = 0; i < n; i++) { // r 表示在枚举哪一行，i 表示列
		int line = r; 
		for (int j = r+1; j < n; j++)
			if (fabs(a[j][i]) > fabs(a[line][i])) line = j;
		if (r != line) swap(a[r], a[line]);		
		if (fabs(a[r][i]) < EPS) continue; // 跳过当前列
		for (int k = 0; k < n; k++) {
			if (k == r) continue;
			double f = a[k][i]/a[r][i];
			for (int j = i; j <= n; j++) a[k][j] -= f*a[r][j];
		} 
		r++;
	}
	r--;
	if (r < n-1) {
		for (int i = r+1; i < n; i++) {
			if (a[i][n]) { // 0x != 0 无解 
				return -1;
			}
		}
		return 0; // 无穷多实数解
	}
	for (int i = 0; i < n; i++) {
		ans[i] = a[i][n]/a[i][i];
		if (fabs(ans[i]) < EPS) ans[i] = 0;
	} 
	return 1;
}
int main()
{
	cin >> n;
	for (int i = 0; i < n; i++)
		for (int j = 0; j <= n; j++)
			cin >> a[i][j];
	int res = gauss_jordan();
	if (res != 1) {
		printf("%d\n", res);
	} else {
		for (int i = 0; i < n; i++) {
			printf("x%d=%.2lf\n", i+1, ans[i]);
		}
	}
	return 0;
}
```

## 高斯消元法解异或方程组

异或方程组是指形如：

$$
\begin{cases}
a_{1,1}x_1 \oplus a_{1,2}x_2 \oplus \cdots \oplus a_{1,n}x_n &= b_1\\
a_{2,1}x_1 \oplus a_{2,2}x_2 \oplus \cdots \oplus a_{2,n}x_n &= b_2\\
\cdots &\cdots \\ a_{m,1}x_1 \oplus a_{m,2}x_2 \oplus \cdots \oplus a_{m,n}x_n &= b_1
\end{cases}
$$

的方程组，且式中所有系数/常数（即 $a_{i,j}$ 与 $b_i$）均为 $0$ 或 $1$。

由于异或符合交换律与结合律，故可以按照高斯消元法逐步消元求解。值得注意的是，我们在消元的时候应使用**异或消元**而非加减消元，且不需要进行乘除改变系数（因为系数均为 $0$ 和 $1$）。

注意到异或方程组的增广矩阵是 $01$ 矩阵（矩阵中仅含有 $0$ 与 $1$），所以我们可以使用 `bitset` 进行优化，将时间复杂度降为 $O(\dfrac{n^2m}{\omega})$，其中 $n$ 为元的个数，$m$ 为方程条数，$\omega$ 一般为 $32$（与机器有关）。

消元时，当前方程的这个元的系数要为 $1$。否则就不用异或了~

[Luogu-P2447 SDOI2010 外星千足虫](https://www.luogu.com.cn/problem/P2447)

```cpp
int ans = 0, r;
for (int i = 1; i <= n; i++) {
  r = i;
  while (r <= m && !a[r][i]) r++;
  if (r == m+1) {
    cout << "Cannot Determine\n";
    return 0;
  }
  ans = max(ans, r);
  if (r != i) swap(a[r], a[i]);
  for (int j = 1; j <= m; j++) {
    if (j != i && a[j][i] == 1) { // 可以消元
      a[j] ^= a[i];
    }
  }
}
```

## 习题

### USACO09NOV Lights G [异或消元]

[Luogu-P2962 USACO09NOV Lights G](https://www.luogu.com.cn/problem/P2962)

对于每一个点建立一个方程，若 $i$ 与 $j$ 之间有边，则将第 $i$ 个方程的第 $j$ 位系数和第 $j$ 个方程第 $i$ 位系数改为 $1$。初始化注意第 $i$ 个方程的第 $i$ 为系数一定是 $1$，方程等号的右边也是 $1$。

然后进行异或消元。因为有自由元，我们用 DFS 处理一下 $0$ 和 $1$ 的情况，取最小值。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 45;
int a[N][N], va[N];
int n, m, ans = 1E9;
void dfs(int x, int tot) {
  if (tot > ans) return;
  if (!x) {
    ans = min(ans, tot);
    return;
  }
  if (a[x][x]) {
    va[x] = a[x][n+1];
    for (int j = x+1; j <= n; j++) {
      if (a[x][j]) va[x] ^= va[j];
    }
    if (va[x]) dfs(x-1, tot+1);
    else dfs(x-1, tot);
  } else {
    va[x] = 0;
    dfs(x-1, tot);
    va[x] = 1;
    dfs(x-1, tot+1);
  }
}
int main()
{
  cin >> n >> m;
  for (int i = 1; i <= m; i++) {
    int x, y;
    cin >> x >> y;
    a[x][y] = a[y][x] = 1;
  }
  int r;
  for (int i = 1; i <= n; i++) a[i][n+1] = a[i][i] = 1;
  for (int i = 1; i <= n; i++) {
    r = i;
    while (!a[r][i] && r <= n) r++;
    if (r == n+1) continue;
    if (r != i) swap(a[r], a[i]);
    for (int j = 1; j <= n; j++) {
      if (j != i && a[j][i])
        for (int k = 1; k <= n+1; k++) a[j][k] ^= a[i][k];
    }
  } 
  dfs(n, 0);
  cout << ans << endl;
  return 0;
}
```

### P2973 USACO10HOL Driving Out the Piggies G [期望 高斯消元]

[Luogu-P2973 USACO10HOL Driving Out the Piggies G](https://www.luogu.com.cn/problem/P2973)

> 题意：一个无向图，节点 $1$ 有一个炸弹，在每个单位时间内，有 $p/q$ 的概率在这个节点炸掉，有 $1-p/q$ 的概率随机选择一条出去的路到其他的节点上。问最终炸弹在每个节点上爆炸的概率。

进入一个点的次数是无限的，因此求概率似乎比较难。

对于这种题目，我们一般考虑 **使用方程来推出相邻两个状态之间的关系，从而解决无数的路径** 。

我们设第 $i$ 个点的期望经过次数为 $f_i$，那么第 $i$ 个点的爆炸概率为 $f_i \times \frac{P}{Q}$。问题在于求 $f_i$。我们用 $deg_i$ 表示点 $i$ 的度数。

$$
f_u=\begin{cases}1& i=1 \\\sum_{(u,v)\in E} (1-\frac{P}{Q})\times f_v \times \frac{1}{deg_v} & \text{otherwise}\end{cases}
$$

移项后就是：

$$
-f_u+\sum_{(u,v)\in E} (1-\frac{P}{Q})\times f_v \times \frac{1}{deg_v}=0
$$

然后对于这个方程组进行高斯消元即可。

```cpp

#include <bits/stdc++.h>
using namespace std;
const int N = 305, M = 50000;
int n, m;
double p, q;
int mp[N][N], in[N];
double a[N][N];
void gauss_jordan() {
  int r;
  for (int i = 1; i <= n; i++) {
    r = i;
    for (int j = i+1; j <= n; j++)
      if (fabs(a[j][i]) > fabs(a[r][i])) r = j;
    if (r != i) swap(a[r], a[i]);
    for (int j = 1; j <= n; j++) {
      if (j != i) {
        double t = a[j][i]/a[i][i];
        for (int k = i; k <= n+1; k++) {
          a[j][k] -= t*a[i][k];
        }
      }
    }
  }
}
int main()
{
  cin >> n >> m >> p >> q;
  double pdq = p/q;
  for (int i = 1; i <= m; i++) {
    int u, v;
    cin >> u >> v;
    mp[u][v] = mp[v][u] = 1;
    in[u]++;
    in[v]++;
  }
  for (int i = 1; i <= n; i++) {
    a[i][i] = 1;
    for (int j = 1; j <= n; j++) {
      if (!mp[i][j]) continue;
      a[i][j] = -(1.0-pdq)/in[j];
    }
  }
  a[1][n+1] = 1;
  gauss_jordan();
  for (int i = 1; i <= n; i++) {
    double ans = a[i][n+1]/a[i][i];
    printf("%.9lf\n", ans*pdq);
  }
  return 0;
}
```


## 参考资料

- 《算法竞赛入门经典-训练指南》
- [【数学】高斯-约旦消元法 - mango09](https://www.cnblogs.com/mangoworld/p/Gauss-Jordan-Elimination.html)
- [OI Wiki](https://oi-wiki.org/math/linear-algebra/gauss/)
- [数论小白都能看懂的线性方程组及其解法 - ShineEternal的笔记小屋](https://www.luogu.com.cn/blog/ShineEternal/linear-equation-group)
- [题解 P2455 【SDOI2006线性方程组】Rui_R](https://www.luogu.com.cn/blog/RUI-R/solution-p2455)
- [扶苏的bitset浅谈](https://www.luogu.com.cn/blog/fusu2333/fu-su-di-bitset-qian-tan)