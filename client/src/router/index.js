import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home/Home'
import Classification from 'pages/classification/Classification'
import Shoppingcart from 'pages/shoppingcart/Shoppingcart'
import My from 'pages/my/My'
import Detail from 'pages/detail/detail'
import DetailImg from 'pages/detailsimg/detailsImg'
import Login from 'pages/login/login'
import Register from 'pages/register/register'
import Address from 'pages/address/address'
import Newaddress from 'pages/newaddress/newaddress'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Home',component: Home},
    {path: '/classification',name: 'Classification',component: Classification},
    {path: '/shoppingcart',name: 'Shoppingcart',component: Shoppingcart},
    {path: '/my',name: 'My',component: My},
    {path: '/detail/:id',name: 'Detail',component: Detail,children: [ {path: 'image', component: DetailImg}]},
    {path: '/login',name: 'Login',component: Login},
    {path: '/register',name: 'Register',component: Register},
    {path: '/address',name: 'Address',component: Address},
    {path: '/newaddress',name: 'Newaddress',component: Newaddress},
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
