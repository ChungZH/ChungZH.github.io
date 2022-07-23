---
title: 关于 int 与 long long 的运算速度
tags:
- C++
- OI
date: 2022-07-22
author: ChungZH
---

## 前言

写一道 CF 题的时候，算法明明是正确的，却一直都 TLE。最后把一个 `long long` 类型的数组改成了 `int`，竟然就 AC 了。。

这不禁引发了我的思考，`int` 与 `long long` 的运算速度不一样吗？

## 不严谨测试

由于本菜鸡并没有什么计算机基础原理的知识，只好做了一个测试。当然，这个测试其实很不严谨，没有很大的参考价值。~~我也就图一乐，哈哈哈哈哈~~

### 测试环境

- 电脑：Lenovo Yoga 14sACH 2021
- 系统：Windows 11 25163.1010
- CPU：AMD Ryzen 7 5800H with Radeon Graphics (16) @ 3.200GHz
- RAM：16.0 GB
- 编译器：GCC 11.2.0

### 代码

~~仅仅是为了图一乐，~~ 我第一次使用了 [Google Benchmark](https://github.com/google/benchmark/) 这一工具。其实挺好上手的。

```cpp
#include <benchmark/benchmark.h>

using namespace benchmark;

static void int_add(State &state) {
  int a = std::rand(), b = std::rand(), c = 0;
  for (auto _ : state)
    DoNotOptimize(c = (++a) + (++b));
}

static void ll_add(State &state) {
  long long a = std::rand(), b = std::rand(), c = 0;
  for (auto _ : state)
    DoNotOptimize(c = (++a) + (++b));
}

static void int_div(State &state) {
  int a = std::rand(), b = std::rand(), c = 0;
  for (auto _ : state)
    DoNotOptimize(c = (++a) / (++b));
}

static void ll_div(State &state) {
  long long a = std::rand(), b = std::rand(), c = 0;
  for (auto _ : state)
    DoNotOptimize(c = (++a) / (++b));
}

static void int_mod(State &state) {
  int a = std::rand(), b = std::rand(), c = 0;
  for (auto _ : state)
    DoNotOptimize(c = (++a) % (++b));
}

static void ll_mod(State &state) {
  long long a = std::rand(), b = std::rand(), c = 0;
  for (auto _ : state)
    DoNotOptimize(c = (++a) % (++b));
}

BENCHMARK(int_add)->Threads(8)->Iterations(1e9);
BENCHMARK(ll_add)->Threads(8)->Iterations(1e9);
BENCHMARK(int_div)->Threads(8)->Iterations(1e9);
BENCHMARK(ll_div)->Threads(8)->Iterations(1e9);
BENCHMARK(int_mod)->Threads(8)->Iterations(1e9);
BENCHMARK(ll_mod)->Threads(8)->Iterations(1e9);

BENCHMARK_MAIN();
```

### 结果

```powershell
---------------------------------------------------------------------
Benchmark                                        Time             CPU 
---------------------------------------------------------------------

int_add/iterations:1000000000/threads:8      0.209 ns         1.57 ns
ll_add/iterations:1000000000/threads:8       0.225 ns         1.71 ns
int_div/iterations:1000000000/threads:8      0.302 ns         2.29 ns
ll_div/iterations:1000000000/threads:8       0.306 ns         2.38 ns
int_mod/iterations:1000000000/threads:8      0.345 ns         2.18 ns
ll_mod/iterations:1000000000/threads:8       0.350 ns         2.34 ns
```

经过多次测试，`long long` 类型的各种运算都比 `int` 慢一点。

## StackOverflow 问答

比较专业的一个解答。详见 [performance - C++ int vs long long in 64 bit machine - Stack Overflow](https://stackoverflow.com/questions/39779880/c-int-vs-long-long-in-64-bit-machine)。

这里引用相关问答：

>_1) If it is best practice to use long long in x64 for achieving maximum performance even for for 1-4 byte data?_
> 
> No- and it will probably in fact make your performance worse. For example, if you use 64-bit integers where you could have gotten away with 32-bit integers then you have just doubled the amount of data that must be sent between the processor and memory and the memory is orders of magnitude slower. All of your caches and memory buses will crap out twice as fast.

## 结论

可以不用 `long long` 就尽量不用。最好不要使用 `#define int long long` 这种粗暴手段。

------

**致谢**：

- [C++ Benchmarking Tips for Beginners - Unum Blog](https://unum.cloud/post/2022-03-04-gbench/)

> 碎碎念：真的有大半年没写过博客了，上次更新还是寒假呢哈哈哈。一整个学期都好忙啊，接下来就是初三了呢。

🙇