<template>
  <div>
    <BaseTitle title="会员中心"/>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <div class="avatar" v-if="!userName">
      <img src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg" alt="" srcset="">
      <p @click="login">登录/注册</p>
    </div>
     <div class="avatar" v-else>
      <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3909870665,3259015587&fm=27&gp=0.jpg">
      <p class="usename">欢迎您：{{userName}}</p>
      <p @click="loginOut">退出登录</p>
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
      <van-cell icon="exchange" title="收藏商品" is-link @click="collection"/>
      <van-cell icon="gold-coin" @click="address" title="地址管理" is-link />
      <van-cell icon="gift" title="最近浏览" is-link @click="browse"/>
    </van-cell-group>
    <router-view/>
  </div>
</template>

<script>
import BaseTitle from 'pages/other/BaseTitle'
import { Row, Col, Icon, Cell, CellGroup } from 'vant'
import {mapGetters,mapMutations} from 'vuex'
import axios from 'axios'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    BaseTitle
  },

  computed: {
    ...mapGetters(['userName'])
  },

  methods: {
    ...mapMutations({
      setName: 'USERNAME'
    }),

    login() {
      this.$router.push({'path':'/user/login'})
    },

    address() {
      if (this.userName) {
          this.$router.push({'path':'/user/address'})
      } else {
          this.$router.push({'path':'/user/login'})
      }
    },

    collection() {
      this.$router.push({path: '/user/collection'})
    },

    // 退出登录
    loginOut() {
      axios.post('/api/loginOut').then(res => {
        console.log(res.data);
        if (res.data.status == 0) {
          this.setName('')
        }
      })
    },

    // 最近浏览
    browse() {
      this.$router.push({path: '/my/browse'})
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background: #E30C7B;
  padding: 10% 0 10% 0;
  box-sizing: border-box;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  p {
    color: #fff;
    font-size: 14px;
    margin-top: 20px;
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
    padding: 15px 0;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
      margin-bottom: 10px;
    }
  }
}
.van-cell {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  overflow: hidden;
  align-items: center;
  .van-cell__left-icon {
    font-size: 16px;
    line-height: 24px;
    margin-right: 5px
  }
  .van-cell__right-icon {
    color: #999;
    font-size: 12px;
    line-height: 35px;
    margin-left: 5px
  }
}
.usename {
  font-weight: 700;
  font-size: 18px!important
}
</style>