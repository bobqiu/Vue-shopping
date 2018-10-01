<template>
  <div  class="van-toast van-toast--text van-toast--middle">
      <div :style="isShow==0?'diaplay:none':''">{{tip}}</div>
  </div>
</template>
<script>
export default {
  props: ['tip','timer'],
  name: "Toast",
  data() {
    return {
      isShow:1
    }
  },
  created() {
    console.log(this.timer);
    setTimeout(() => {
      this.isShow = 0
    },this.timer)
  },
}
</script>
<style lang="stylus" scoped>
  .van-toast
    position: fixed;
    z-index:2000
    top: 50%;
    left: 50%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    color: #fff;
    font-size: 24px;
    line-height: 1.2;
    border-radius: 5px;
    word-break: break-all;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    box-sizing: border-box;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: rgba(0, 0, 0, .7);
    padding: 24px;
    min-width: 440px;

</style>
