const path = require("path");
module.exports = {
  title: "ChungZH 的小窝",
  description: "Young, Simple, Naive, Stupid",
  dest: path.resolve(__dirname, "../../dist"),
  evergreen: true,
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Fira+Code&display=swap",
      },
    ], //https://font.googleapis.com/css?family=Rubik&display=swap
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;700&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;700&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "shortcut icon",
        href: "/BlogFavicon16.png",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content: "ChungZH, 博客, C++",
      },
    ],
    [
      "meta",
      {
        name: "author",
        content: "ChungZH",
      },
    ],

    //['script', { src: '/script/func.js' }],
  ],
  theme: "@vuepress/theme-blog",
  themeConfig: {
    nav: [
      {
        text: "关于",
        link: "/about/",
      },
      {
        text: "友链",
        link: "/friends/",
      },
      {
        text: "标签",
        link: "/tag/",
      },
      {
        text: "GitHub",
        link: "https://github.com/ChungZH",
      },
    ],
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/ChungZH",
        },
        {
          type: "mail",
          link: "mailto:chung.zh@qq.com",
        },
        {
          type: "twitter",
          link: "https://twitter.com/chungzh1",
        },
      ],
      copyright: [
        {
          text: "ChungZH © 2020",
          link: "",
        },
        {
          text: "Made with ❤",
          link: "",
        },
        {
          text: "CC BY-NC-SA 2.5",
          link: "https://creativecommons.org/licenses/by-nc-sa/2.5/cn/",
        },
      ],
    },
    feed: {
      canonical_base: "https://chungzh.cn",
    },
    sitemap: {
      hostname: "https://chungzh.cn/",
    },
  },
  plugins: {
    "@vuepress/medium-zoom": {},
    "vuepress-plugin-smooth-scroll": {},
    "vuepress-plugin-baidu-autopush": {},
    "@vuepress/google-analytics": {
      ga: "UA-145232074-1",
    },
    "@vssue/vuepress-plugin-vssue": {
      platform: "github",
      owner: "ChungZH",
      repo: "ChungZH.github.io",
      clientId: "70904e6b4944326400f3",
      clientSecret: "5bbc225640826f6dec55783db52b2205b55eff7a",
    },
    seo: {
      siteTitle: (_, $site) => $site.title,
      title: ($page) => $page.title,
      description: ($page) => $page.frontmatter.description,
      author: (_, $site) => $site.themeConfig.author,
      tags: ($page) => $page.frontmatter.tags,
      // twitterCard: _ => 'summary_large_image',
      type: ($page) =>
        ["articles", "posts", "blog"].some((folder) =>
          $page.regularPath.startsWith("/" + folder)
        )
          ? "article"
          : "website",
      url: (_, $site, path) => ($site.themeConfig.domain || "") + path,
      image: ($page, $site) =>
        $page.frontmatter.image &&
        ($site.themeConfig.domain || "") + $page.frontmatter.image,
      publishedAt: ($page) =>
        $page.frontmatter.date && new Date($page.frontmatter.date),
      modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
    },
    container: {
      type: "theorem",
      before: (info) => `<div class="theorem"><p class="title">${info}</p>`,
      after: "</div>",
    },
    container: {
      type: "right",
      defaultTitle: "",
    },
    container: {
      type: "tip",
      defaultTitle: "提示",
    },
    "img-lazy": {},
  },
};
