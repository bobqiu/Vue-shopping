<template>
    <div class="card">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

        <ul class="ul">
            <li class="border-bottom" v-for="val of shopList" :key="val.goodsId">
                <div class="left">
                     <checkbox :ref="val"  :value="(val.unitPrice*val.count).toFixed(2)" v-model="checkList" ></checkbox>
                </div>
                <div class="middle"><img :src="val.image"></div>
                <div class="right">
                    <p class="name">{{val.goodsName}}</p>
                    <div>
                        <p class="one"><span>￥</span>{{val.mallPrice}}</p>
                        <p class="two">
                            <i class="fa fa-minus-circle" @click="editCart('minu',val)"></i>
                            <span>{{val.count}}</span>
                            <i @click="editCart('add',val)" class="fa fa-plus-circle"></i>
                        </p>
                    </div>
                </div>
            </li>

            <div class="pics border-bottom" v-show="shopList.length">
                <div @click='checkedAll' class="quanxuan">
                    <checkbox v-model="checked" class="checkedAll"></checkbox>
                    <span>{{checked?'取消全选':'全选'}}</span>
                </div>
                <div class="total">
                    <p>合计：<span>￥{{totalPrice}}</span></p>
                    <p v-if="totalPrice<59">满59元配送，还差{{(59-totalPrice).toFixed(2)}}元</p>
                    <p v-else>请确认订单</p>
                </div>
            </div>
            <div class="confirm"  v-show="shopList.length">
                <div class="notijiao" :class="checkList.length && totalPrice>=59?'delete':''" @click="deletes">删除</div>
                <div class="notijiao" :class="checkList.length && totalPrice>=59?'delete':''">提交订单</div>
            </div>
        </ul>
        <div class="shop-warpper"  v-show="!shopList.length">
          <div class="shop">
              <img :src="shop" alt="">
              </div>
              <p class="desc">您的购物还是空空的哦</p>
              <p class="desc2" @click='goshop'>去购物</p>
        </div>
            <!-- 为你推荐 -->
            <div :style="!shopList.length?'margin-top:40px':''">
                <Title :floorName='floorName'/>
                <div style="background:#ECECEC">
                    <Panl/>
                </div>
            </div>
        </van-pull-refresh>

    </div>
</template>

<script>
import CheckboxRadio from "vue-checkbox-radio";
import Vue from "vue";
import { SubmitBar } from "vant";
import { Checkbox } from "vue-checkbox-radio";
Vue.use(SubmitBar).use(CheckboxRadio);
import axios from "axios";
import Panl from 'pages/other/Panl'
import Title from 'pages/other/Title'
import { PullRefresh } from 'vant';
Vue.use(PullRefresh);
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      shopList: "",
      checked: false,
      checkList: [],
      checkListId:[],
      shop:require('static/img/shop.png'),
      floorName:'为你推荐',
      isLoading: false,
      timer:null,   //用于函数节流
    };
  },
  computed: {
    totalPrice() {
      //计算单选价格
      let num = 0;
      if (this.checkList && this.checkList.length) {
        this.checkList.forEach(item => {
          num += Number(item);
        });
      }
      return num.toFixed(2);
    }
  },
  components: {
      Panl,
      Title
  },
  methods: {
      onRefresh() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
            this.getRandom()
            this.getShopList()
        },200)

    },
    async getShopList() {
      const res = await axios.get("/api/getCard");
      this.shopList = res.data.shopList;
    },
    checkedAll() {
      if (this.checked) {
        this.checkList = [];
      } else {
        this.checkList = [];
        this.shopList.forEach(item => {
          this.checkList.push((item.unitPrice * item.count).toFixed(2));
          this.checkListId.push(item.goodsId)
        });
      }
    },
    goshop() {
      this.$router.push({path:'/'})
    },
    // 加减商品
    async editCart(flag, val) {
        if (flag == "minu") {
          if (val.count <= 1) {
            return;
          }
          val.count--;
        } else if (flag == "add") {
          val.count++;
        }
        const res = await axios.post("/api/queryCard", {
          count: val.count,
          id: val.goodsId,
          unitPrice: val.unitPrice
        });
        if (res.data.code == 1) {
          this.getShopList();
        }
        if (this.checkList && this.checkList.length) {
            this.checkList = [];
            for (let i = 0; i < this.shopList.length; i++) {
                this.checkList[i] = (this.shopList[i].unitPrice * this.shopList[i].count).toFixed(2);
            }
        }
    },
    // 删除商品
    deletes() {
        console.log(this.$refs.val);

    },
    // 推荐随机商品
    async getRandom() {
        let res = await axios.get('/api/getCard/recommend')
        if (res.data.code == 1) {
            this.tablist(res.data.shopRecommend)
            this.isLoading = false;
        }
    },
    ...mapMutations({
        tablist:'TABLIST'
    })
  },
  created() {
    this.getShopList();
    this.getRandom()
  },
  watch: {
    checkList: {
      handler(val, oldVal) {
        if (val.length === this.shopList.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';
.card >>> .van-pull-refresh__loading .van-loading
    height: 35px;
    width: 35px;
.card >>> .van-pull-refresh__head
    font-size 28px
    top -100px
.card >>> .checkbox-component>input+label>.input-box
    height: 35px;
    width: 35px;
    border 1px solid red
.card >>> .checkbox-component>input+label>.input-box>.input-box-tick>path
    stroke red
.card
    margin-top: 90px;
    .ul
        margin: 0 20px;
        li
            display: flex;
            align-items: center;
            height: 180px;
            padding-bottom: 20px;
            margin-top: 20px;
            .left
                width: 80px;
                flex: 0 0 80px;
            .middle
                width: 160px;
                flex: 0 0 160px;
                border: 2px solid #eee;
                padding: 2px;
                box-sizing: border-box;
                img
                    width: 100%;

            .right
                flex: 1;
                height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding: 0 10px 0 30px;
                box-sizing: border-box;
                .name
                    font-size: 28px;
                    color: $picColor;
                div
                    display: flex;
                    justify-content: space-between;
                    padding: 0 40px 0 0;
                    .one
                        font-size: 32px;
                        color: $picColor;

                        span
                            font-size: 26px;

                    .two
                        font-size: 38px;
                        i
                            color: #747474;
                        span
                            padding: 0 20px;
                            font-size: 32px;


        .pics
            display: flex;
            height: 100px;
            align-items: center;
            padding: 20px 0;
            justify-content space-between
            .checkedAll
                font-size: 30px;
            .quanxuan
                position relative
                width 80px
                height 100px
                display flex
                align-items center
                span
                    position absolute
                    top 50%
                    transform translateY(-50%)
                    font-size 28px
                    width 120px
                    left 50px
            .total
                align-content: flex-end;
                font-size: 28px;
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width 290px
                span
                    color: $picColor;
                    font-weight: bold;
        .confirm
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin-top: 10px;
            margin-bottom 20px
            .notijiao
                height: 70px;
                padding: 0 30px;
                font-size: 28px;
                margin-right: 10px;
                line-height: 70px;
                border-radius: 5px;
                background: #E5E5E5;
                color: #D3D3D4;
            .delete
                background: #E6057F;
                color: #fff;
    .shop-warpper
        width: 100%
        padding-top: 40px
        .shop
            display: flex
            background: #F2F2F2
            flex-direction: column
            justify-content: center
            margin-top: 80px
            background: #F6F6F6
            width: 250px
            height: 250px
            border-radius: 50%
            text-align: center
            margin: auto;
            position: relative;
            img
                width: 70%
                margin: 0 auto
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%,-50%)
        .desc2
            height: 80px
            width: 300px
            line-height: 80px
            border: 1px solid #000
            text-align: center
            margin: 0 auto;
            border-radius: 50px
            font-size: 33px
            margin-top: 70px
        .desc
            text-align: center
            margin-top: 50px
            font-size: 32px
            color: #666
</style>
