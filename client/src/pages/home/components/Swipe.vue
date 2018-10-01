<template>
    <div>
        <van-swipe :autoplay="3000" class="swipe-item">
            <van-swipe-item class="van-swipe-item" v-for="(val,index) of slides" :key="index"><img :src="val.image"></van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem)
export default {
    name:'Swipe',
    props:['slides'],
    
}
</script>

<style lang="stylus" scoped>
    .swipe-item
        padding-bottom 0
        .van-swipe-item
            overflow hidden
            width 100%
            height 0
        img 
            width 100%
</style>

