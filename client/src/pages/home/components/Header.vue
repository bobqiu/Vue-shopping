<template>
    <div class="header">
        <div class="left">
            <span class="iconfont">{{city}}</span>
        </div>
        <div class="middle">
            <!-- <span class="iconfont" v-show="focusTxt">&#xe651;</span>
            <input type="text" @focus='focus' @blur="blur" :placeholder="txt"> -->
            <img :src="titleBg" alt="" srcset="">
        </div>

        <div class="right"><img :src="searchImg" alt="" srcset=""></div>
    </div>
</template>

<script>
import {getCurrentCityName} from 'js/getUserLocation'
export default {
    name:'Header',
    data() {
        return {
            txt:'输入城市/景点/游玩主题',
            focusTxt:true,
            city:'',
            titleBg:require('static/img/title.png'),
            searchImg:require('static/img/search.png')
        }
    },
    computed:   {
    },
    methods: {
        focus() {
            this.focusTxt = false
            this.txt = ''
        },
        blur() {
            this.txt = '输入城市/景点/游玩主题'
            this.focusTxt = true
        },
        caty() {
            this.$router.push({ path: '/city'})
        },
        getCurrentCity() {
            getCurrentCityName().then(city => {
                this.city = city
            })
        }
    },
    mounted() {
       this.getCurrentCity()
    }
}
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl';
    .header
        height 80px
        line-height 80px
        background $headerBg
        display flex
        align-items center
        padding: 0 30px
        color #000
        .left
            height 80px
            text-align left
            min-width 110px
            span
                font-size 28px
        .middle
            height 80px
            flex 1
            position relative
            text-align center
            img
                width 260px
        .right
            height 80px
            min-width 80px
            text-align center
            font-size 28px
            img
                width 50px
                height 50px

</style>
