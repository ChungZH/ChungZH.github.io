<template>
  <div class="donate" align="center">
    <button class="btn-show-donate" v-on:click="hide = !hide">
        大哥来打赏 🍺
    </button>
    <transition name="fade">
      <div v-show="!hide" class="donate-d">
        <img src="/donate.jpg" alt="Donate me!" width="500em" class="donate-i"></img>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hide: true
    }
  }
}
</script>

<style lang="stylus" scoped>
button.btn-show-donate
  margin-top .75rem
  border 2px solid $accentColor
  background-color rgb(248, 248, 240)
  cursor pointer
  outline none
  border-radius 33px
  padding 5px 16px
  font-size 1.1em
  font-weight 700
  transition background-color .3s ease
  color $accentColor

.donate-d
  margin-top .75rem

.donate-i
  border 2px solid $accentColor
  border-radius 33px

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>