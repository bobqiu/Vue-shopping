<template>
    <div  v-show="hot">
        <Title v-if="floorName" :floorName='floorName'/>
        <ul>
            <li class="recommend-item" v-for="val of hot" :key="val.goodsId" @click="details(val.goodsId)">
                <img v-lazy="val.image" class="recommend-img">
                <p class="name">{{val.name}}</p>
                <p class="price"><span class="code">￥</span><span class="mallPrice">{{val.mallPrice}}</span><span class="price-min">{{val.price}}</span></p>
            </li>
        </ul>
    </div>
</template>

<script>
import Title from 'pages/other/Title'
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
export default {
    props:['hot'],
    data () {
        return {
            floorName:'热销商品',
        }
    },
    components: {
        Title
    },
    methods: {
        details(id) {
             this.$router.push({path:`/detail/${id}`, params: { id: id }})
            
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';
ul
    display flex
    flex-wrap wrap
    .recommend-item
        flex 0 0 50%
        width 50%!important
        margin-right 0!important
        overflow hidden
        text-align center
        padding-bottom 10px
        .recommend-img
            width 80%
        .name
            padding 10px 15px 0 15px
            color $bgColor
            font-size 28px    
            ellipsis()
        .price
            color $bgColor
            padding-top 10px
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
</style>

