// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Tabbar, TabbarItem } from 'vant'
Vue.use(Tabbar).use(TabbarItem)
// 解决300毫秒延时
import FastClick from 'fastclick'
FastClick.attach(document.body)
import 'vant/lib/vant-css/index.css'
import 'css/reset.css'
import 'swiper/dist/css/swiper.css'
import 'css/border.css'
import 'css/index.css'
import 'css/icon.styl'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
