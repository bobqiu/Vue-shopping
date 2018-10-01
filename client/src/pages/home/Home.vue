<template>
    <div class="warpper">
        <Loading :isShow='loading'/>
        <HomeHeader/>
        <Swipe :slides='slides'/>
        <Pane :category='category' :advertesPicture='advertesPicture'/>
        <Recommend :recommend='recommend'/>
        <div class="foot-warpper">
            <Foor :floorName='floorName.floor1' :foor1='foor1' :num='num1'/>
            <Foor :floorName='floorName.floor2' :foor1='foor2' :num='num2'/>
            <Foor :floorName='floorName.floor3' :foor1='foor3' :num='num3'/>
        </div>
        <Hotgoods :hot='hot'/>
    </div>
</template>

<script>
import HomeHeader from './components/Header'
import Swipe from './components/Swipe'
import Pane from './components/Pane'
import Recommend from './components/Recommend'
import Foor from './components/Foor'
import Hotgoods from './components/Hotgoods'
import Loading from 'pages/other/Loading'
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
    components: {
        HomeHeader,
        Swipe,
        Pane,
        Recommend,
        Foor,
        Hotgoods,
        Loading,

    },
    data () {
        return {
            slides:[],  // 轮播
            category:'', //轮播下面的列表
            advertesPicture:'', //提示广告
            recommend:'',    //推荐
            floorName:'',   //休闲商品推荐
            foor1:'',       //推荐的商品详情
            foor2:'',
            foor3:'',
            num1:1,
            num2:2,
            num3:3,
            hot:'', //热销商品
            loading:false,
            tabArr:[],  //用来存储tab首次加载数据的id
        }
    },
    methods: {
        async getData() {
            this.loading = true
            let res = await axios.get('/api/recommend')
			console.log(res.data.code)
            let data
            if (res.data.code == 1) {
            	console.log(res.data)
                data = res.data.data[0]
                this.loading = false
            }
            this.slides = data.slides   //轮播
            this.category = data.category//轮播下面的列表
            this.advertesPicture = data.advertesPicture.PICTURE_ADDRESS//提示广告
            this.recommend = data.recommend //推荐
            this.floorName = data.floorName //推荐的商品名字
            this.foor1 = data.floor1    //推荐的商品详情
            this.foor2 = data.floor2
            this.foor3 = data.floor3
            this.hot = data.hotGoods
            this.listCommodity(data.category)
            data.category.forEach( item => {
                this.tabArr.push(item.bxMallSubDto[0].mallSubId)
            })
            this.tabArrs(this.tabArr)
        },
        ...mapMutations({
            listCommodity:'LISTCOMMODITY',   //存储轮播下面的列表
            tabArrs:'TABARR'
        })
    },
    created() {
        this.getData()
    }
}
</script>


<style lang="stylus" scoped>
   .warpper
       padding-bottom 100px

</style>
