---
title: 解决 Telegram Desktop 字体渲染问题
tags: 
- 字体
- 外挂
- 技巧
date: 2020-01-25 21:47:00
author: ChungZH
location: Foshan
summary: 丑 爆 了 -> 帅 炸 了
vssue-title: telegram-desktop-font
---

## 前言

Windows 10 下，Telegram 客户端会把中文用宋体显示，难看极了。。这几天看见一篇 Spencer 大佬的文章 [使用 FontMod 为 Win32 应用程序自定义字体](https://sspai.com/post/58542)，于是决定试一下。

> FontMod 就是字体外挂，**通过 DLL 注入的方法**将应用程序的字体渲染部分强行修改为我们希望的字体 —— 比如将「中易宋体」替换为「微软雅黑」。经过测试，FontMod 能够有效修改使用 GDI 渲染引擎的 Win32 应用程序，以及一些基于 Qt 的应用程序。
> 
> —— SpencerWoo 《使用 FontMod 为 Win32 应用程序自定义字体》

Telegram Desktop 就是使用 Qt 开发的，这方法也许能行！

## 解决

在 [FontMod](https://github.com/ysc3839/FontMod) 的 [Releases](https://github.com/ysc3839/FontMod/releases) 页面下载最新版本的 `FontMod.dll` 文件，改名为 `winmm.dll`，再放到 Telegram 的安装目录里。重启一下 Telegram 客户端，成功！

![](https://raw.githubusercontent.com/ChungZH/picgo-upload/master/tg.png)

哇，爽爽爽！

## 扩展

想知道 FontMod 的更多骚操作，请见[文档](https://github.com/ysc3839/FontMod/blob/master/README.zh_CN.md)。


<Donate/>
<Vssue title="telegram-desktop-font"/>