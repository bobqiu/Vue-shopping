<template>
      <!-- swiper -->
      <div class="swiper-warpper" v-show="recommend">
        <div class="title border-bottom">商品推荐</div>
        <swiper :options="swiperOption">
            <swiper-slide v-for="val of recommend" :key="val.goodsId" class="recommend-item border-right">
                <img :src="val.image" class="recommend-img" @click="details(val)">
                <p class="name">{{val.goodsName}}</p>
                <p class="price"><span class="code">￥</span><span class="mallPrice">{{val.mallPrice}}</span><span class="price-min">￥{{val.price}}</span></p>
                <div class='panl'>
                    <div class="left" @click="addShops(val)">
                        <van-icon name="shopping-cart" />
                    </div>
                    <div class="right" @click="details(val)">查看详情</div>
                </div>
            </swiper-slide>
        </swiper>
      </div>
</template>

<script>
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper' //轮播图
import {  Icon  } from 'vant';
Vue.use(VueAwesomeSwiper).use(Icon )
import {details} from 'js/mixin'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
    mixins: [details],
    props:['recommend'],
    name:'Recommend',
    computed: {
        ...mapGetters(['userName'])
    },

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
 
    methods: {
        addShops(val) {
            if (!this.userName) {
                this.$router.push({path:'/user/login'})
                return
            }
            console.log(val);
            
            // addShop(val,this)
        }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~css/mixin.styl';
.title
    color $bgColor
    height 35px
    line-height 35px
    padding-left 15px
    box-sizing border-box
    font-size 15px
.recommend-item
    width 33.33%!important
    margin-right 0!important
    overflow hidden
    text-align center
    padding-bottom 5px
    .recommend-img
        width 80%
    .name
        padding 5px 0px 0 7.5px
        color $fsColor
        font-size 13px
        ellipsis()
        text-align left
    .price
        color $picColor
        padding 5px 0 0 7.5px
        text-align left
        .code
            font-size 14px
        .mallPrice
            font-size 15px
        .price-min
            font-size 12px
            text-decoration:line-through
            color #999
            display inline-block
            margin-left 5px
    .panl
        padding 0 7.5px 0 7.5px
        display: flex
        margin-top: 10px
        .left
          width: 30%
          padding: 7.5px
          background: #FECA3A
          border-radius: 5px 0 0 4px
          color: #Fff
          box-sizing: border-box
        .right
          width: 70%
          text-align: center
          padding: 10px
          font-size: 12px
          background: #ff4c38
          color: #fff
          border-radius: 0 5px 5px 0
          box-sizing: border-box
</style>
