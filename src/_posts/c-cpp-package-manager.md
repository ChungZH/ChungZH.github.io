---
title: 谁说 C/C++ 没有好的包管理器？这里来一沓！
tags: 
    - C++
    - 包管理器
date: 2019/08/25 11:41:00
vssue-title: C/C++ Package Manager
---

包管理器可以帮助你更方便地安装依赖关系，并决定所安装的版本，提高你的开发幸福感。许多语言都有自己的包管理器，像 Node.js 的 npm/yarn、Rust 的 Cargo、Python 的 pip 等等。当然，C/C++ 也有它自己的包管理器！

## 1. Conan（C/C++ Package Manager）

- 官网：[https://conan.io/](https://conan.io/)
- GitHub 项目地址：[https://github.com/conan-io/conan](https://github.com/conan-io/conan)
- Stars 数：3k
- 文档：[https://docs.conan.io/en/latest/](https://docs.conan.io/en/latest/)

首先出场的是 Conan（注意，不是柯南！），一个用 Python 编写的 C/C++ 包管理器。它是完全分散的，你可以自己托管服务器中的包。它适用于**所有平台**，包括 Linux、OS X、Windows、Solaris、FreeBSD、嵌入式和交叉编译、docker、WSL。它可以与任何构建系统集成，为 CMake、MSBuild、Makefiles 等工具提供了经过测试的支持。除此之外，它还获得了奔驰、华为等大公司用户。你还可以在 [Conan-Center](https://bintray.com/conan/conan-center) 寻找或分享你的 C/C++ 包。

想要安装 Conan 也很简单：

```shell
$ pip install conan
```

![conan-systems](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/c-cpp-package-manager/conan-systems.png)

## 2.Buckaroo

- 官网：[https://buckaroo.pm/](https://buckaroo.pm/)
- GitHub 项目地址：[https://github.com/LoopPerfect/buckaroo](https://github.com/LoopPerfect/buckaroo)
- Stars 数：600
- 文档：[https://github.com/LoopPerfect/buckaroo/wiki](https://github.com/LoopPerfect/buckaroo/wiki)

这个 C++ 包管理器是使用 F# 语言开发的。它的独特之处就是直接从 GitHub、BitBucket、GitLab、托管的 Git 和 HTTP 中提取依赖项。同样的，它也是完全分散的，没有中央服务器。Buckaroo 使用 TOML 配置文件。

它的工作流大概是这样的：

```shell
# Create your project file
$ buckaroo init

# Install dependencies
$ buckaroo add github.com/buckaroo-pm/boost-thread@branch=master

# Run your code
$ buck run :my-app
```

安装方法详见 [Quick Install](https://github.com/LoopPerfect/buckaroo#quick-install)。

![buckaroo](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/c-cpp-package-manager/how-buckaroo-works.png)

## 3.vcpkg

- GitHub 项目地址：[https://github.com/microsoft/vcpkg](https://github.com/microsoft/vcpkg)
- Stars 数：6k
- 文档：[https://vcpkg.readthedocs.io/](https://vcpkg.readthedocs.io/)

vcpkg 是由微软爸爸开发的支持 Windows、Linux、Mac OS 的 C++ 库管理器，解决了 Windows 下**常用依赖包**的管理问题！它方便与 Visual Studio 集成，你可以使用 `vcpkg search` 搜索可用的包。它也可以从 Bitbucket、GitHub、GitLab 等获取包。

安装方法详见 [Quick Start](https://github.com/microsoft/vcpkg#quick-start)。

## 4.Hunter

- GitHub 项目地址：[https://github.com/ruslo/hunter](https://github.com/ruslo/hunter)
- Stars 数：2k
- 文档：[https://docs.hunter.sh](https://docs.hunter.sh)
- 包：[https://docs.hunter.sh/en/latest/packages.html](https://docs.hunter.sh/en/latest/packages.html)

用于 C/C++ 的跨平台包管理器。支持 Linux、Windows、macOS、iOS、Android、Raspberry Pi 等平台。Hunter 主要用于管理带有 CMake 构建系统的软件包，现有的 CMake 软件包可以很容易地集成到系统中，但是使用带有 `ExternalProject_Add` 命令的自定义模板（构建方案）也支持非 CMake 软件包。

**注意**：现在 Hunter 的 To be or not to be 已经成了问题，详见 [Issue #1921](https://github.com/ruslo/hunter/issues/1921)。如果它在 https://patreon.com/ruslo 上没有得到足够的支持，维护者将会在 2019 年 8 月 25 日停止维护该项目。请谨慎使用！

开源不易，~~是人都要恰饭~~这个项目从 2013 年到现在，已经非常不易，目前已有 2k stars 了。大家可以给他 sponsor，让他继续走下去！

![cmake-hunter-environment](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/c-cpp-package-manager/cmake-hunter-environment.png)

## 5.clib

- GitHub 项目地址：[https://github.com/clibs/clib](https://github.com/clibs/clib)
- Stars 数：3k
- 文档：[https://github.com/clibs/clib/wiki](https://github.com/clibs/clib/wiki)
- 包：[https://github.com/clibs/clib/wiki/Packages](https://github.com/clibs/clib/wiki/Packages)

clib 是一个 C 包管理器（非 C++），使用起来较简单。同样的，它也可以直接从 GitHub 上安装库。类似于 Node.js，它也是用 `package.json` 管理的。下面是一个例子：

```json
{
  "name": "term",
  "version": "0.0.1",
  "repo": "clibs/term",
  "description": "Terminal ansi escape goodies",
  "keywords": ["terminal", "term", "tty", "ansi", "escape", "colors", "console"],
  "license": "MIT",
  "src": ["src/term.c", "src/term.h"]
}
```

![clib](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/c-cpp-package-manager/clib.png)

## 6.poac

- GitHub 项目地址：[https://github.com/poacpm/poac](https://github.com/poacpm/poac)
- Stars 数：341
- 官网：[https://poac.pm/](https://poac.pm/)
- 文档：[https://doc.poac.pm/en/](https://doc.poac.pm/en/)
- 包：[https://poac.pm/packages](https://poac.pm/packages)

别看 poac 现在 stars 数量少，它其实很适合新手使用。poac 具有直观且易于使用的界面（像 npm 和 Cargo一样）。独特的是，你可以在**不了解** CMake 的情况下使用 poac 开发应用程序和库，专注于学习 C++ 而不会绊倒。作者还计划实现与其他构建系统和包管理器的集成，让你能够无缝切换。

安装也是一行命令搞定：

```shell
curl -fsSL https://sh.poac.pm | bash
```

![poac](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/c-cpp-package-manager/poac.gif)

------

ChungZH

2019 - 8 - 25 @ 广东 - 佛山

#EOF

<Vssue title="C/C++ Package Manager" />