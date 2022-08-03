---
title: Notepanda 开发小结
tags: 
    - 文本编辑器
    - Qt
    - C++
date: 2020-05-16 10:45:00
author: ChungZH
category: 瞎搞开发
---

## 前言

最近开始学习 Qt，然后就挖坑了一个小玩具 Notepanda，顺便看看能不能替代诸如 notepad、gedit 之类的软件。顺便锻炼一下自己。

[GitHub repo](https://github.com/ChungZH/notepanda)

## Feature

1. 基本的文本编辑操作（没想到吧这也是 feature 了哈哈哈哈哈哈）
2. 行号显示
3. 语法高亮
4. 从命令行启动。（如 `notepanda` 或者 `notepanda CMakeLists.txt`）

除此之外还实现了自定义字体、字号、Qt 主题和 Status Bar 等一些小功能。

以后的目标是实现多标签页，并对 Markdown 做一点优化（比如预览），~~如果有可能还会加进去一个 terminal~~。计划在 [GitHub Projects](https://github.com/ChungZH/notepanda/projects/)。

目前还是很弱的一个东西，不过等查找、替换等 feature 实现之后，基本上可以替代 Windows 的 notepad 了。

## Screenshots

![](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/notepanda/notepanda-sc1.png)![](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/notepanda/notepanda-sc2.png)![](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/notepanda/notepanda-sc3.png)![](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/notepanda/notepanda-sc4.png)

## 实现

这部分大概讲讲思路吧。

### 布局

![layout](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/notepanda/notepanda.png)

### 编辑控件

使用了 Qt 提供的 QPlainTextEdit 类，适合纯文本编辑。刚开始还用的是 QTextEdit，想想自己真是傻了，又不是要编辑富文本哈哈哈。

不过 QPlainTextEdit 似乎有点点慢，我也没能力造轮子，于是就将就着用吧。

### 语法高亮

刚开始想实现的时候看见了 Qt 官方的 [Syntax Highlighter Example](https://links.jianshu.com/go?to=http%3A%2F%2Fdoc.qt.io%2Fqt-5%2Fqtwidgets-richtext-syntaxhighlighter-example.html)，很棒对吧。但是我可不想花精力去写一堆语言的规则呢！

然后就找到了 KDE Framework 里的 [KSyntaxHighlighting](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FKDE%2Fsyntax-highlighting)。KDE Framework 是真的烦人，刚开始怎么也 build 不出来。等到了 GitHub Actions 上，整整用了四天时间才搞定，还是在某 Packman 的帮助下才完成的。。。当时看到绿绿的 Actions，我差点没开心得疯掉。。

这个 KSyntaxHighlighting，deepin-editor 和 Qt Creator 都在使用。好在他自己也提供了一些 example，看上去很简单。依赖也很小，只有 Extra CMake Modules，不过看上去和高亮的功能没啥关系，也许是 KF 必备依赖吧。它自带了两百多种语言的高亮规则，省了我很多事情，有 Dark / Light 主题，不服还可以自己写。很满意。

### CI

我可不想每次更新都自己打一次包，没那个闲心，手上能用的系统也不够 :) 穷孩子怎么买得起 Mac。所以只能用 CI 啦。

现在 CI 主要帮我解决了：

1. Windows 安装程序
2. Windows 上的 7z & MacOS 上的 dmg & Linux 的 AppImage
3. Release 时自动上传以上所有文件

CI 平台当然是选择了 GitHub Actions 啦！现在这个项目所有环节都在 GitHub 上能找到，AUR 除外 :( 

Notepanda 的 CI 全都是抄 [Qv2ray](https://github.com/qv2ray/qv2ray) 上的，可真是帮了我很多忙。

## 最后

感谢 Qv2ray 的 Super Packman: ymshenyu，感谢死鬼 gcc，感谢鸭鸭，感谢 Qv2ray User Group 里面的每一个人。如果没有他们，我的 Qt 旅程不会这么顺利。

顺便，Qv2ray 是一个很好用的 v2ray 跨平台客户端，欢迎尝试！

谢谢阅读 🙇‍♂️

最后，放上我画的一只小熊猫：

<div align="center"><img src="https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/notepanda/logo.png" width="300"/></div>

<Donate/>
<Vssue title="notepanda" />
