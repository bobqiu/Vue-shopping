<template>
  <div id="app">
    <router-view/>
    <div class="tab">
      <van-tabbar v-model="active">
        <van-tabbar-item  icon="wap-home" @click='change'>商城</van-tabbar-item>
        <van-tabbar-item icon="wap-nav" @click='change'>分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" @click='change'>购物车</van-tabbar-item>
        <van-tabbar-item icon="member-day-privilege" @click='change'>我的</van-tabbar-item>
    </van-tabbar>
    </div>

  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import Vue from 'vue'
Vue.use(Tabbar).use(TabbarItem);
import {mapMutations} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      active: 0,
    }
  },
  methods: {
    change() {
      this.tabList('')
      let num = this.active
      if (num == 0) {
        this.$router.push({path:'/'})
      }else if (num == 1) {
        this.$router.push({path:'/classification'})
      } else if(num == 2) {
        this.$router.push({path:'/shoppingcart'})
      } else{
        this.$router.push({path:'/my'})
      }
    },
    ...mapMutations({
      tabList:'TABLIST'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .tab >>> .van-tabbar-item__icon
    font-size 32px
    margin-bottom 15px
  .tab >>> .van-tabbar-item__text
    font-size 28px
  .tab >>> .van-tabbar-item--active
    color $bgColor
  .van-tabbar
    height 100px

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
  #app
    height 100%
</style>
