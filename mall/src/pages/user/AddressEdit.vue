<template>
<transition name='bounce2'>
    <!-- 新增和编辑地址 -->
    <div class="address-edit">
        <BaseTitle title="地址列表" :back='back' @goBack='goBack'/>
        <div>
            <van-address-edit
                :area-list="areaList"
                :show-delete='showDelete'
                show-set-default
                show-search-result
                :addressInfo='addressInfo'
                :search-result="searchResult"
                @save="onSave"
                @delete="onDelete"
            />
        </div>
    </div>
</transition>  
</template>

<script>
import BaseTitle from 'pages/other/BaseTitle'
import { AddressEdit,Area,Toast  } from 'vant'
import Vue from 'vue'
Vue.use(AddressEdit).use(Area ).use(Toast)
import {mapGetters,mapMutations,mapActions} from 'vuex'
import axios from 'axios'
export default {
    computed: {
        ...mapGetters(['userName','addressInfo'])
    },

    data() {
        return {
            searchResult: [],
            back: true,
            areaList: require('js/area.js').default,
            showDelete: false
        }
    },

    created() {
        if (this.addressInfo) {
            this.showDelete = true
        }
    },

    components: {
        BaseTitle,
    },

    methods: {
        async onSave(val) {
            const res = await axios.post('/api/address',{
                username: this.userName,
                name: val.name,
                tel: val.tel,
                address: val.province + val.city + val.county + val.addressDetail,
                isDefault: val.isDefault,
                province: val.province,
                city: val.city,
                county: val.county,
                addressDetail: val.addressDetail,
                areaCode: val.areaCode,
                id: this.addressInfo ? this.addressInfo.id : undefined  // 修改地址时候要传id
            })
            if (res.data.status == 200) {
                Toast(res.data.msg);
                 setTimeout(() => {
                    this.$router.go(-1)
                    this.clearAddress('')
                }, 1000);
            } else {
                this.$router.push('/user/login')
            }
           
            
            
        },
        async onDelete(val) {
            const res = await axios.post('/api/deleteAddress',{
                id: val.id
            })
            if (res.data.code == 200) {
                Toast(res.data.msg);
                setTimeout(() => {
                    this.$router.go(-1)
                    this.clearAddress('')
                }, 1000);
            }else {
                this.$router.push('/user/login')
            }
        },
        
        goBack() {
            this.$router.go(-1)
            this.clearAddress('')
        },

        ...mapActions(['clearAddress']),

        
    }
}
</script>

<style lang="stylus" scoped>
.address-edit
    position fixed
    top 0px
    left 0
    right 0
    bottom 0
    z-index 200
    background #fff
.bounce2-enter-active {
    animation: bounce-in .3s;
        }
    .bounce2-leave-active {
            animation: bounce-in .3s reverse;
            }
    @keyframes bounce-in {
    0% {
        transform: translate3d(-100%,0,0)
        }
    
    100% {
        transform: translate3d(0,0,0)
        }
}     
</style>