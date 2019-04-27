// .vuepress/config.js

module.exports = {
    // 网站 Title
    title: 'ChungZH',
  
    // 网站描述
    description: 'ChungZH 的小站',

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
      ['script', {
        src: '/script/func.js'
      }],
  ],
  
    // 网站语言
    locales: {
      '/': {
        lang: 'zh-CN',
      },
    },
  
    // 使用的主题
    theme: 'meteorlxy',
  
    // 主题配置
    themeConfig: {

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
        avatar: '/newavatar.jpg',
  
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
          zhihu: {
            account: 'chung-zh',
            link: 'https://www.zhihu.com/people/chung-zh',
          },
  
          // 豆瓣 帐号和链接
          douban: {
            account: '190281889',
            link: 'https://www.douban.com/people/190281889/',
          },
        },
      },
  
      // 上方 header 的背景，可以使用图片，或者随机变化的图案
      headerBackground: {
        // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
        //url: '/top-img.jpg',
  
        // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为纯色背景
        useGeo: true,
      },
  
      // 是否显示文章的最近更新时间
      lastUpdated: true,
  
      // 顶部导航栏内容
      nav: [
        { text: '🏠 首页', link: '/', exact: false },
        { text: '📰 文章', link: '/posts/', exact: false },
        { text: '🤝 友链', link: '/friends/', exact: false },
        { text: '😜 关于', link: '/about/', exact: false },
      ],
  
      // 评论配置，参考下方 [页面评论] 章节
      comments: {
        owner: 'ChungZH',
        repo: 'ChungZH.github.io',
        clientId: '70904e6b4944326400f3',
        clientSecret: '5bbc225640826f6dec55783db52b2205b55eff7a',
      },
    },
    plugins: {
      'sitemap': {
        hostname: 'https://chungzh.cn'
      },
    },
  }
  
