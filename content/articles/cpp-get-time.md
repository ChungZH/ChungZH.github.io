---
title: Windows 中 C++ 测量时间的 N 种方法
date: 2020-03-29 13:13:00
tags:
- C++
- Windows
- 时间
author: ChungZH
categories: 瞎搞开发
summary: 测量可测量之物，将不可测量之物变为可测量。——伽利略
vssue-title: cpp-get-time
---

在开发中经常需要测量时间，比如性能优化时，比较两种方法的耗时。除此之外，获取当前的时间也可以用于初始化随机数生成器。而 C++ 提供了很种方法来获取时间。

## 标准库

### std::time

#### 定义

这个函数会返回一个距离 UTC 时间 1970 年 1 月 1 日 0:00 的秒数。

头文件：`<ctime>`

文档：[std::time](https://zh.cppreference.com/w/cpp/chrono/c/time)

```cpp
std::time_t time( std::time_t* arg );
```

#### 用法

```cpp
#include <windows.h>

#include <ctime>
#include <iostream>
using namespace std;
int main() {
  time_t res_1 = time(nullptr);

  Sleep(1000);  // do some stuff...

  time_t res_2 = time(nullptr);

  cout << res_1 << endl;
  cout << asctime(localtime(&res_1)) << endl;
  cout << res_2 - res_1 << 's' << endl;
  return 0;
}

/* 输出结果
1585457981
Sun Mar 29 12:59:41 2020

1s
*/
```

### std::chrono::steady_clock::now

#### 定义

返回表示当前时间的时间点。

这个时钟是专门用来计算时间的间隔的。C++ 还提供了一个 `system_clock`，用于获取系统的时间。

头文件：`chrono`

文档：[std::chrono::stadey_clock](https://zh.cppreference.com/w/cpp/chrono/steady_clock)

```cpp
static std::chrono::time_point<std::chrono::steady_clock> now() noexcept; 
// (C++11 起)
```

#### 用法

```cpp
#include <windows.h>

#include <chrono>
#include <iostream>
using namespace std;
int main() {
  chrono::steady_clock::time_point start = chrono::steady_clock::now();

  Sleep(1000);  // do some stuff...

  chrono::steady_clock::time_point end = chrono::steady_clock::now();

  chrono::duration<double> ans = end - start;

  cout << ans.count() << 's' << endl;
  return 0;
}

/* 输出：
1.01495s
*/
```

## Windows

### GetTickCount

#### 定义

检测自系统启动以来经过的毫秒数，最多为 49.7 天。如果不够用，可以使用 GetTickCount64。

文档：[GetTickCount function](https://docs.microsoft.com/zh-cn/windows/win32/api/sysinfoapi/nf-sysinfoapi-gettickcount)

```cpp
DWORD GetTickCount();
```

#### 用法

```cpp
#include <windows.h>
#include <iostream>
using namespace std;
int main() {
  DWORD start = GetTickCount();

  Sleep(1000);  // do some stuff...

  DWORD end = GetTickCount();

  cout << end - start << "ms" << endl;
  return 0;
}

/*输出：
1016ms
*/
```

### GetTickCount64

#### 定义

检测自系统启动以来经过的毫秒数。

文档：[GetTickCount64 function](https://docs.microsoft.com/zh-cn/windows/win32/api/sysinfoapi/nf-sysinfoapi-gettickcount64)

```cpp
ULONGLONG GetTickCount64();
```

#### 用法

```cpp
#include <windows.h>
#include <iomanip>
#include <iostream>
using namespace std;
int main() {
  ULONGLONG start = GetTickCount64();

  Sleep(1000); // do some stuff...

  ULONGLONG end = GetTickCount64();

  cout << end - start << "ms" << endl;
  return 0;
}

/* 输出：
1015ms
*/
```

### QueryPerformanceCounter

#### 定义

检测性能计数器的当前值，该值是一个高分辨率（<1us）时间戳，可用于时间间隔测量。

这个函数是一个「黑科技」，精度非常高，用起来也稍微麻烦一点点。

文档：[QueryPerformanceCounter function](https://docs.microsoft.com/en-us/windows/win32/api/profileapi/nf-profileapi-queryperformancecounter)

#### 用法

```cpp
#include <windows.h>
#include <iostream>
using namespace std;
int main() {
  LARGE_INTEGER freq;
  QueryPerformanceFrequency(&freq);  // 获取性能计数器的频率

  LARGE_INTEGER start;
  QueryPerformanceCounter(&start);

  Sleep(1000); // do some stuff...

  LARGE_INTEGER end;
  QueryPerformanceCounter(&end);

  double misTime =
      (end.QuadPart - start.QuadPart) / (freq.QuadPart / 1000000.0);  // 微秒
  double milTime =
      (end.QuadPart - start.QuadPart) / (freq.QuadPart / 1000.0);  // 毫秒
  double sTime = (end.QuadPart - start.QuadPart) / freq.QuadPart;  // 秒

  cout << misTime << " microseconds" << endl;
  cout << milTime << " milliseconds" << endl;
  cout << sTime << " seconds" << endl;

  return 0;
}

/* 输出：
1.00367e+06 microseconds
1003.67 milliseconds
1 seconds
*/


```

------

至此，本文共介绍了五种测量时间段的方法。

作者很菜，如发现什么问题，请在评论区中指出。

谢谢 🙇‍♂️

## Reference

1. Kurt Guntheroth. _**Optimized C++**: Proven Techniques for Heightened Performance_ 

2. [CppReference](https://cppreference.com)

3. [Microsoft Docs](https://docs.microsoft.com/zh-cn)

<Donate/>
<Vssue title="cpp-get-time" />