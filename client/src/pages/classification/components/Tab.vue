<template>
    <div class="tab">
      <div class="item" :class="currendIndex==index?'active':''" v-for='(val,index) in listCommodity' :key='val.mallCategoryId' @click='tabs(index)'>{{val.mallCategoryName}}</div>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import axios from 'axios'

  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(['listCommodity','tabArr','currendIndex'])
    },
    methods: {
      async tabs(index) {
        if (this.currendIndex == index) {
          return
        }
        this.currendIndexs(index)
        this.leftTabIndexs(0)
        this.tabList(0)
        let res = await axios.get(`/api/classification?mallSubId=${this.tabArr[index]}`)
        if (res.data.code == 1) {
          this.tabList(res.data.dataList)
        }
      },
      ...mapMutations({
        currendIndexs:'CURRENDINDEX',
        leftTabIndexs:'LEFTTABINDEX',
        tabList:'TABLIST'
      })
    }
  }
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
  .tab
    margin-top: 80px
    height: 90px
    line-height: 90px
    display: flex
    position: relative
    background: #fff
    z-index: 99
    div
      color: #666
      flex 1
      text-align: center
      font-size: 28px
    .active
      border-bottom: 6px solid $bgColor
</style>
