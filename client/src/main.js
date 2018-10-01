// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'styles/reset.css'  //清除默认样式
import 'styles/border.css'  //1像素边框
import 'styles/iconfont.css' //字体图标
import 'styles/font-awesome.css' //字体图标
import 'styles/toast.css' //toast
import VueAwesomeSwiper from 'vue-awesome-swiper' //轮播图
Vue.use(VueAwesomeSwiper)
import 'swiper/dist/css/swiper.css' //轮播样式
// 解决300毫秒延时
import FastClick from 'fastclick'
FastClick.attach(document.body);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
