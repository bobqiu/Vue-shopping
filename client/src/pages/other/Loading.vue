<template>
<div class="loading" v-show="isShow">
        <van-loading color="white" />
    </div>
</template>

<script>
import Vue from 'vue'
import { Loading } from 'vant';
Vue.use(Loading);
export default {
    props: ['isShow']
}
</script>

<style lang="stylus" scoped>
       .loading
        position fixed
        width 100%
        left 0
        right 0
        bottom 0
        top 0
        background rgba(0,0,0,.4)
        z-index 1000
        .van-loading
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
            width 150px
            height 150px
</style>

