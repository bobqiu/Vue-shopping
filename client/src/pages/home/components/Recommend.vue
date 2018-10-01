<template>
      <!-- swiper -->
      <div class="swiper-warpper" v-show="recommend">
        <div class="title border-bottom">商品推荐</div>
        <swiper :options="swiperOption">
            <swiper-slide v-for="val of recommend" :key="val.goodsId" class="recommend-item border-right">
                <img v-lazy="val.image" class="recommend-img">
                <p class="name">{{val.goodsName}}</p>
                <p class="price"><span class="code">￥</span><span class="mallPrice">{{val.mallPrice}}</span><span class="price-min">￥{{val.price}}</span></p>
                <div class='panl'>
                    <div class="left fa fa-shopping-cart fa-2x" @click="addShops(val)"></div>
                    <div class="right">立即购买</div>
                </div>
            </swiper-slide>
        </swiper>
        <Toasts  :tip='tip' v-show="toastShow"/>
      </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { Toast } from 'vant';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import Toasts from 'pages/other/Toast';
import {addShop} from 'js/getUserLocation'
export default {
    props:['recommend'],
    name:'Recommend',
    data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        tip: '加入购物车成功~~',
        toastShow: false
      }
    },
    components: {
      Toasts
    },
    methods: {
        addShops(val) {
            addShop(val,this)
        }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';
.swiper-warpper >>> .van-toast--default
    height 240px
    width 240px
.swiper-warpper >>>  .van-toast--default .van-toast__icon
    font-size 100px
.swiper-warpper >>> .van-toast--default .van-toast__text
    font-size 28px
.title
    color $bgColor
    height 70px
    line-height 70px
    padding-left 30px
    box-sizing border-box
    font-size 30px
.recommend-item
    width 33.33%!important
    margin-right 0!important
    overflow hidden
    text-align center
    padding-bottom 10px
    .recommend-img
        width 80%
    .name
        padding 10px 0px 0 15px
        color $fsColor
        font-size 28px
        ellipsis()
        text-align left
    .price
        color $picColor
        padding 10px 0 0 15px
        text-align left
        .code
            font-size 26px
        .mallPrice
            font-size 30px
        .price-min
            font-size 24px
            text-decoration:line-through
            color #999
            display inline-block
            margin-left 10px
    .panl
        padding 0 15px 0 15px
        display: flex
        margin-top: 20px
        .left
          width: 30%
          padding: 15px
          background: #FECA3A
          border-radius: 10px 0 0 10px
          color: #Fff
          box-sizing: border-box
        .right
          width: 70%
          text-align: center
          padding: 15px
          font-size: 23px
          background: $picColor
          color: #fff
          border-radius: 0 10px 10px 0
          box-sizing: border-box
</style>
