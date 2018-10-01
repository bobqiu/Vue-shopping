<template>
    <div>
        <HeaderTitle title="商品分类"/>
        <Tab/>
        <Content/>
    </div>
</template>

<script>
import Tab from './components/Tab'
import Content from './components/Content'
import HeaderTitle from 'pages/other/HeaderTitle'

export default {
  components: {
    HeaderTitle,
    Tab,
    Content,
  }
}
</script>

<style>

</style>
