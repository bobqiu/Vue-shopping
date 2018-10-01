<template>
     <div>
         <BaseTitle title="购物车"/>
         <div>
             <van-checkbox-group v-model="result">
                <van-checkbox v-for="(item, index) in list" :key="item" :name="item" class="list-warp">
                    <!-- 复选框 {{ item }} -->
                    <div>
                        <div class="middle">
                            <img src="http://images.baixingliangfan.cn/compressedPic/20180407172544_4503.jpg" alt="">
                        </div>
                        <!-- <div class="right">
                            <p>咖啡馆和会计师官方时刻记得哈哈港口建设规划空间时间开个会</p>
                        </div> -->
                    </div>
                </van-checkbox>
            </van-checkbox-group>
         </div>
     </div>
</template>

<script>
import BaseTitle from 'pages/other/BaseTitle'
import axios from 'axios'
import { Checkbox, CheckboxGroup } from 'vant';
import Vue from 'vue'
Vue.use(Checkbox).use(CheckboxGroup);
export default {
    components: {
        BaseTitle
    },

    data() {
        return {
        list: ['a', 'b', 'c'],
        result: ['a', 'b']
        };
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
.list-warp
    display flex
    align-items center
    .middle
        width: 80px;
        flex: 0 0 80px;
        border: 1px solid #eee;
        padding: 1px;
        box-sizing: border-box;
        img
            width: 100%;
    .right
        flex 1        
        display flex
        justify-content space-around
</style>

