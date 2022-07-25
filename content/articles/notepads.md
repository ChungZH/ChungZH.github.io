---
title: 一款纯粹的 UWP 记事本——Notepads
tags: 
    - UWP
    - 文本编辑器
    - Windows
date: 2020-04-06 12:45:00
author: ChungZH
location: Foshan
summary: 漂亮的记事本，完美替代 win32 notepad！
vssue-title: notepads
---

![notepads](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/app/notepads/Notepads.png
)

> 在开始之前的一点闲话：当你看到这款应用的图标时，也许会联想到 Windows Terminal。打开后，甚至会发现连 UI 都有点相似。但事实上，这两款软件完全没有关系。Notepads 是由一位国人独立开发的。

## 介绍

Notepads 是一款美观且简洁的 UWP 文本编辑器，为代替 Notepad 而生。它没有代码高亮、丰富的插件或是酷炫的主题，因为他只是一款比 Notepad 更强的记事本。它没有 VS Code 或是 Sublime 的强大，就算是和 Notepad++ 比较，在代码编辑方面由于没有语法高亮也稍显逊色，但它依然是一款优秀的记事本，为编辑轻量文本而生的记事本。如果你只是想要快速浏览代码，写写注释，修改配置文件，或是写一段小短文，就应该使用 Notepads，而不是打开庞大的 VS Code，忍受漫长的加载时间。

Notepads 使用了 Fluent Design，有亚克力背景，支持浅色和深色模式，很漂亮。即使是信奉「好看就是生产力」的我也爱上了这个软件。

## 特性

Notepads 有许多强大的特性：

- 支持多标签页（此处 cue 微软赶紧开发 Sets！）
- 轻便、快捷
- 多行手写支持
- 设置 Tab 长度、编码、换行符、字体及大小等

下面拿几个比较有用的特性单独讲讲：

### Markdown 预览

![MDPreview](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/app/notepads/MDPreview.png
)

Notepads 支持 Markdown 实时预览，但这并不意味着你可以用它来做**主力** MD 编辑器。在这方面它依然是不合格的。

Notepads 还支持在预览时替换 Emoji code 为 Emoji 噢:smiley:！

### 文件更改预览

![DiffViewer](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/app/notepads/DiffViewer.png
)

Notepads 内置了 diff 查看器，可以很方便地对比新旧文件之间的差异。

### 终端中打开 Notepads

![clinotepads](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/app/notepads/clinotepads.gif
)

在终端中输入 `notepads` 或 `notepads foo.bar` 都可以唤出 Notepads。

在 **WSL** 中，你也可以通过 `powershell.exe -c notepads <filepath>` 使用 Notepads 打开文件。

## 尾巴

Notepads 是一款 C# 开源软件，源码在 [GitHub](https://github.com/JasonStein/Notepads) 。可在 Microsoft Store 查找 `Notepads` 即可下载。

<Donate/>
<Vssue title="notepads" />