<template>
    <ul>
        <li v-for='(val,index) of tabList' :key='val.id' @click="details(val)">
            <div class="">
            <img v-lazy="val.image">
            </div>
            <p class="name">{{val.name}}</p>
            <p class="price"><span class="code">￥</span><span class="mallPrice">{{val.present_price}}</span><span class="price-min">￥{{val.orl_price}}</span></p>
        </li>
        
</ul>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
    computed: {
        ...mapGetters(['tabList'])
    },
    methods: {
        details(val) {
            this.detail(val)
            this.$router.push({path:`/detail/${val.id}`, params: { id: val.id }})
        },
        ...mapMutations({
            detail:'DETAIL'
        })
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
ul
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    padding-bottom: 110px
    li
        flex 0 0 48%
        background: #fff
        margin-top: 10px
        padding-bottom: 15px
        div
            overflow: hidden
            height: 0
            padding-bottom: 100%
        img
            width: 100%
        .name
            padding: 0 10px
            text-align: left
            color: $picColor
            margin-top: 10px
            font-size: 28px
        .price
            color $picColor
            padding 10px 0 0 15px
            text-align center
            margin-top: 10px
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

