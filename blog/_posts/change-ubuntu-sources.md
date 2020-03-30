---
title: Ubuntu 更换国内源
date: 2019-05-28 17:04:00
tags:
  - Ubuntu
  - 系统
author: ChungZH
location: Foshan
summary: 慢 死 了 --> 快 死 了
vssue-title: change-ubuntu-sources
---

Ubuntu 默认的源实在是太慢了。。。实在没办法忍，只能换国内源了。

哦，我的 Ubuntu 版本是 `Ubuntu 18.04.2 LTS`。

<!-- More --> <!-- more -->

## 备份原来的源设置

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources_backup.list
```

这样就把原来的源设置备份到 sources_backup.list 文件里了。

## 修改源设置

首先打开 `/etc/apt/sources.list` 文件。

目前 Ubuntu 国内源有很多，下面给出几个比较常用的。

### 阿里源

[官网](https://mirrors.aliyun.com)

阿里源官方给出的方法和一般的方法略有不同，创建文件 `/etc/apt/sources.list.d/aliyun.list` 然后编辑内容如下：

```
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

然后执行：

```bash
sudo apt-get update
```

即可。

### 清华源

[官网](https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/)

将源设置文件替换为下面内容即可：

```
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

然后执行：

```bash
sudo apt-get update
```

即可。

### 中科大源

[官网](https://mirrors.ustc.edu.cn/ubuntu/)

将 `/etc/apt/sources.list` 文件中 Ubuntu 默认的源地址 `http://archive.ubuntu.com/` 替换为 `http://mirrors.ustc.edu.cn` 即可。

直接使用如下命令：

```bash
sudo sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
```

> **注意**：如果你在安装时选择的语言不是英语，默认的源地址通常不是 `http://archive.ubuntu.com/` ， 而是 `http://<country-code>.archive.ubuntu.com/ubuntu/` ，如 `http://cn.archive.ubuntu.com/ubuntu/` ， 此时只需将上面的命令进行相应的替换即可，即`sudo sed -i 's/cn.archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list` 。

然后执行：

```bash
sudo apt-get update
```

即可。

<Donate/>
<Vssue title="change-ubuntu-sources" />
