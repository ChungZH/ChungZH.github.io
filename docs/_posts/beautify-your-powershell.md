---
title: 美化你的 Powershell
tags: 
- Powershell
- 终端
date: 2019/02/23 11:50:00
vssue-title: beautify-your-powershell
---

Powershell 源代码仓库🔗 [🎉🎉🎉Powershell/Powershell](https://github.com/PowerShell/PowerShell)

<!-- More -->

## 前言

众所周知，Powershell 是微软开发的新一代的 shell。在微软的大力扶植下，已经成长为了一个成熟的 shell。而大部分人为了解决终端丑的问题，都选择了使用 Linux shell 这条路。而 `WSL` 的推出更促进了这一点。

虽然使用 Linux shell 是一个不错的选择，但我们也可以在 Windows 的 shell 上下功夫。

对了，为什么不是美化 `CMD` 呢？答案很简单，微软都抛弃的东西，我们还是也抛弃了吧。

## 开始

默认的 Powershell 是这样的：

![丑陋的 Powershell](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/%E6%9E%81%E5%AE%A2%E6%94%BB%E7%95%A5/20/Powershell1.png)

但我们要把它改成这样：

![帅气的 Powershell](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/%E6%9E%81%E5%AE%A2%E6%94%BB%E7%95%A5/20/Powershell2.png)

wow~简直能和使用 `oh-my-zsh` 的终端媲美了！！！

话不多说，咱们开始。

首先我们了解一个工具 🌟[oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh)。关于它的介绍可以看[我在即刻的推荐文](https://web.okjike.com/post-detail/5c1b25c05158130011810bfd/originalPost)。总之，这个工具就是用来美化 Powershell 的。上图就是用了 oh-my-posh 后的效果。

### 预备

为了获得更完美的体验，我们可以先安装几个 `Powerline` 字体。可以在 [powerline/fonts](https://github.com/powerline/fonts) 中下载。下载过程不赘述。

下载好 Powerline 字体后，需要把终端的字体改成你刚刚下载的 Powerline 字体。

对了，由于默认的 Powershell 终端改字体比较麻烦，我们可以使用终端模拟器。大家可以使用 [Eugeny/terminus](https://github.com/Eugeny/terminus) 这个工具。安装好后在 Settings 页面修改字体就行了。大家可以自己摸索。

### 安装

好了，先来安装一下 `oh-my-posh`。往 Powershell 狂输以下命令：

```powershell
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
```

这样就安装好了 `posh-git` 和 `oh-my-posh` 这两个插件了。

### 使用

```powershell
Import-Module oh-my-posh
Import-Module posh-git
```

输入如上命令即可。

![成果](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/%E6%9E%81%E5%AE%A2%E6%94%BB%E7%95%A5/20/Powershell3.png)

>  upd：oh-my-posh 默认提供了许多主题，大家可以自行切换。方法是：`Set-Theme 主题名`。主题有[这些](https://github.com/JanDeDobbeleer/oh-my-posh#themes)。大家可以自己玩玩。

好了，取得了这样的成果，或许你以为已经成功了。但是——你只要重启一次终端，你就会发现问题了。

**为什么重启之后终端又复原了呢？？？**

这是因为打开的时候必须要输入 `Import-Module` 那两行命令才能启用插件。

那么我们可以设置一个脚本，让他每次打开 Powershell 就自动输入那两行命令。

好了，明确了目标，我们就开始行动吧。

首先输入：

```powershell
New-Item $profile
```

![结果](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/%E6%9E%81%E5%AE%A2%E6%94%BB%E7%95%A5/20/Powershell4.png)

好了，打开这个文件——相信大家如果仔细看信息就能发现这个文件在哪里了。然后在这个文件中粘贴以下命令：

```
Import-Module oh-my-posh
Import-Module posh-git
```

就可以每次打开 Powershell 都自动用上 oh-my-posh 了。

## 福利

我还写了一个脚本[在这里](https://github.com/ChungZH/MyScript/blob/master/installOhMyPosh.bat)，使用这个脚本就能能帮你从安装 oh-my-posh 直到输入 `New-Item $profile` 了。安装字体和修改 `Microsoft.Powershell_profile.ps1` 的任务留给大家。

之所以最后才放福利，是因为希望让大家都能自己动手，享受过程。

所以，

Enjoy it ☕~