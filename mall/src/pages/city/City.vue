<template>
<transition name='bounce'>
    <div class="city-warp">
        <BaseTitle :back='back' title="城市列表" @goBack='goBack'/>
        <div class="serach">
            <van-col span="24">
                <van-search placeholder="请输入城市关键字" v-model="value" />
            </van-col>
        </div>
        <Scroll class="scroll" ref="scroll">
            <div>
                <div class="area">
                    <div class="title">当前城市</div>
                    <div class="button-list">
                        <div class="button-warpper">
                            <div class="button">北京</div>
                        </div>
                    </div>
                </div>
                <div class="area">
                    <div class="title border-topbottom">热门城市</div>
                    <div class="button-list">
                        <div class="button-warpper" v-for="val in city.data.hotCities" :key="val.id">
                            <div class="button" @click="selectCiti(val.name)">{{val.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="area" v-for="(val,key) of city.data.cities" :key="key" :ref="key">
                    <div class="title border-topbottom">{{key}}</div>
                    <div class="item-list" v-for="item in val" :key="item.id">   
                        <div class="item border-bottom" @click="selectCiti(item.name)">{{item.name}}</div>
                    </div>
                </div>
            </div>
        </Scroll>
        <CityRight @change='change' :cities='city.data.cities'/>
    </div>
</transition>   
</template>

<script>
import BaseTitle from 'pages/other/BaseTitle'
import { Field } from 'vant';
import CityRight from './components/CityRight'
import Scroll from 'pages/other/Scroll'
import Vue from 'vue'
Vue.use(Field);
import city from 'js/city'
export default {
    components: {
        BaseTitle,
        Scroll,
        CityRight
    },

    data() {
        return {
            back: true,
            value:'',
            city: city,
            touchStatus: false,
            citiTxt: ''
        }
    },

    computed:{
        citiesList() {
            let arr = []
            for(let k in city.data.cities) {
                arr.push(k)
            }
            return arr
        }
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },

        onSearch() {

        },

        selectCiti() {

        },

        citys() {

        },

        change(txt) {
            this.citiTxt = txt
        }
    },

    watch: {
        citiTxt() {
            if (this.citiTxt) {
                const element = this.$refs[this.citiTxt][0]
                this.$refs.scroll.scrollToElement(element,200)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.city-warp
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 500
    background #fff
    .scroll
        position fixed
        top 83px
        bottom 0px
        left 0
        right 0
        overflow hidden
        .title
            height 30px
            line-height 30px
            padding-left 10px        
            box-sizing border-box
            background #F2F2F2
        .button-list
            padding 5px 30px 5px 5px
            display flex
            justify-content space-between
            box-sizing border-box
            flex-wrap wrap
            .button-warpper
                flex 0 0 33.33%
                .button
                    text-align center
                    padding 5px 0
                    border-radius 2.5px
                    border 1px solid #ccc
                    margin 5px
        .item-list
            .item
                height 40px
                line-height 40px     
                padding-left 10px
                font-size 13px
                box-sizing border-box   
            &:last-child
            &:after    
                border 0
</style>

