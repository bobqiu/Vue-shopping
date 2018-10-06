<template>
    <!-- 我的订单列表 -->
<transition name='bounce'>
    <div class="order-warp">
        <BaseTitle :back='back' title="我的订单" @goBack='goBack'/>
        <Scroll v-show="!showFlag" :data='list' ref="scroll" class="scroll">
            <div class="wap">
                <div class="list-warp" v-for="(value,key) in list" :key="key"> 
                    <div class='top border-bottom'>
                        <div>订单编号: {{key}}</div>
                        <div class="order-ok">交易完成</div>
                    </div>
                    <div class="list" v-for="(val,index) in value.orderList" :key="val.order_id">
                        <img class="good-img" :src="val.image_path" :onerror="defaultImg">
                        <div class="good-title">{{val.name}}</div>
                        <div class="good-count">
                            <p>￥{{val.mallPrice}}</p>
                            <p class="count">x{{val.count}}</p>
                        </div>
                    </div>
                    <div class="timre bottom border-top">创建时间: {{value.createDate}}</div>
                    <div class="bottom">收货地址: {{value.address}}</div>
                    <div class="bottom">共{{value.orderList.length}}件商品   合计: {{value.totalPrice}}</div>
                </div>
            </div>
            <div v-if="!list && !showFlag" class="null">
                 {{userName&&!showFlag? '暂无订单~~' : '请先登录噢~~'}}
            </div>
         </Scroll>
         <BaseLoding :showFlag='showFlag'/>
    </div>
</transition>  
</template>

<script>
import BaseTitle from 'pages/other/BaseTitle'
import GoodsList from 'pages/other/GoodsList'
import Scroll from 'pages/other/Scroll'
import axios from 'axios'
import {mapGetters} from 'vuex'
import {loading} from 'js/mixin'
export default {
    mixins: [loading],
    data() {
        return {
            back: true,
            list: '',
            defaultImg: 'this.src="' + require('img/vue.jpg') + '"',
        }
    },

    computed: {
        ...mapGetters(['userName'])
    },

    components: {
        BaseTitle,
        GoodsList,
        Scroll
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },

        async getMyOrder() {
            if (!this.userName) {
                this.showFlag = false
                return
            }
            this.showFlag = true
            const res = await axios.get('/api/myOrder')
            if (res.data.status == 200) {
                this.showFlag = false
                this.list = res.data.list
            }
        }
    },

    created() {
        this.getMyOrder()
    },
}
</script>

<style lang="stylus" scoped>
.order-warp
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 500
    background #F2F2F2
    .scroll
        position fixed
        top 40px
        bottom 0px
        left 0
        right 0
        overflow hidden
        .wap
            padding 5px 0
            .list-warp
                margin 10px
                box-sizing border-box
                padding 15px 10px
                background #fff
                border-radius 10px
                .top
                    display flex
                    justify-content space-between
                    padding-bottom 10px
                    .order-ok
                        color #D2591B
                .list
                    display flex    
                    height 80px
                    margin-top 15px
                    font-size 0
                    .good-img
                        flex 0 0 80px
                        width 80px
                        height 100%
                        border-radius 10px
                        margin-right 10px
                        border 1px solid #eee
                    .good-title
                        flex 1
                        margin-top 3px
                        line-height 1.4
                        font-size 13px
                        letter-spacing 0.5px
                        margin-right 10px
                    .good-count
                        float 0 0 15%     
                        text-align right   
                        margin-top 5px
                        font-size 13px
                        .count
                            margin-top 5px
                            color #bbb
                .bottom
                    text-align right      
                    margin-top 10px    
                .timre
                    margin-top 10px
                    padding-top 10px
</style>

