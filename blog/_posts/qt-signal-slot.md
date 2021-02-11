---
title: Qt 中的 Signal/Slot
tags: 
    - Qt
    - Signal/Slot
    - C++
    - Code
date: 2020-04-25 17:45:00
author: ChungZH
location: Foshan
summary: Qt 酱真是太可爱太强大啦~(づ￣ 3￣)づ么么
vssue-title: qt-signal-slot
---

最近尝试学习 Qt，觉得还挺有趣的。信号（Signal）和槽（Slot）可能是 Qt 最重要也是最独特的特性了，有了这个机制，Qt 才能变得如此强大！

> 顺便打一个广告，刚入门 Qt 就开始写的 [Notepanda](https://github.com/ChungZH/Notepanda) 小项目，一个很 simple 的 notepad 啦~
> 
> 事实证明，用边写边学的方式学习 Qt 是对的。这篇文章中的例子全都来自于我编写上面这个 Notepanda 的过程。

## 简介

Signal 和 Slot 用于对象之间的通信，举个例子：我想要在点击一个 open 按钮时，自动调用 `Open()` 函数。使用 Signal 和 Slot 就可以简单地实现这样的功能，通过一个 `connect()` 函数就能绑定一对 Signal & Slot：

```cpp
connect(ui->actionOpen, &QAction::triggered, this, &MainWindow::open);
```

下面是一张说明 Signal & Slot 如何工作的示意图：

![Signal & Slot](https://czh-img.oss-cn-shenzhen.aliyuncs.com/blog/code/qt-signal-slot/abstract-connections.png)

## 实现一个 Slot 函数

先引用一段来自 Qt 官方文档的文字进一步说明 Signal & Slot 机制


::: theorem Signal&Slot
Signal & Slot 机制是类型安全的: Signal 的签名必须与接收槽的签名相匹配。（事实上，一个 Slot 的签名可能比它接收到的 Signal 更短，因为它可以忽略额外的参数）由于签名是兼容的，当使用基于函数指针的语法时，编译器可以帮助我们检测类型不匹配。基于字符串的 SIGNAL 和 SLOT 语法将在运行时检测类型不匹配。Signal 和 Slot 是松散耦合的: 发出信号的类既不知道也不关心哪些插槽接收信号。Qt 的 Signal 和 Slot 机制确保了如果您将 Signal 连接到 Slot，Slot 将在正确的时间用 Signal 的参数调用。Signal 和 Slot 可以接受任意类型的任意数量的参数。
:::


看不懂？没关系，我举一个带有参数的 Signal & Slot 例子。

我有一个 `TextEditor`（其实是一个 `QPlainTextEdit`） 对象，叫做 `plainTextEdit`。我要实现一个 undo 操作，我想在 undo 操作不可用时 Disable 掉 undo 的按钮。但我不知道现在能否在编辑器里进行 undo，`QPlainTextEdit` 提供了一个 `undoAvailable(bool available)` 的 Signal，如果不可用，它会将 `available` 设成 `false`。否则为 `true`。所以现在我要实现一个 Slot。

首先定义一个 slot 函数：

```cpp
class MainWindow : public QMainWindow
{
  Q_OBJECT

 private slots:
  void setActUndoState(bool available);
};
```

这样就定义好了一个 `setActUndoState(bool available)` 的 Slot 函数。接着我要实现它：

```cpp
void MainWindow::setActUndoState(bool available)
{
  ui->actionUndo->setDisabled(!available);
}
```

最后 connect 这一对 Signal & Slot。

```cpp
connect(plainTextEdit, &TextEditor::undoAvailable, this, &MainWindow::setActUndoState);
```

看上去很简单吧！其实，`setActUndoState(bool available)` 函数里的 `available` 参数就是在 Signal `undoAvailable(bool available)` 里传送过来的。

## 实现一个 Signal

先介绍一下场景，我想要当 `QPlainTextEdit` 打开的文件 title 改变时，随之改变窗口的 title。我要在 `TextEditor` 端实现一个 Signal，然后在 UI 层的 `MainWindow` 修改 title。

定义 Signal：

```cpp
class TextEditor : public QPlainTextEdit
{
  Q_OBJECT

 signals:
  void changeTitle();
};
```

> **提醒**：
> 
> Signal 函数必须是 `void` 类型的。

然后，我要在改动文件 title 时发送这个 `changeTitle` Signal。可以这样写：

```cpp
...
emit changeTitle();
...
```

这样就发送好了。继续在 `MainWindow` 定义一个 Slot 函数：

```cpp
class MainWindow : public QMainWindow
{
  Q_OBJECT

 private slots:
  void changeWindowTitle();
};
```

然后实现 `changeWindowTitle`：

```cpp
void MainWindow::changeWindowTitle()
{
  setWindowTitle(plainTextEdit->currentFile.split("/").last() + " - Notepanda");
}
```

最后写 connect：

```cpp
connect(plainTextEdit, &TextEditor::changeTitle, this, &MainWindow::changeWindowTitle);
```

这样就实现啦！怎么样，是不是很简单！对，就这么简单的东西我摸索了一早上才写对（~~逃~~ 

Qt 酱还是很有趣的！我越来越喜欢她啦~

## Reference

1. [Signal & Slots - Qt Documentation](https://doc.qt.io/qt-5/signalsandslots.html)

<Donate/>
<Vssue title="Qt-signal-slot" />