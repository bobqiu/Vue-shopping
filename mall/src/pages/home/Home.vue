<template>
 <div>
    <div class="home">
        <div class="header">
            <van-row>
                <div @click="cityClick" >
                <van-col span="5" class="city">{{city}} ▼</van-col>
                </div>
                <van-col span="19">
                    <van-search
                        v-model="value"
                        placeholder="请输入搜索关键词"
                        show-action
                        @search="onSearch"
                        >
                        <div slot="action" @click="onSearch">搜索</div>
                    </van-search>
                </van-col>
            </van-row>
        </div>
    <div v-show="!showFlag" class="content" @touchmove.prevent='touchmove' @touchstart.prevent='touchstart' @touchend.prevent='touchend'>
        <Scroll :listenScroll='listenScroll' @scroll='scroll' :probeType='probeType'  :data='recommend.hotGoods' class="content-scroll" :bounce='bounce' ref="scroll">
            <div>
                <div class="swiper">
                    <van-row>
                        <van-swipe :autoplay="6000">
                            <van-swipe-item v-for="(val, index) in recommend.slides" :key="val.goodsId">
                                <img :src="val.image" class="swiper-img" @click="details(val)"/>
                            </van-swipe-item>
                        </van-swipe>
                    </van-row>    
                </div>
                <div class="panl">
                    <ul v-show="recommend.category && recommend.category.length">
                        <li v-for="val of recommend.category" :key="val.mallCategoryId">
                            <img :src="val.image" alt="" srcset="">
                            <p>{{val.mallCategoryName}}</p>
                        </li>
                    </ul>
                    <div class="ad">
                        <img :src="advertesPicture" alt="" srcset="">
                    </div>
                </div>
                <HomeRecommend :recommend='recommend.recommend'/>
                <HomeFoor :floorName='floorName.floor1' :foor1='recommend.floor1' :num='num1'/>
                <HomeFoor :floorName='floorName.floor2' :foor1='recommend.floor2' :num='num2'/>
                <HomeFoor :floorName='floorName.floor3' :foor1='recommend.floor3' :num='num3'/> 
                <HomeHot :hot='recommend.hotGoods'/>
            </div>
        </Scroll>
         <BaseRefresh :opacity='opac' :transformY='transformY' :rotate='rotate' :isRotate='isRotate' :trans='trans'/>
     </div>
</div>
     <BaseLoding :showFlag='showFlag'/>
     <router-view/>

 </div>

</template>

<script>
import HomeRecommend from './components/HomeRecommend'
import HomeFoor from './components/HomeFoor'
import HomeHot from './components/HomeHot'
import Scroll from 'pages/other/Scroll'
import BaseRefresh from 'pages/other/BaseRefresh'
import {mapActions,mapMutations,mapGetters} from 'vuex'
import {loading} from 'js/mixin'
export default {
    mixins: [loading],
    data() {
        return {
            value: '',
            recommend: {},
            advertesPicture: '',
            num1: 1,
            num2: 2,
            num3: 3,
            bounce: {
                top:false,
            },
            probeType: 3,
            listenScroll: true,
            floorName: '',
            touch: {},
            transformY: 0,
            rotate: 0,
            isRotate: false,
            trans: false,
            opac: 0,
            currentCity: ''
        }
    },
    
    components: {
        HomeRecommend,
        HomeFoor,
        HomeHot,
        Scroll,
        BaseRefresh,
    },

    computed: {
        ...mapGetters(['city'])
    },

    methods: {
        onSearch() {
            console.log('搜索');
        },
        scroll(e) {
            Math.abs(e.y) == 0 ? this.touch.scroll = true : this.touch.scroll = false
            if (this.transformY > 0) {
                this.$refs.scroll.disable()
            }
        },
        
        touchstart(e) {
            this.isRotate = false
            this.trans = false
            this.touch.init = true
            this.touch.startY = e.touches[0].pageY        //第一次点击的位置
        },
        touchmove(e) {
            if (!this.touch.scroll || !this.touch.init || e.touches[0].pageY > window.innerHeight) return
            let pageY = e.touches[0].pageY
            let daltaY = pageY -  this.touch.startY   //滑动的位置
            this.transformY = Math.max(0, daltaY / 3.5)
            this.rotate = Math.max(0,Math.min(360,daltaY) ) 
            if (this.transformY > 80 ) this.touch.isRotate = true
            this.opac = daltaY / 320
        },
        touchend(e) {
            this.$refs.scroll.enable()
            if (this.transformY > 0) this.trans = true
            this.isRotate = true
            if (!this.touch.isRotate ) {
                 this.transformY = 0
                 this.isRotate = false
                 setTimeout(() => {
                     this.opac = 0
                 }, 300);
            } else {
                this.touch.isRotate = false
                if (this.transformY > 100) {
                    this.$http.get('/api/recommend').then( res => {
                        if (res.data.code == 200) {
                            const data = res.data.data
                            this.recommend = data
                            this.advertesPicture = data.advertesPicture.PICTURE_ADDRESS
                            this.floorName = data.floorName
                            setTimeout(() => {
                                this.transformY = 0
                                this.rotate = 0
                            }, 1000);
                            setTimeout(() => {
                                this.isRotate = false
                                this.opac = 0
                            }, 1500);
                        }
                    })
                }  else {
                    console.log('小于80');
                    this.transformY = 0
                    this.rotate = 0
                    this.isRotate = false
                }
            }
        },

        details(val) {
            let id = {
                goodsId: val.goodsId
            }
            this.setGoodDetails(id)
            this.$router.push({path:`/home/${val.goodsId}`})
            
        },
        
        ...mapActions(['setTab']),

        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS'
        }),

        cityClick() {
            this.$router.push({path: '/city'})
        },

        getHome() {
            this.showFlag = true
            this.$http.get('/api/recommend').then( res => {
                if (res.data.code == 200) {
                    this.showFlag = false
                    const data = res.data.data
                    this.recommend = data
                    this.advertesPicture = data.advertesPicture.PICTURE_ADDRESS
                    this.floorName = data.floorName
                    this.setTab(data.category)
                }
            })
        }
    },
    
    created() {
        this.getHome()
    },

    watch: {
        city() {
            this.getHome()
        }
    }
}
</script>
<style lang="less" scoped>
@color: #F2F2F2;
.header {
    line-height: 44px;
    position: relative;
    z-index: 10;
    .city {
        text-align: center;
        background: @color;
        font-size: 12px;
        position: relative;
        max-width: 120px;
        .icon {
            transform: rotate(270deg);
            position: absolute;
            top: 35%;
            right: -12%
        }
    }
}
.content {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 50px;
    .content-scroll {
        height: 100%;
        overflow: hidden;
        .swiper {
        height: 0;
        padding-bottom: 53.33%;
        overflow: hidden;
    .swiper-img {
        width: 100%;
        height: 200px;
    }
    }
    .panl {
        background: #EEEEEE;
        padding: 15px 0 25px 0;
        ul {
            width: 95%;
            margin: 0 auto;
            border-radius: 10px;
            padding: 15px 0px 7px 0px;
            box-sizing: border-box;
            display: flex;
            background: #fff;
            box-shadow: 3px 4px 20px rgba(45,45,45,.15);
            li {
                flex: 1;
                text-align: center;
                img {
                    width: 70%;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 14px
                }
            }
        }
        .ad {
            width: 100%;
            margin-top: 10px;
            img {
                width: 100%;
            }
        }
    }
    }
    
}
</style>