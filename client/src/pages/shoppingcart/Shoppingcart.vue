<template>
    <div>
        <HeaderTitle title="购物车"/>
        <Card/>
    </div>
</template>

<script>
import HeaderTitle from 'pages/other/HeaderTitle'
import Card from './components/Card'
export default {
  components: {
    HeaderTitle,
    Card
  },
  data() {
    return {
      
    }
  },
  methods: {
    
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
  .shoptitle
    font-size: 30px
</style>
