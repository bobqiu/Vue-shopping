<template>
    <!-- 最近浏览 -->
<transition name='bounce'>
    <div class="browse-warp">
        <BaseTitle :back='back' title="我的收藏" @goBack='goBack'/>
        <Scroll v-show="!showFlag" :data='list' class="scroll">
            <div>
                <GoodsList :list='list' :isCollection='isCollection' @datails='datails' @close='close'/>
            </div>
            <div v-if="!list.length" class="null">
                 {{userName&&!showFlag? '暂无收藏~~' : '请先登录噢~~'}}
            </div>
        </Scroll>
        <router-view/>
         <BaseLoding :showFlag='showFlag'/>
    </div>
</transition>     
</template>

<script>
import Scroll from 'pages/other/Scroll'
import BaseTitle from 'pages/other/BaseTitle'
import GoodsList from 'pages/other/GoodsList'
import axios from 'axios'
import {loading} from 'js/mixin'
import {Toast} from 'vant'
import {mapActions,mapMutations,mapGetters} from 'vuex'
export default {
    mixins: [loading],
    components: {
        Scroll,
        BaseTitle,
        GoodsList,
    },

    computed: {
        ...mapGetters(['userName'])
    },

    data() {
        return {
            back: true,
            isCollection: true,
            list: [],
            isText: false
        }
    },

    created() {
        this.getCollection()
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },

        getCollection() {
            if (!this.userName) {
                this.showFlag = false
                return
            }
            this.showFlag = true
            axios.get('/api/collection/list').then( res => {
                if (res.data.status == 200) {
                    this.showFlag = false
                    this.list = res.data.collection
                } else {
                    this.isText = true
                }
            })
        },

        datails(item) {
            this.setGoodDetails(item)
            this.$router.push({path:`/user/collection/${item.id}`})
            setTimeout(() => {
                this.setBrowse(item)     // 加入最近浏览
            }, 300);
        },

        // 这里是取消收藏
        close(item,index) {
            // this.deleteOne(item.id)
            this.list.splice(index,1)
            axios.post('/api/cancelCollection',{id: item.id}).then(res => {
                console.log(res);
                if (res.data.status == 200) {
                    Toast(res.data.msg);
                }
            })
        },

        ...mapActions(['setBrowse']),

        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS'
        }),
    }
}
</script>

<style lang="stylus" scoped>
.browse-warp
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 500
    background #fff
    .scroll
        position fixed
        top 40px
        bottom 0px
        left 0
        right 0
        overflow hidden
        

</style>

