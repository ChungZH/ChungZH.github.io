---
title: 创建 Vuepress 博客并使用 Git 管理
tags:
- Vuepress
- Git
- Blog
date: 2019-03-02 12:28:00
author: ChungZH
location: Foshan
summary: 又双叒叕搞博客了
vssue-title: create-vuepress-blog-and-use-git-manger-it
---

> Vuepress 是 Evan You 编写的一个 Vue 驱动的静态网站生成器，一般用于创建文档网站、博客网站。

[Vuepress 官方文档网站](https://vuepress.vuejs.org/) · [Vuepress GitHub 仓库地址](https://github.com/vuejs/vuepress) · [awesome-vuepress 关于 Vuepress 的一些好东西](https://github.com/ulivz/awesome-vuepress)

本文将主要介绍创建 Vuepress 网站、使用 Git 管理、使用 CI 等方面的内容。

<!-- More --> <!-- more -->

> 提示：我使用的是 Windows 系统，在其他平台上终端命令可能略有不同，请自行变通！

## 前期准备

请事先安装好 yarn、Git 等软件。本文不介绍安装这些前期准备的方法，请自行查阅文档，锻炼阅读文档能力。

## 下载 Vuepress

首先我们创建一个文件夹，用于存放 Vuepress。

```bash
mkdir vuepress-blog
cd vuepress-blog
```

然后往里面安装 Vuepress：

```bash
yarn add vuepress@next # 安装 Vuepress 1.x 版本
```

再修改一下 `package.json`，添加以下内容：

```json
"scripts": {
    "blog:dev": "vuepress dev docs",
    "blog:build": "vuepress build docs"
}
```

## 安装主题

Vuepress 的主题有很多，可以在 [awesome-vuepress 关于 Vuepress 的一些好东西](https://github.com/ulivz/awesome-vuepress) 挑选一个你喜欢的主题，或者直接在 GitHub 搜索也可以。这里我使用 [vuepress-theme-meteorlxy](https://github.com/meteorlxy/vuepress-theme-meteorlxy) 作为例子。

```bash
yarn add vuepress-theme-meteorlxy@next
```

ok，现在你已经安装好主题了。

## 熟悉 Vuepress 目录结构

```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。
- `docs/.vuepress/theme`: 用于存放本地主题。
- `docs/.vuepress/styles`: 用于存放样式相关的文件。
- `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- `docs/.vuepress/public`: 静态资源目录。
- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml`。

大概就是这些，还有一些更高级的配置这里就没写了。相信有兴趣做更高级自定义的话都会自己去看 [Vuepress 官方文档网站](https://vuepress.vuejs.org/) 了~

## 配置 Vuepress

首先创建 `docs` 目录、`docs/.vuepress` 目录：

```bash
mkdir docs
mkdir docs/.vuepress
```

然后进入 `.vuepress` 文件夹，创建一个 `config.js` 配置文件。

在 `config.js` 中粘贴以下内容：

```js
// .vuepress/config.js

module.exports = {
  // 网站 Title
  title: 'My Blog',

  // 网站描述
  description: 'This is my blog',

  // 网站语言
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  // 使用的主题
  theme: 'vuepress-theme-meteorlxy',

  // 主题配置
  themeConfig: {
    // 个人信息（没有或不想设置的，删掉对应字段即可）
    personalInfo: {
      // 昵称
      nickname: 'meteorlxy',

      // 个人简介
      description: 'Happy Coding<br/>Happy Life',

      // 电子邮箱
      email: 'meteor.lxy@foxmail.com',

      // 所在地
      location: 'Xi\'an City, China',

      // 组织
      organization: 'Xi\'an Jiao Tong University',

      // 头像
      avatar: 'https://www.meteorlxy.cn/assets/img/avatar.jpg',

      // 社交平台帐号信息
      sns: {
        // Github 帐号和链接
        github: {
          account: 'meteorlxy',
          link: 'https://github.com/meteorlxy',
        },

        // Facebook 帐号和链接
        facebook: {
          account: 'meteorlxy.cn',
          link: 'https://www.facebook.com/meteorlxy.cn',
        },

        // LinkedIn 帐号和链接
        linkedin: {
          account: 'meteorlxy',
          link: 'http://www.linkedin.com/in/meteorlxy',
        },

        // Twitter 帐号和链接
        twitter: {
          account: 'meteorlxy_cn',
          link: 'https://twitter.com/meteorlxy_cn',
        },

        // 新浪微博 帐号和链接
        weibo: {
          account: '@焦炭君_Meteor',
          link: 'https://weibo.com/u/2039655434',
        },

        // 知乎 帐号和链接
        zhihu: {
          account: 'meteorlxy.cn',
          link: 'https://www.zhihu.com/people/meteorlxy.cn',
        },

        // 豆瓣 帐号和链接
        douban: {
          account: '159342708',
          link: 'https://www.douban.com/people/159342708',
        },
      },
    },

    // 上方 header 的背景，可以使用图片，或者随机变化的图案
    headerBackground: {
      // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
      url: '/assets/img/bg.jpg',

      // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为纯色背景
      useGeo: true,
    },

    // 是否显示文章的最近更新时间
    lastUpdated: true,

    // 顶部导航栏内容
    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/', exact: false },
    ],

    // 评论配置，参考下方 [页面评论] 章节
    comments: {
      owner: 'meteorlxy',
      repo: 'vuepress-theme-meteorlxy',
      clientId: 'MY_CLIENT_ID',
      clientSecret: 'MY_CLIENT_SECRET',
    },
  },
}

```

> 注意：这是 `meteorlxy` 主题的默认配置，其他主题请查看主题文档。

然后直接按照 [meteorlxy 主题文档](https://vuepress-theme-meteorlxy.meteorlxy.cn/)进行配置即可。

## 配置 CI 和 Git

> 持续集成（英语：Continuous integration，缩写 CI）是一种软件工程流程，是将所有软件工程师对于软件的工作副本持续集成到共享主线（mainline）的一种举措。

**👷 这里我们所使用的持续集成平台是 Travis CI.**

### 开启 CI

首先，在 [Create a new repository](https://github.com/new) 里创建一个项目，项目名是 `GitHub 用户名.github.io`，然后到 [Travis CI](https://travis-ci.org) 官网，用 GitHub 账户直接关联登录，并允许 Travis CI 查看自己的公有仓库。

然后我们到 [Travis CI 账户页面](https://travis-ci.org/account/repositories)开启博客仓库的 CI，如图：

![OpenCI](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/CODE/create-vuepress-blog-and-use-git-manger/ci1.png)

### 添加变量

我们要设置三个变量：`GIT_NAME`、`GIT_EMAIL`、`GITHUB_TOKEN`，分别是 `git` 用户名、`git` 用户邮箱和 GitHub token。

其中前两项的值可以在本地查看：

```bash
git config --global user.name # 对应 GIT_NAME
git config --global user.email # 对应 GIT_EMAIL
```

第三项 GitHub token 要在 GitHub 申请：

- 访问 [GitHub 账户设置 > Tokens](https://github.com/settings/tokens)
- 生成新 Token: Generate new token
- 填入 Token 描述，并给予 Token 第一项 `repo` 的全部权限
- 将生成的 Token 复制，保存（生成 Token 的页面只有一次机会看见，请保存妥当。）

在 Travis CI 仓库配置中，将三个变量填入设置（位于 `Settings > Environment Variables` 处并保存：

![](https://chungzhblog-photo.oss-cn-shenzhen.aliyuncs.com/%E5%8D%9A%E5%AE%A2/CODE/create-vuepress-blog-and-use-git-manger/ci2.png)

然后在博客根目录里创建一个 `.travis.yml`，并粘贴一下内容进去：

```yaml
language: node_js

sudo: required

node_js: '10'

branches:
  only:
    - vuepress

before_install:
  - export TZ='Asia/Shanghai'

install:
  - yarn install

script:
  - yarn blog:build
  - echo "chungzh.cn" > docs/.vuepress/dist/CNAME # 这里 "chungzh.cn" 改成你自己的域名，如果没有，删掉这行就行了

deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN
  local_dir: docs/.vuepress/dist
  name: $GIT_NAME
  email: $GIT_EMAIL
  keep-history: true
  target-branch: master
  on:
      branch: vuepress
```

然后我们新建一个 `.gititnore` 文件，粘贴以下内容：

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
docs/.vuepress/dist/
```

好，现在输入以下命令，创建一个 Git 项目：

```bash
git init
git checkout -b vuepress
git add .
git commit -m ":tada: Init repo"
git remote add origin git@github.com:ChungZH/ChungZH.github.io.git # 这里改成你自己的项目地址
git push -u origin vuepress
```

push 上去后，CI 应该就会开始了。静待片刻即可。

------

ChungZH

2019 - 3 - 2 / 广东 - 佛山 

#EOF 😘

<Vssue title="create-vuepress-blog-and-use-git-manger-it" />