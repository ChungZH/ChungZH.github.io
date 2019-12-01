// .vuepress/config.js
/*
module.exports = {
  // 网站 Title
  title: 'ChungZH',

  // 网站描述
  description: '欢迎来到 ChungZH 的小站',

  // 网站语言
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  // HTML <head> 部分
  head: [
    ['link', {
      rel: 'icon',
      href: '/BlogFavicon16.png'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
    }],
    //['link', {
    //rel: 'stylesheet',
    //href: 'https://fonts.loli.net/css?family=Noto+Serif+SC'
    //}],
    ['script', {
      src: '/script/func.js'
    }],
  ],

  // 使用的主题
  theme: 'meteorlxy',

  // 主题配置
  themeConfig: {
    // 主题语言，参考下方 [主题语言] 章节
    lang: {
      home: '首页',
      posts: '文章',
      category: '分类',
      categories: '分类',
      allCategories: '全部',
      tag: '标签',
      tags: '标签',
      createdAt: '发布时间',
      updatedAt: '最后修改',
      prevPost: '上一篇',
      nextPost: '下一篇',
    },

    lang: Object.assign(require('vuepress-theme-meteorlxy/lib/langs/zh-CN'), {
      home: '欢迎来到我的首页！',
    }),

    // 个人信息（没有或不想设置的，删掉对应字段即可）
    personalInfo: {
      // 昵称
      nickname: 'ChungZH',

      // 个人简介
      description: '路漫漫其修远兮，吾将上下而求索。',

      // 电子邮箱
      email: 'chung.zh@qq.com',

      // 所在地
      location: 'Fo\'shan City, China',

      // 组织
      organization: '@EasyHexo',

      // 头像
      // 设置为外部链接
      avatar: '/newavatar.jpg',
      // 或者放置在 .vuepress/public 文件夹，例如 .vuepress/public/img/avatar.jpg
      // avatar: '/img/avatar.jpg',
      

      // 社交平台帐号信息
      sns: {
        // Github 帐号和链接
        github: {
          account: 'ChungZH',
          link: 'https://github.com/ChungZH',
        },

        // Facebook 帐号和链接
        //facebook: {
          //account: 'meteorlxy.cn',
          //link: 'https://www.facebook.com/meteorlxy.cn',
        //},

        // LinkedIn 帐号和链接
        //linkedin: {
          //account: 'meteorlxy',
          //link: 'http://www.linkedin.com/in/meteorlxy',
        //},

        // Twitter 帐号和链接
        //twitter: {
          //account: 'meteorlxy_cn',
          //link: 'https://twitter.com/meteorlxy_cn',
        //},

        // 新浪微博 帐号和链接
        //weibo: {
          //account: '@焦炭君_Meteor',
          //link: 'https://weibo.com/u/2039655434',
        //},

        // 知乎 帐号和链接
        //zhihu: {
          //account: 'meteorlxy.cn',
          //link: 'https://www.zhihu.com/people/meteorlxy.cn',
        //},

        // 豆瓣 帐号和链接
        //douban: {
          //account: '159342708',
          //link: 'https://www.douban.com/people/159342708',
        //},

        // Reddit 帐号和链接
        //reddit: {
          //account: 'meteorlxy',
          //link: 'https://www.reddit.com/user/meteorlxy',
        //},

        // Medium 帐号和链接
        //medium: {
          //account: 'meteorlxy.cn',
          //link: 'https://medium.com/@meteorlxy.cn',
        //},

        // Instagram 帐号和链接
        //instagram: {
          //account: 'meteorlxy.cn',
          //link: 'https://www.instagram.com/meteorlxy.cn',
        //},

        // GitLab 帐号和链接
        //gitlab: {
          //account: 'meteorlxy',
          //link: 'https://gitlab.com/meteorlxy',
        //},

        // Bitbucket 帐号和链接
        //bitbucket: {
          //account: 'meteorlxy',
          //link: 'https://bitbucket.org/meteorlxy',
        //},

        // Docker Hub 帐号和链接
        //docker: {
          //account: 'meteorlxy',
          //link: 'https://hub.docker.com/u/meteorlxy',
        //},
      },
    },

    // 上方 header 的相关设置
    header: {
      // header 的背景，可以使用图片，或者随机变化的图案（geopattern）
      background: {
        // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
        //url: '/assets/img/bg.jpg',

        // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为空白背景
        useGeo: true,
      },

      // 是否在 header 显示标题
      showTitle: true,
    },

    // 是否显示文章的最近更新时间
    lastUpdated: true,

    // 顶部导航栏内容
    nav: [
      { text: '首页', link: '/', exact: true },
      { text: '文章', link: '/posts/', exact: false },
      { text: '关于', link: '/about/', exact: false },
      { text: '友链', link: '/friends/', exact: false },
    ],

    // 评论配置，参考下方 [页面评论] 章节
    comments: {
      platform: 'github',
      owner: 'ChungZH',
      repo: 'ChungZH.github.io',
      clientId: '70904e6b4944326400f3',
      clientSecret: '5bbc225640826f6dec55783db52b2205b55eff7a',
      autoCreateIssue: process.env.NODE_ENV !== 'development', // 可选，这样设置可以在开发环境下不自动创建 Issue
    },

    // 分页配置
    pagination: {
      perPage: 10,
    },

    // 默认页面（可选，默认全为 true）
    defaultPages: {
      // 是否允许主题自动添加 Home 页面 (url: /)
      home: true,
      // 是否允许主题自动添加 Posts 页面 (url: /posts/)
      posts: true,
    },
  },
  plugins: {
    'sitemap': {
      hostname: 'https://chungzh.cn'
    },
    'vuepress-plugin-baidu-autopush': {},
  },
}*/
const path = require('path');

module.exports = {
  title: 'CHUNG ZH',
  description: 'ChungZH\'s Blog',
  dest: path.resolve(__dirname, '../../dist'),
  evergreen: true,
  locales: {
    '/': { lang: 'zh-CN' },
  },
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.lug.ustc.edu.cn/css?family=Noto+Serif+SC:400,900&amp;display=swap&amp;subset=chinese-simplified' }], // https://fonts.googleapis.com/css?family=Noto+Serif+SC:400,900&amp;display=swap&amp;subset=chinese-simplified
    ['link', { rel: 'shortcut icon', href: '/BlogFavicon16.png' }],
    ['meta', { name: 'keywords', content: 'ChungZH, 博客, C++' }],
    ['meta', { name: 'author', content: 'ChungZH' }],
    //['script', { src: '/script/func.js' }],
  ],
  theme: 'simple',
  themeConfig: {
    author: 'ChungZH', // will display on the page footer
    navbar: { // will display below the title
      About: '/about/',
      Friends: '/friends/',
      GitHub: 'https://github.com/chungzh',
      Portfolio: 'https://chungzh.cc'
    }
  },
  plugins: {
    'sitemap': {
      hostname: 'https://chungzh.cn'
    },
    'vuepress-plugin-baidu-autopush': {},
    '@vuepress/google-analytics': {
      'ga': 'UA-145232074-1',
    },
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github',
      owner: 'ChungZH',
      repo: 'ChungZH.github.io',
      clientId: '70904e6b4944326400f3',
      clientSecret: '5bbc225640826f6dec55783db52b2205b55eff7a',
    },
  },
}