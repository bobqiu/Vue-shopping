<template>
    <!-- 最近浏览 -->
<transition name='bounce'>
    <div class="browse-warp">
        <BaseTitle :back='back' title="最近浏览" @goBack='goBack'/>
        <Scroll :data='browse' class="scroll">
            <div>
                <GoodsList :list='browse' :isBrowse='isBrowse' @close='close' @datails='datails'/>
            </div>
            <div v-if="!browse.length" class="null">
                暂无最近浏览~~
            </div>
        </Scroll>
        <router-view/>
    </div>
</transition>     
</template>

<script>
import Scroll from 'pages/other/Scroll'
import BaseTitle from 'pages/other/BaseTitle'
import GoodsList from 'pages/other/GoodsList'
import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
    computed: {
        ...mapGetters(['browse'])
    },

    components: {
        Scroll,
        BaseTitle,
        GoodsList,
    },

    data() {
        return {
            back: true,
            isBrowse: true
        }
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },

        close(item) {
            this.deleteOne(item.id)
        },
        ...mapActions(['deleteOne','setBrowse']),

        datails(item) {
            this.setGoodDetails(item)
            this.$router.push({path:`/my/browse/${item.id}`})
            setTimeout(() => {
                this.setBrowse(item)     // 加入最近浏览
            }, 300);
        },

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

