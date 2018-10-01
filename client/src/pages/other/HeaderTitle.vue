<template>
        <div class="title border-bottom">
          <div class="fa fa-search fa-3x">
          </div>
          <div class="shoptitle">
            {{title}}
          </div>
          <div class=" fa fa-weixin fa-3x">
          </div>
        </div>
</template>

<script>
export default {
  props:['title'],
  data() {
    return {
      shop:require('static/img/shop.png'),
    }
  },
  methods: {
    goshop() {
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style scoped lang="stylus">
.title
  height: 80px
  line-height: 80px
  background: #fff
  display: flex
  padding: 0 30px
  align-items: center
  justify-content: space-between
  position: fixed
  top 0
  left: 0
  right: 0
  background: #fff
  z-index: 99
  .shoptitle
    font-size: 30px
</style>
