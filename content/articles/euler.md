---
title: 欧拉函数笔记
tags:
- OI
- 算法
- 数学
- 欧拉函数
- 积性函数
- 线性筛
- 数论
categories: 学习笔记
date: 2023-04-01
katex: true
---

## 定义

欧拉函数 $\varphi(n)$ 表示小于等于 $n$，且与 $n$ 互质的正整数的个数。

> 如何求 $\varphi(n)$？
>
> 比如 $varphi(12)$ 把 $12$ 质因数分解，$12=2^2*3$，其实就是得到了 $2$ 和 $3$ 两个互异的质因子。
>
> 然后把 $2$ 的倍数和 $3$ 的倍数都删掉。
>
> $2$ 的倍数：$2,4,6,8,10,12$
>
> $3$ 的倍数：$3,6,9,12$
>
> 但是是 $6$ 和 $12$ 重复减了。所以还要把既是 $2$ 的倍数又是 $3$ 的倍数的数加回来。所以这样写：$12 - 12/2 - 12/3 + 12/(2*3)$。运用了容斥原理。

## 性质

- 欧拉函数是积性函数。

    积性是什么意思呢？如果有 $\gcd(a, b) = 1$，那么 $\varphi(a \times b) = \varphi(a) \times \varphi(b)$。

    特别地，当 $n$ 是奇数时 $\varphi(2n) = \varphi(n)$。
- $n = \sum_{d \mid n}{\varphi(d)}$。

    证明：
    也可以这样考虑：如果 $\gcd(k, n) = d$，那么 $\gcd(\dfrac{k}{d},\dfrac{n}{d}) = 1, ( k < n )$。
    如果我们设 $f(x)$ 表示 $\gcd(k, n) = x$ 的数的个数，那么 $n = \sum_{i = 1}^n{f(i)}$。
    根据上面的证明，我们发现，$f(x) = \varphi(\dfrac{n}{x})$，从而 $n = \sum_{d \mid n}\varphi(\dfrac{n}{d})$。注意到约数 $d$ 和 $\dfrac{n}{d}$ 具有对称性，所以上式化为 $n = \sum_{d \mid n}\varphi(d)$。

- 若 $n = p^k$，其中 $p$ 是质数，那么 $\varphi(n) = p^k - p^{k - 1}$。（根据定义可知）
- 由唯一分解定理，设 $n = \prod_{i=1}^{s}p_i^{k_i}$，其中 $p_i$ 是质数，有 $\varphi(n) = n \times \prod_{i = 1}^s{\dfrac{p_i - 1}{p_i}}$。

    证明：
    
    **引理**：设 $p$ 为任意质数，那么 $\varphi(p^k)=p^{k-1}\times(p-1)$。

    证明：显然对于从 1 到 $p^k$ 的所有数中，除了 $p^{k-1}$ 个 $p$ 的倍数以外其它数都与 $p^k$ 互素，故 $\varphi(p^k)=p^k-p^{k-1}=p^{k-1}\times(p-1)$，证毕。

    接下来我们证明 $\varphi(n) = n \times \prod_{i = 1}^s{\dfrac{p_i - 1}{p_i}}$。由唯一分解定理与 $\varphi(x)$ 函数的积性
        
    $$
    \begin{aligned}
    \varphi(n) &= \prod_{i=1}^{s} \varphi(p_i^{k_i}) \\\\
    &= \prod_{i=1}^{s} (p_i-1)\times {p_i}^{k_i-1} \\\\
    &=\prod_{i=1}^{s} {p_i}^{k_i} \times(1 - \frac{1}{p_i}) \\\\
    &=n~ \prod_{i=1}^{s} (1- \frac{1}{p_i})
    &\square
    \end{aligned}
    $$

- $\varphi(a*b) = \varphi(a) * \varphi(b) * \frac{d}{\varphi(d)}$ ，其中 $d = \gcd(a, b)$

## 求一个数的欧拉函数值

```cpp
int euler_phi(int n) {
  int ans = n;
  for (int i = 2; i * i <= n; i++)
    if (n % i == 0) {
      ans = ans / i * (i - 1);
      while (n % i == 0) n /= i;
    }
  if (n > 1) ans = ans / n * (n - 1);
  return ans;
}
```

## 线性筛求欧拉函数

在线性筛中，每一个合数都被最小的质因子筛掉。设 $p_1$ 是 $n$ 的最小质因子，$n' = \frac{n}{p_1}$，那么 $n$ 通过 $n' \times p_1$ 筛掉。

对 $n' \mod p_1$ 分类讨论。

1. $n' \mod p_1 = 0$，那么 $n'$ 包含了 $n$ 的所有质因子。
$$
  \begin{aligned}
  \varphi(n) &= n \times \prod_{i = 1}^s{\dfrac{p_i - 1}{p_i}} \\\\
  &= p_1 \times n' \times \prod_{i = 1}^s{\dfrac{p_i - 1}{p_i}} \\\\
  &= p_1 \times \varphi(n')
  \end{aligned}
$$
2. $n' \mod p_1 \ne 0$，此时 $n'$ 与 $p_1$ 互质，根据欧拉函数的性质，我们有：
$$
  \begin{aligned}
  \varphi(n) &= \varphi(p_1) \times \varphi(n') \\\\
             &= (p_1-1) \times \varphi(n')
  \end{aligned}
$$

```cpp
void sieve() {
  memset(isprime, true, sizeof isprime);
  tot = 0;
  isprime[1] = 0;
  phi[1] = 1;
  for (int i = 2; i <= n; i++) {
    if (isprime[i]) {
      prime[++tot] = i;
      phi[i] = i-1;
    }
    for (int j = 1; j <= tot && prime[j]*i <= n; j++) {
      isprime[prime[j]*i] = 0;
      if (i%prime[j] == 0) {
        phi[i*prime[j]] = phi[i]*prime[j];
        break;
      }
      phi[i*prime[j]] = phi[i]*phi[prime[j]];
    }  
  }
}
```


## 参考资料

- [欧拉函数 - OI Wiki](https://oi-wiki.org/math/number-theory/euler/)