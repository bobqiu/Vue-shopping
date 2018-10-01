<template>
  <div>
    <HeaderTitle title="个人中心"/>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <div class="avatar">
      <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3909870665,3259015587&fm=27&gp=0.jpg">
      <p @click="login">登录/注册</p>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="pending-orders" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="pending-deliver" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        待发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="exchange" title="收藏商品" is-link />
      <van-cell icon="gold-coin" @click="address" title="地址管理" is-link />
      <van-cell icon="gift" title="最近浏览" is-link />
      <van-cell icon="gift" title="设置" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import HeaderTitle from 'pages/other/HeaderTitle'
import { Row, Col, Icon, Cell, CellGroup } from 'vant';
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    HeaderTitle
  },
  methods: {
    login() {
      this.$router.push({'path':'/login'})
    },
    address() {
      this.$router.push({'path':'/newaddress'})
    }
  }
};
</script>

<style lang="less" >
.avatar {
  /*width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background: #E30C7B;
  padding: 20% 0 10% 0;
  box-sizing: border-box;*/
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  p {
    color: #fff;
    font-size: 28px;
    margin-top: 40px;
  }
}
.user {
  &-poster {
    width:100%;
    height: 100%;
    display: block;
  }
  &-group {
    margin-bottom: .3rem;
  }
  &-links {
    padding: 30px 0;
    font-size: 26px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 48px;
      margin-bottom: 20px;
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
}

</style>