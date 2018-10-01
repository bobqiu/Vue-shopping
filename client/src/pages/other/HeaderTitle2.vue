<template>
<div>
    <div class="header" v-show="showAbs" :style="opacityStyle">
        <div class="left" @click="back">
            <span class="iconfont">&#xe624;</span>
        </div>
        <div class="middle">
            景点详情
        </div>
    </div>
    <div class="icon" @click="back" v-show="!showAbs"><span class="fa fa-angle-left"></span></div>
</div>

</template>

<script>
export default {
    data() {
        return {
            focusTxt:true,
            showAbs:false,
            opacityStyle: {
                opacity: 0
            }
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        hiddleScroll() {
            let top = document.documentElement.scrollTop
            console.log(top);
            
            if (top > 40 ) {
                let opacity = top / 120
                opacity = opacity > 1 ? 1 : opacity
                this.opacityStyle = { opacity }
                this.showAbs = true
            } else {
                this.showAbs = false
            }
        }
    },
    // 页面展示
    // activated () {
    //     window.addEventListener('scroll',this.hiddleScroll)
    // },
    // // 页面即将被隐藏执行
    // deactivated () {
    //     window.removeEventListener('scroll',this.hiddleScroll)
    // }
}
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl';
    .header
        height 80px
        line-height 80px
        background $bgColor
        display flex
        align-items center
        color #fff
        position fixed
        top 0
        left 0
        right 0
        z-index 4000
        .left
            height 80px
            flex 0 0 80px
            text-align center
        .middle
            height 80px
            flex 1    
            text-align center
            margin-left -80px
            font-size 30px
    .icon
        width 70px
        height 70px
        border-radius 50%
        background rgba(0,0,0,.5)    
        position absolute
        top 2%
        left 2%
        text-align center
        line-height 70px
        z-index 4000
        span 
            color #fff
            font-size 50px
            position absolute
            top 50%
            left 50%
            transform translate3d(-50%,-50%,0)
</style>

