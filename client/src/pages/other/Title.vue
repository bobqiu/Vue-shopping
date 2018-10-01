<template>
    <div class="title" v-show="floorName">
            <span v-show="num">{{num}}F</span>
            {{floorName}}
    </div>
</template>

<script>
export default {
    props:['floorName','num'],
}
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl';
    .title
        background $bgColor2
        height 80px
        line-height 80px
        text-align center
        color $bgColor 
        font-size 30px
        position relative
        span 
            position absolute
            top 50%
            margin-left -40px
            transform translateY(-50%)
            background $bgColor
            display inline-block
            border-radius 50%
            width 34px
            height 34px
            line-height 34px
            color #fff
            font-size 24px
</style>

