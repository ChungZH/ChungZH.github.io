---
title: Hello Hugo!
tags:
- Blog
- Hugo
categories: 瞎搞开发
date: 2021-07-16
---

暑假来了，顺便把博客更新一下。

从以前的 Vuepress 变成了 Hugo，速度真的快了很多，不愧是 "The world’s fastest"。用的主题是 [Tania](https://github.com/WingLim/hugo-tania)，很简洁、漂亮。Hugo 非常易用，不到半天就完整迁移过来了。我可以很肯定地说这一次博客迁移是有史以来最快的一次。

CI 用的是 GitHub Actions:

```yaml
name: github pages

on:
  push:
    branches:
      - hugo  # Set a branch to deploy
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          # extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: master  # default: gh-pages
```

**总之就是非常丝滑**，Hugo NB!