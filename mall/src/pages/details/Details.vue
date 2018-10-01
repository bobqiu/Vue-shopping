<template>
<transition name='bounce'>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item >
        <img :src="goods.image" :onerror="defaultImg">
      </van-swipe-item>
      <van-swipe-item>
        <img :src="goods.image" :onerror="defaultImg">
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.name }}</div>
        <div class="goods-price">{{ goods.present_price }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="9">运费：{{ goods.express || 0}}</van-col>
        <van-col span="9">剩余：{{ goods.amount }}</van-col>
        <van-col span="6" class="like">{{!isCollectionFlag?'取消收藏':'收藏'}}：<van-icon :name="!isCollectionFlag?'like':'like-o'" @click="collection" class="like-o" :class="{like2:!isCollectionFlag}"/></van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop" is-link>
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <div>
       <van-tabs v-model="active"  class="datails-tabs" sticky>
        <van-tab v-for="val in item" :title="val.title" :key="val.id" >
          <div v-show="active == 0" v-html="goodsDetails.detail || goods.detail"></div>
          <div v-show="active == 1" class="active-1" >
              <div class='comment' >
                <div class="comment-content">
                    <div class='avatar'><img src="http://images.baixingliangfan.cn/compressedPic/20171219105440_2015.jpg" alt="" srcset=""></div>
                    <div class='desc border-bottom'>
                        <p class='fist'>
                            <span class='name'>Peony</span>
                            <span class='num'>1万
                                <i class="fa fa-thumbs-up"></i>
                            </span>
                        </p>
                        <p class="timer">1970-01-30</p>
                        <p class='cont'>很好</p>
                    </div>
                </div>

                <div class="comment-content">
                    <div class='avatar'><img src="http://images.baixingliangfan.cn/compressedPic/20171219105440_2015.jpg" alt="" srcset=""></div>
                    <div class='desc border-bottom'>
                        <p class='fist'>
                            <span class='name'>Peony</span>
                            <span class='num'>1万
                                <i class="fa fa-thumbs-up"></i>
                            </span>
                        </p>
                        <p class="timer">1970-01-30</p>
                        <p class='cont'>很好asdfsdf三点后还哦俗话说iOSadhi啥都管会看到啥风格看见啥卡上就开始给看见啥电话很快就斯柯达很好看叫啥货到付款静安寺号地块卡萨丁就会很快就傻乎乎</p>
                    </div>
                </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat">
        客服
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="addShops">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="purchase">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>
    <Back/>
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :goods-id="goods.id"
      :quota="quota"
      :show-add-cart-btn='false'
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
  </transition>  
</template>

<script>
import Vue from 'vue'
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Tab, Tabs,Sku
} from 'vant';
import Back from 'pages/other/Back'
Vue.use(Tab).use(Tabs).use(Sku)
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'
export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    Back
  },
  data() {
    return {
      goods: { },
      quota: 15,  //限购数量
      defaultImg: 'this.src="' + require('../../assets/img/vue.jpg') + '"',
      active: 0,
      item: [{id:0,title:'商品详情'},{id:1,title:'商品评论'}],
      isCollectionFlag: false,
      showBase:false,  // 显示sku
      goods: {
        // 商品标题
        title: '测试商品',
        // 默认商品 sku 缩略图
        picture: 'https://img.yzcdn.cn/1.jpg'
      },
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
         
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: true, // 是否无规格商品

        hide_stock: 1000 // 是否隐藏剩余库存
      }
    };
  },
  
  computed: {
      ...mapGetters(['goodsDetails','userName'])
  },

  methods: {
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2);
    },

    onClickCart() {
      this.$router.push('cart');
    },

    // 请求商品详情
    async goodsItem() {
        if (this.goodsDetails.id) {
            this.goods = this.goodsDetails
            return
        }
        const res = await axios.get(`/api/goods/one?id=${this.goodsDetails.goodsId}`)
        if (res.data.code == 200) {
            if (res.data.goodsOne.id) {
              this.setBrowse(res.data.goodsOne)
              this.goods = res.data.goodsOne
            }
        }
    },

    // 查询是否已收藏
    async isCollection(id) {
      const res = await axios.post(`/api/isCollection`,{id})
      if (res.data.status == 200) {
        if (res.data.isCollection == 1) {   // 已经收藏收藏
            this.isCollectionFlag = false
        } else {
            this.isCollectionFlag = true
        }
      } else {
          this.isCollectionFlag = true
      }
    },

    // 点击收藏
    async collection() {
      if (!this.userName) {
        this.$router.push({path:'/user/login'})
        return
      }
      if (this.isCollectionFlag) {  // 收藏
        let goods = this.goods
        delete(goods['_id'])  
        const res = await axios.post('/api/collection',goods)
        if (res.data.status == 200) { // 收藏成功
          Toast(res.data.msg);
          this.isCollectionFlag = false
        }
      } else {  // 取消收藏
        const res = await axios.post('/api/cancelCollection',{
          id: this.goods.id
        })
        if (res.data.status == 200) { // 收藏成功
          this.isCollectionFlag = true
        }
      }
    },

    async addShops() {
            if (!this.userName) {
                this.$router.push({path:'/user/login'})
                return
            }
            const res = await axios.post('/api/addShop',{
                id: this.goodsDetails.goodsId || this.goodsDetails.id
            })            
            if (res.data.status == 200) {
                Toast(res.data.msg)
            }
    },

    // 立即购买弹出sku
    purchase() {
      console.log(1);
      
      this.showBase = true
    },

    // 立即购买
    onBuyClicked() {

    },

    onAddCartClicked() {

    },

    ...mapActions(['setBrowse'])
  },

  created() {
    if (!this.goodsDetails.goodsId && !this.goodsDetails.id) {
        this.$router.go(-1)
        return
    }
    this.goodsItem()
    this.isCollection(this.goodsDetails.goodsId || this.goodsDetails.id)

  },
};
</script>

<style lang="less" scoped>
.goods {
  padding-bottom: 50px;
  background: #fff;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow: auto;
  &-swipe {
    img {
      width: 100%;
      height: 400px;
      display: block;
    }
  }
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-tag {
    margin-left: 5px;
  }
}

.active-1 {
  min-height: 600px
}
.comment {
  margin-top: 10px;
  .comment-content {
    display: flex;
    padding: 0 0 0 16px;
    margin: 12px;
    &-first-child {
      margin-top: 50px;
    }
    .avatar {
      flex: 0 0 35px;
      width: 35px;
      margin-right: 10px;
      img {
        width: 38px;
        height: 38px;
        border:  1px solid #eee;
        border-radius: 50%
      }
    }
    .desc {
      flex: 1;
      padding-bottom: 8px;
      display: flex;
      padding-right: 15px;
      flex-direction: column;
      .fist {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .name {
          font-size: 14px;
            olor: grey;
        }
        .num {
          color: gray;
          font-size: 14px    ;
        }
      }
      .timer {
          color: grey   ;    
          margin-top: 3px;
      }    
      .cont {
          margin-top: 14px;
          color: #000;
          overflow: hidden;
          word-wrap: break-word;
          word-break: break-all;
          text-align: justify;
          font-size: 14px;
          line-height: 1.6 ;
      }
    }
  }
}
.like {
  position: relative;
  display: flex;
  align-items: center;
  .like-o {
    font-size: 20px;
    position: absolute;
    right: 35%;
  }
  .like2 {
    font-size: 20px;
    position: absolute;
    right: 8%;
    color: red;
  }
}
</style>