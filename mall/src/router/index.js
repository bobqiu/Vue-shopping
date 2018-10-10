import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home/Home'
import Category from 'pages/category/Category'
import ShoppingCart from 'pages/shoppingCart/ShoppingCart'
import My from 'pages/my/My'
import Details from 'pages/details/Details'
import Login from 'pages/user/Login'
import Address from 'pages/user/address'
import AddressEdit from 'pages/user/AddressEdit'
import Collection from 'pages/user/Collection'
import MyOrder from 'pages/user/MyOrder'
import City from 'pages/city/City'
import ShoppingPayMent from 'pages/shoppingCart/components/ShoppingPayMent'

import Browse from 'pages/browse/Browse'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home, children: [{ path: '/city', component: City }, { path: ':id', component: Details }] },
    { path: '/category', name: 'Category', component: Category, children: [{ path: ':id', component: Details }] },
    { path: '/shoppingCart', name: 'ShoppingCart', component: ShoppingCart },
    { path: '/user/login', name: 'Login', component: Login }, // 登入
    { path: '/user/address', name: 'Address', component: Address }, // 地址
    { path: '/user/addressEdit', name: 'AddressEdit', component: AddressEdit }, // 新增和编辑地址
    { path: '/user/collection', name: 'Collection', component: Collection, children: [{ path: ':id', component: Details }] }, // 我的收藏
    { path: '/my', name: 'My', component: My, children: [{ path: '/my/order', component: MyOrder }, { path: '/my/browse', component: Browse, children: [{ path: ':id', component: Details }] }] }, // 我的收藏
    { path: '/shoppingPayMent', name: 'ShoppingPayMent', component: ShoppingPayMent },
    { path: '*', redirect: '/home' }
  ]
})
