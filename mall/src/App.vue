<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
    <div class="tab" v-show="payMent">
      <van-tabbar v-model="active" @change='change'>
        <van-tabbar-item  icon="wap-home" >商城</van-tabbar-item>
        <van-tabbar-item icon="wap-nav">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" >我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      active: 0,
      payMent: true
    }
  },
  methods: {
    change(i) {
      const rout = this.$router
      if (i == 0) {
        rout.push({'path': '/'})
      } else if (i == 1) {
        rout.push({'path': '/category'})
      } else if ( i == 2) {
        rout.push({'path': '/shoppingCart'})
      } else {
        rout.push({'path': '/my'})
      }
    },

    ...mapMutations({
      setName: 'USERNAME'
    })
  },

  created() {
    const name = this.$router.history.current.name
    const fullPath = this.$router.history.current.fullPath
    if (name === 'Category') {
      this.active = 1
    } else if (name === 'ShoppingCart') {
      this.active = 2
    } else if (name === 'My') {
      this.active = 3
    } else {
      this.active = 0
    }

    if (fullPath === '/user/address' || fullPath === '/user/addressEdit' || fullPath === '/user/collection' || fullPath === '/my/browse') {
      this.active = 3
    }else if(fullPath=== '/shoppingCart/ShoppingPayMent') {
        this.payMent = false
    } 
    axios.post('/api/keeplogin').then( res => {
      if (res.data.status == 1) {
        this.setName(res.data.username)
      } 
    })
  },
  watch: {
    $route(to,from){
      if (to.path === '/home' || to.path == '/') {
        this.active = 0
      }
      if(to.path === '/shoppingCart/ShoppingPayMent') {
        this.payMent = false
      } else {
        setTimeout(() => {
          this.payMent = true
        }, 300);
      }
    }
  }
}
</script>
<style lang='less'>
 .van-tabbar-item--active {
    color:#E0322B;
}
</style>

