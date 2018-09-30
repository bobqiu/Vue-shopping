<template>
    <div>
        <BaseTitle title='商品分类'/>
        <div class="content">
           <div class="left" ref="left">
                <ul>
                    <li v-for='(val,index) in category' :key='val.mallCategoryId'  :class="{active:leftTabIndex==index}" @click="item(val,index)">
                        {{val.mallCategoryName}}
                    </li>
                </ul>
            </div>
            <div class="right" ref='right'>
                <div class="empty">
                        <van-tabs v-model="active" @click="onClick" swipeable @change='change'>
                                <Scroll :data='dataList' class="scroll" ref="scroll" :bounce='bounce' >
                                    <div>
                                        <van-tab v-for="val in list || category[0].bxMallSubDto" :title="val.mallSubName" :key="val.mallSubId">
                                            <GoodsList :list='dataList' @datails='datails'/>
                                        </van-tab>
                                    </div>
                                </Scroll>
                            
                            </van-tabs>
                        <div class="null" v-show="!dataList.length">
                            暂无数据~~
                        </div>
                   
                </div>
            </div> 
        </div>
        <router-view />
    </div>
</template>
<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import { Tab, Tabs  } from 'vant';
import axios from 'axios'
import Vue from 'vue'
import Scroll from 'pages/other/Scroll'
import GoodsList from 'pages/other/GoodsList'
Vue.use(Tab).use(Tabs)
import BaseTitle from 'pages/other/BaseTitle'
export default {
    computed: {
        ...mapGetters(['category'])
    },

    data() {
        return {
            leftTabIndex: 0,
            list: '',
            active: 0,
            dataList: [],
           
            bounce: {
                top:false,
            },
            isLoading: false,
            defaultId : '2c9f6c946016ea9b016016f79c8e0000'
        }
    },

    components: {
        Scroll,
        BaseTitle,
        GoodsList,
    },

    methods: {
        item(val,i) {
            this.active = 0
            this.list = val.bxMallSubDto
            if (this.leftTabIndex == i) return
            this.leftTabIndex = i
            this.getList(val.bxMallSubDto[0].mallSubId)
            this.$refs.scroll.scrollTo(0,0,300)
        },

        onClick(index) {
            const mallSubId = this.category[this.leftTabIndex].bxMallSubDto[index].mallSubId
            this.getList(mallSubId)
        },

        change(index) {
            this.onClick(index)
        },

        getList(id) {
            axios.get(`/api/classification?mallSubId=${id}`).then(res => {
                if (res.data.code == 200) {
                    this.dataList =  res.data.dataList
                }
            })
        },

        datails(val) {
            this.setBrowse(val)     // 加入最近浏览
            this.setGoodDetails(val)
            this.$router.push({path:`/category/${val.id}`})
        },

        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS'
        }),

        ...mapActions(['setBrowse'])
    },

    created() {
        this.getList(this.defaultId)
    },
}
</script>

<style scoped lang="stylus">
.content
    display: flex
    position: fixed
    top 40px
    left 0
    right: 0
    bottom: 0
    background: #EFEFEF
    .left
        flex: 0 0 80px
        background: #F1F8FF
        padding-bottom 55px
        height 100%
        overflow hidden
        ul
            height 100%
            overflow hidden
        .active
            background: #fff
        li
            color: #666
            height: 43px
            line-height: 43px
            font-size: 14px
            text-align center
            border-bottom: 1px solid #EFEFEF
    .right
        flex: 1
        .empty
            text-align: center
            font-size: 15px
            .null
                padding-top 30px
                box-sizing border-box
                color #bbb
            .scroll
                height 100%
                overflow hidden

</style>
