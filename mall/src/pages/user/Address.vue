<template>
<transition name='bounce'>
        <div class="address">
        <BaseTitle title="地址列表" :back='back' @goBack='goBack'/>
            <Scroll :data='list' class="scroll">
                <div>
                    <van-address-list
                        v-model="chosenAddressId"
                        :list="list"
                        @edit="onEdit"
                        @select='onSelect'
                    />
                </div>
                 <div v-if="!list || !list.length" class="nolist">
                    暂无收货地址~~
                </div>
            </Scroll>
           
        <div class="add" @click="onAdd">新增地址</div>
        </div>

</transition>  
</template>

<script>
import { AddressList,Toast  } from 'vant';
import BaseTitle from 'pages/other/BaseTitle'
import Vue from 'vue'
Vue.use(AddressList).use(Toast )
import Scroll from 'pages/other/Scroll'
import {mapActions} from 'vuex'
import axios from 'axios'
export default {
    components: {
        BaseTitle,
        Scroll,
    },

    data() {
        return {
            back: true, // 是否显示返回按钮
            chosenAddressId: '1',
            list: []
        }
    },

    methods: {
        onAdd() {
            this.$router.push('/user/addressEdit')
        },

        goBack() {
            this.$router.go(-1)
        },

        onEdit(item, index) {
            this.setAddress(item)
            this.$router.push('/user/addressEdit')
        },

        onSelect(item) {
            console.log(item);
        },
        
        ...mapActions(['setAddress'])
    },

    async created() {
        const res = await axios.get('/api/getAddress')
        this.list = res.data.address.reverse()
    },
    }
</script>

<style lang="stylus" scoped>
    .address
        position fixed
        top 0px
        left 0
        right 0
        bottom 0px
        z-index 200
        background #fff
        .scroll
            position fixed
            top 40px
            bottom 50px
            left 0
            right 0
            overflow hidden
            .nolist
                text-align center
                font-size 16px
                letter-spacing 2px
                color #bbb
                margin-top 50px
    .add
        height 50px
        position fixed
        left 0
        right 0
        bottom 0
        background #f44
        color #fff    
        text-align center
        font-size 15px
        letter-spacing 2px
        line-height 50px
        z-index 201
</style>

