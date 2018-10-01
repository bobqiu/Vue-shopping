<template>
  <div class="goods">
      <HeaderTitle2/>
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{ goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情和评论" is-link @click="detailsImg" />
    </van-cell-group>


    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" @click="sorry">
        客服
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="addShops">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="sorry">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>
    <!-- 商品规格弹出层 -->
    <van-sku
        v-model="showBase"
        :sku="sku"
        :goods="goods"
    />
    <Toasts :tip='tip' v-show="toastShow"/>
    <transition
        enter-active-class="animated bounceInRight"
        leave-active-class="animated bounceOutRight"
    >
     <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Sku } from 'vant';
import { mapGetters,mapMutations } from 'vuex'
import { addShop } from 'js/getUserLocation'
import HeaderTitle2 from 'pages/other/HeaderTitle2'
import Toasts from 'pages/other/Toast';
Vue.use(Sku);
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
  GoodsActionMiniBtn
} from 'vant';
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
    HeaderTitle2,
    Toasts
  },
  data() {
    return {
        id:'',      //商品的id
      goods: {
        title: '美国伽力果（约680g/3个）',
        price: 2680,
        express: '免运费',
        remain: 19,
        picture: 'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg',
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ]
      },
      tip: '加入购物车成功~~',
      toastShow: false,
      showBase:false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
         
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
            {
            // 商品留言
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '1' // 是否必填 '1' 表示必填
            }
        ],
        hide_stock: false // 是否隐藏剩余库存
        },
        skuData: {
            // 商品 id
            goodsId: '946755',
            // 留言信息
            messages: {
                message_0: '12',
                message_1: ''
            },
            // 另一种格式的留言，key 不同
            cartMessages: {
                '留言1': 'xxxx'
            },
            // 选择的商品数量
            selectedNum: 1,
            // 选择的 sku 组合
            selectedSkuComb: {
                id: 2257,
                price: 100,
                s1: '30349',
                s2: '1193',
                s3: '0',
                stock_num: 111
            }
            },
    };
  },
  computed: {
      ...mapGetters(['detail']),
     
  },
  methods: {
    formatPrice() {
      return '¥' + this.goods.price
    },
    onClickCart() {
      this.$router.push('cart');
    },
    sorry() {
     
      this.showBase = true
    },
    // 查看商品详情
    detailsImg() {
        this.$router.push({path:`/detail/${this.id}/image`})
    },
    // 请求商品的详细
    details() {
        let data = this.detail
        this.goods.title = data.name
        this.goods.price = data.present_price
        this.goods.remain = data.amount
        this.goods.picture = data.image_path
        this.sku.stock_num = data.amount
        this.sku.price = data.present_price
        this.skuData.selectedNum = 1000
        this.goods.thumb =[data.image,data.image_path]
    },
    async isDetails() {
        if (this.detail) {
            return
        }
        const res = await axios.get(`/api/goods/one?id=${this.id}`)
        
        if (res.data.code == 1) {
            this.detailss(res.data.goodsOne[0])
            this.details()
        }
    },
    ...mapMutations({
        detailss:'DETAIL'
    }),
    // 加入购物车
    addShops() {
        let val = this.detail
        addShop(val,this)
    }
  }, 
  created () {
    this.details()
    this.id = this.$route.params.id
    this.isDetails()
  },
  destroyed() {
    this.detailss('')
  },
  customStepperConfig: {
  // 自定义限购文案
  quotaText: '每次限购xxx件',
  // 自定义步进器超过限制时的回调
  handleOverLimit: (data) => {
    const { action, limitType, quota, quotaUsed } = data;

    if (action === 'minus') {
      Toast('至少选择一件商品');
    } else if (action === 'plus') {
      // const { LIMIT_TYPE } = Sku.skuConstants;
      if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
        let msg = `单次限购${quota}件`;
        if (quotaUsed > 0) msg += `，您已购买${quotaUsed}`;
        Toast(msg);
      } else {
        Toast('库存不够了~~');
      }
    }
  }
}
};
</script>

<style lang="less">
.goods {
  padding-bottom: 100px;
  &-swipe {
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  &-title {
    font-size: 32px;
  }
  &-price {
    color: #f44;
    font-size: 30px;
  }
  &-express {
    color: #999;
    font-size: 24px;
    padding: 10px 30px;
  }
  &-cell-group {
    margin: 30px 0;
    .van-cell__value {
      color: #999;
    }
  }
}
.van-cell {
    width: 100%;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	padding: 20px 30px;
	box-sizing: border-box;
	line-height: 48px;
	position: relative;
	background-color: #fff;
	color: #333;
	font-size: 28px;
    overflow: hidden;
    align-items: center
}
.van-cell__left-icon {
	font-size: 32px;
	line-height: 48px;
	margin-right: 10px
}
.van-cell__right-icon {
	color: #999;
	font-size: 24px;
	line-height: 48px;
	margin-left: 10px
}
.van-goods-action-mini-btn {
	color: #666;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	height: 100px;
	font-size: 20px;
	min-width: 15%;
	line-height: 1;
	text-align: center;
	background-color: #fff;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center
}
.van-button--bottom-action {
	width: 100%;
	height: 100px;
	line-height: 100px;
	border: 0;
	border-radius: 0;
	font-size: 32px;
	color: #fff;
    background-color: #f85;
}
.van-goods-action-mini-btn__icon {
	width: 1em;
	font-size: 40px;
    margin: 0 auto 10px;
}
.van-swipe__indicator {
	border-radius: 100%;
	background-color: #999;
	width: 12px;
	height: 12px
}
.van-sku-actions {
    .van-button--default {
        display: none;
    }
}


.van-swipe__indicator:not(:last-child) {
	margin-right: 12px
}
.van-swipe__indicator--active {
	background-color: #f60
}
.van-goods-action {
	left: 0;
	right: 0;
	bottom: 0;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
    position: fixed;
    z-index: 100;
    
}
.van-sku-container {
	font-size: 28px;
	background: #fff
}
.van-sku-body {
	max-height: 700px!important;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch
}
.van-sku-header__img-wrap {
	position: relative;
	float: left;
	margin-top: -20px;
	width: 160px;
	height: 160px;
	background: #f8f8f8;
	border-radius: 4px
}
.van-sku-header__goods-info {
	padding: 20px 120px 20px 20px;
	min-height: 164px;
	overflow: hidden;
	box-sizing: border-box
}
.van-sku__goods-name {
    font-size: 30px;
    padding-bottom: 10px;
}
.van-sku__goods-price {
	color: #f44;
	margin-top: 20px;
	vertical-align: middle
}
.van-sku__price-num {
	font-size: 32px;
	vertical-align: middle
}
.van-sku__close-icon {
	top: 20px;
	right: 30px;
	font-size: 40px;
	color: #999;
	position: absolute;
	text-align: center
}

.van-sku-stepper-stock {
	padding: 24px 0;
	margin-left: 30px
}
.van-sku-stepper-container {
	height: 60px;
	margin-right: 40px
}
.van-sku__stepper-title {
    float: left;
    font-size: 32px;
	line-height: 60px
}
.van-stepper {
	font-size: 0
}

.van-stepper__minus,
.van-stepper__plus {
	width: 80px;
	height: 60px;
	box-sizing: border-box;
	background-color: #fff;
	border: 2px solid #eee;
	position: relative;
	padding: 10px;
	vertical-align: middle
}

.van-stepper__minus::before,
.van-stepper__plus::before {
	width: 18px;
	height: 2px
}

.van-stepper__minus::after,
.van-stepper__plus::after {
	width: 2px;
	height: 18px
}

.van-stepper__minus::after,
.van-stepper__minus::before,
.van-stepper__plus::after,
.van-stepper__plus::before {
	content: '';
	position: absolute;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #6c6c6c
}

.van-stepper__minus:active,
.van-stepper__plus:active {
	background-color: #e8e8e8
}

.van-stepper__minus--disabled,
.van-stepper__plus--disabled {
	background-color: #f8f8f8
}

.van-stepper__minus--disabled::after,
.van-stepper__minus--disabled::before,
.van-stepper__plus--disabled::after,
.van-stepper__plus--disabled::before {
	background-color: #c9c9c9
}

.van-stepper__minus--disabled:active,
.van-stepper__plus--disabled:active {
	background-color: #f8f8f8
}

.van-stepper__minus {
	border-radius: 4px 0 0 4px
}

.van-stepper__minus::after {
	display: none
}

.van-stepper__plus {
	border-radius: 0 4px 4px 0
}

.van-stepper__input {
	width: 66px;
	height: 52px;
	padding: 2px;
	border: 2px solid #eee;
	border-width: 2px 0;
	border-radius: 0;
	box-sizing: content-box;
	color: #666;
	font-size: 28px;
	vertical-align: middle;
	text-align: center;
	-webkit-appearance: none
}

.van-stepper__input[disabled] {
	color: #c9c9c9
}

.van-stepper input[type=number]::-webkit-inner-spin-button,
.van-stepper input[type=number]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0
}
.van-sku__stock {
	display: inline-block;
	margin-right: 20px;
	color: #999;
	font-size: 28px
}
.van-sku-messages {
	padding-bottom: 0px;
	background: #f8f8f8
}
.van-field .van-cell__title {
	max-width: 180px
}
.van-sku-header::after {
        border: none;
}
.van-popup {
	overflow: initial
}
.van-tag {
	display: inline-block;
	padding: 0px 5px;
	line-height: normal;
	border-radius: 6px;
	font-size: 20px;
	background: #c9c9c9;
    color: #fff;
    vertical-align: middle;
}
.van-tag--danger {
	background: #f44
}
</style>