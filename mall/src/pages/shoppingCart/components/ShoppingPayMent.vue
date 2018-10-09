<template>
    <!-- 订单结算和选择商品页面 -->
<transition name='bounce'>
    <div class="order">
        <BaseTitle :back='back' title="订单结算" @goBack='goBack'/>
                <div class="address-warp">
                    <div class="address addnull" v-if=" !temporaryAddress || !temporaryAddress.id" @click="goAddress">
                        点击添加收获地址
                    </div>
                    <div class="address" v-else @click="editAddress">
                        <div class="icon"><van-icon name="location" class="location"/></div>
                        <div class="address-cont">
                            <p class="name">收货人: {{temporaryAddress.name}} <span>{{temporaryAddress.tel}}</span></p>
                            <p class="address-e">收货地址: {{temporaryAddress.address}}</p>
                            <p class="no">(收货不便时,可选择免费待收货服务)</p>
                        </div>
                        <div class="icon2"><van-icon name="arrow" class="location"/></div>
                    </div>
                    <img :src="caitiao" width="100%" height="3px" alt="" class="caitiao">
                <Scroll :data='shopOrderList' ref="scroll" class="scroll">
                    <div class="goods-list">
                        <GoodsList :list='shopOrderList' :isOrder='isOrder'/>
                    </div>
                </Scroll>
            </div>
        
        <div v-if="shopOrderList && shopOrderList.length">
            <van-submit-bar
                :loading='isLoading'
                :price="price"
                button-text="提交订单"
                @submit="onSubmit"
            />
        </div>
    </div>
</transition>      
</template>

<script>
import GoodsList from 'pages/other/GoodsList'
import BaseTitle from 'pages/other/BaseTitle'
import {mapGetters,mapMutations} from 'vuex'
import Scroll from 'pages/other/Scroll'
import {Toast} from 'vant'
export default {
    components: {
        BaseTitle,
        GoodsList,
        Scroll,
    },

    computed: {
        ...mapGetters(['shopOrderList','temporaryAddress']),

        price() {
            let num = 0
            if (this.shopOrderList.length) {
                    this.shopOrderList.forEach( item => {
                    num += item.present_price * item.count
                })
                return Number( num.toFixed(2) * 100)
            }
        }
    },

    data() {
        return {
            back: true,
            caitiao: require('img/caitiao.jpg'),
            isOrder: true,
            isLoading: false,
            list: []
        }
    },

    methods: {
        goBack() {
            this.$router.go(-1)
            setTimeout(() => {
                this.setShopList([])
            }, 300);
        },

        async onSubmit() {
            if (!this.temporaryAddress || !this.temporaryAddress.id) {
                Toast('请添加收获地址')
                return
            }
            this.isLoading = true
            // 传地址id，订单id，和总价格
            let Addressid = 123456745;
            let orderId = []
            this.shopOrderList.forEach( item => {
                orderId.push(item.id)
            })
            const res = await this.$http.post('/api/order',{
                address: this.temporaryAddress.address,
                tel: this.temporaryAddress.tel,
                orderId,
                totalPrice: (this.price / 100).toFixed(2)
            })
            if (res.data.status == 200) {
                this.isLoading = false
                Toast(`结算成功,一共${(this.price / 100).toFixed(2)}元`)
                setTimeout(() => {
                    this.setShopList([])
                    this.$router.push({path: '/'})
                }, 1000);
            }
        },

        ...mapMutations({
            setShopList: 'SHOPORDERLIST'
        }),

        // 添加收货地址
        goAddress() {
            this.$router.push({path: '/user/address'})
        },

        // 选择地址
        editAddress() {
            this.$router.push({path:'/user/address'})
        }
    }
}
</script>

<style lang="stylus" scoped>
.order
    position fixed
    top 0px
    left 0
    right 0
    bottom 0px
    z-index 500
    background #fff
    .scroll
        position fixed
        top 148px
        bottom 50px
        left 0
        right 0
        overflow hidden
    .address-warp
        .caitiao
            margin-top -10px
        .addnull
            align-items center
            padding 0!important   
            justify-content center
            font-size 14px
        .address
            display flex
            height 90px
            padding 10px
            padding-bottom 0
            background #fff
            .icon
                flex 0 0 30px 
                width 30px
                align-self center
                margin-right 8px
                .location
                    font-size 24px
            .address-cont
                flex 1
                display flex
                flex-direction column
                justify-content space-around    
                .name
                    font-size 15px
                    span 
                        float right 
                        margin-right 10px
                .address-e
                    font-size 12px
                    margin-right 5px
                    line-height 1.4       
                .no
                    color #F9CC9D
                    font-size 12px     
                    letter-spacing 1px
                    margin-top -5px
            .icon2
                flex 0 0 10px
                align-self center 
        .goods-list
            background #fff                   
</style>
