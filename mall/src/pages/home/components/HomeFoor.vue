<template>
    <div class="conintar">
        <Title :num='num' v-if="floorName" :floorName='floorName'/>
        <div class="foot-warpper" v-if="foor1 && foor1.length">
            <div class="foot-top ">
                <div class="foot-top-left border-right "><img :src="foor1[0].image"  @click="details(foor1[0].goodsId)"></div>
                <div class="foot-top-right">
                    <div class="border-bottom"><img :src="foor1[1].image" @click="details(foor1[1].goodsId)"></div>
                    <div class="border-bottom"><img :src="foor1[2].image" @click="details(foor1[2].goodsId)"></div>
                </div>
            </div>
            <div class="foot-bot border-top">
                <div><img :src="foor1[3].image" @click="details(foor1[3].goodsId)"></div>
                <div class="border-left"><img :src="foor1[4].image" @click="details(foor1[4].goodsId)"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Title from 'pages/other/Title'
import {mapMutations} from 'vuex'
export default {
    props:['floorName','foor1','num'],
    components: {
        Title
    },
    methods: {

        details(goodsId) {
            let a = {
                goodsId
            }
            this.setGoodDetails(a)
            this.$router.push({path:`/home/${goodsId}`})
        },

        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS'
        })
    }
}
</script>
<style lang="stylus" scoped>
@import '~css/mixin.styl';
    .foot-warpper
        display flex
        flex-direction column        
        .foot-top
            display flex
            .foot-top-left, .foot-top-right
                flex 1
            .foot-top-left
                img 
                    width 100%    
            .foot-top-right
                display flex
                flex-direction column
                img 
                    width 100%        
        .foot-bot
            display flex
            div 
                flex 1
                img 
                    width 100%            
</style>

