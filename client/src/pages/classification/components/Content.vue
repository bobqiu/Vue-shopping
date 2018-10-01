<template>
    <div class="content">
      <div class="left" ref="left">
          <ul>
            <!-- <li><div>全部</div>   </li> -->
            <li v-for='val of listCommodity' :key='val.mallCategoryId'  v-if='currendIndex+1==val.mallCategoryId'>
              <div :class="leftTabIndex==index?'active':''" v-for='(item,index) of val.bxMallSubDto' @click='items(index,item.mallSubId)'>{{item.mallSubName}}</div>
            </li>
          </ul>
      </div>
      <div class="right" ref='right'>
        <div>
          <Panl/>
          <div class="empty" v-if='!tabList.length || !tabList'>
              暂无数据~~
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapGetters,mapMutations} from 'vuex'
import axios from 'axios'
import Panl from 'pages/other/Panl'
  export default {
    data() {
      return {
      }
    },
    components: {
        Panl,
    },
    computed: {
      ...mapGetters(['listCommodity','currendIndex','leftTabIndex','tabList','tabArr'])
    },
    methods: {
        async items(index,id) {
          if (this.leftTabIndex == index) {
            return
          }
          this.leftTabIndexs(index)
          this.scroll.scrollTo(0,0,300)
          let res = await axios.get(`/api/classification?mallSubId=${id}`)
          if (res.data.code == 1) {
            this.tabLists(res.data.dataList)
          }
         
        },
        ...mapMutations({
          leftTabIndexs:'LEFTTABINDEX',
          tabLists:'TABLIST'
        })
    },
    mounted () {
        this.scroll = new BScroll(this.$refs.right)
        this.items(0,this.tabArr[this.currendIndex])
    },
  }
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
  .content
    display: flex
    position: fixed
    top 170px
    left 0
    right: 0
    bottom: 0
    background: #EFEFEF
    .left
      flex: 0 0 160px
      background: #fff
      margin-top: 10px
      padding-bottom 110px
      height 100%
      overflow hidden
      ul
        height 100%
        overflow hidden
        li
          color: #666
          height: 90px
          line-height: 90px
          font-size: 28px
          div
            padding: 0 0px 0 10px
            border-bottom: 2px solid #EFEFEF
        .active
          background: #efefef
    .right
      flex: 1
      .empty
        text-align: center
        font-size: 30px
        padding-top: 100px
      
</style>
