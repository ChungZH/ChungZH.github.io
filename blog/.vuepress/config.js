const path = require('path');

module.exports = {
  title: 'ChungZH 的小窝',
  description: 'ChungZH\'s Blog',
  dest: path.resolve(__dirname, '../../dist'),
  evergreen: true,
  locales: {
    '/': {
      lang: 'zh-CN'
    },
  },
  head: [
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Fira+Code&display=swap'
    }], //https://font.googleapis.com/css?family=Rubik&display=swap
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300;1,400;1,500;1,600;1,700;1,900&display=swap'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;700&display=swap'
    }],
    ['link', {
      rel: 'shortcut icon',
      href: '/BlogFavicon16.png'
    }],
    ['meta', {
      name: 'keywords',
      content: 'ChungZH, 博客, C++'
    }],
    ['meta', {
      name: 'author',
      content: 'ChungZH'
    }],
    ['script', {
      'data-ad-client': 'ca-pub-4609798364954097',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    }]

    //['script', { src: '/script/func.js' }],
  ],
  theme: '@vuepress/theme-blog',
  themeConfig: {
    directories: [{
      id: "posts",
      dirname: "_posts",
      title: "博客",
      path: "/_posts/",
      itemPermalink: "/_posts/:year/:month/:day/:slug"
    }],
    nav: [{
        text: "博客",
        link: "/_posts/"
      },
      {
        text: "友链",
        link: "/friends/"
      },
      {
        text: "GitHub",
        link: "https://github.com/ChungZH"
      }
    ],
    footer: {
      contact: [{
          type: "github",
          link: "https://github.com/ChungZH"
        },
        {
          type: "mail",
          link: "mailto:chung.zh@qq.com"
        }, {
          type: 'twitter',
          link: "https://twitter.com/chungzh1"
        }
      ],
      copyright: [{
        text: "ChungZH © 2019",
        link: ""
      }, {
        text: "Made with ❤",
        link: ""
      }]
    },
    feed: {
      canonical_base: 'https://chungzh.cn'
    },
    sitemap: {
      hostname: "https://chungzh.cn/"
    },

    globalPagination: {
      prevText: '👈上一页',
      nextText: '下一页👉',
      lengthPerPage: '6',
      layout: 'Pagination'
    },
    comment: {
      service: 'vssue',
      owner: 'ChungZH',
      repo: 'ChungZH.github.io',
      clientId: '70904e6b4944326400f3',
      clientSecret: '5bbc225640826f6dec55783db52b2205b55eff7a',
    },
  },
  plugins: {
    'vuepress-plugin-baidu-autopush': {},
    '@vuepress/google-analytics': {
      'ga': 'UA-145232074-1',
    }
  },
}