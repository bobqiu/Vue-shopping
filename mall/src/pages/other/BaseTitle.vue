<template>
    <div class="title border-bottom">
        <div class="left" v-if="back" @click="goBack"><van-icon name="arrow-left" /></div>
        <div class="shoptitle">{{title}}</div>
    </div>
</template>

<script>
import { Icon } from 'vant';
import Vue from 'vue'
Vue.use(Icon);
export default {
    props: {
        title: {
            type: String,
            default: ''
        },

        back: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        goBack() {
            this.$emit('goBack')
        }
    }
}
</script>

<style lang="stylus" scoped>
.title
  height 40px
  line-height 40px
  background #fff
  text-align center
  padding 0 15px
  position relative
  z-index 400
  .left
    position absolute
    left 0px
    width 40px
    i 
        font-weight 700
  .shoptitle
    font-size: 15px
</style>
