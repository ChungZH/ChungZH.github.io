<template>
  <footer class="footer">
    <p
      v-if="sns"
      class="sns-links"
    >
      <a
        v-for="(item, name) in sns"
        :key="name"
        class="sns-link"
        :href="item.link"
        target="_blank"
      >
        <IconSns
          :name="name"
          :account="item.account"
        />
      </a>
    </p>

    <p>
      Copyright © 2019 {{ $site.themeConfig.personalInfo.nickname }}
      <br>
      <i
        class="fa fa-space-shuttle"
        aria-hidden="true"
      /> Powered by
      <a
        href="https://vuepress.vuejs.org/"
        rel="noopener"
        target="_blank"
      >VuePress</a><br>
      Made with 
      <i
        class="fa fa-heartbeat"
        aria-hidden="true"
      /> love<br>
    </p>
  </footer>
</template>

<script>
import IconSns from './IconSns.vue'

export default {
  name: 'TheFooter',

  components: {
    IconSns,
  },

  computed: {
    sns () {
      return this.$site.themeConfig.personalInfo.sns || null
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.footer
  color $grayTextColor
  padding-bottom 1.5rem
  text-align center
  border-top 1px solid $borderColor
  line-height: 2
</style>
