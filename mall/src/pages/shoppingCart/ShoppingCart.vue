<template>
     <div>
         <BaseTitle title="购物车"/>
     </div>
</template>

<script>
import BaseTitle from 'pages/other/BaseTitle'
import axios from 'axios'
export default {
    components: {
        BaseTitle
    },

    methods: {
        async getShopList() {
            const res = await axios.get('/api/getShop')
        }
    },

    created() {
        this.getShopList()
    },
}
</script>

<style lang="stylus" scoped>

</style>

