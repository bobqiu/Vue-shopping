<template>
    <div class="warpper" v-show="category">
        <ul>
            <li v-for="val of category" :key="val.mallCategoryId">
                <img :src="val.image" alt="" srcset="">
                <p>{{val.mallCategoryName}}</p>
            </li>
        </ul>
        <div class="ad">
            <img :src="advertesPicture" alt="" srcset="">
        </div>
    </div>

</template>

<script>
export default {
    name:'Pane',
    props:['category','advertesPicture'],
    
}
</script>

<style lang="stylus" scoped>
.warpper
    background #EEEEEE
    padding 15px 0 25px 0
    ul
        width 95%
        margin 0 auto
        border-radius 10px
        padding 30px 30px 15px 30px
        box-sizing border-box
        display flex
        background #fff
        box-shadow 6px 8px 20px rgba(45,45,45,.15)
        li
            flex 1
            text-align center
            img
                width 70%
                margin-bottom 20px
            p
                font-size 28px
    .ad
        width 100%
        margin-top 20px
        img
            width 100%
</style>
