<template>
    <div class="login"> 
        <div class="form">
            <div class="form-cont">   
                <p class="login-title">登录</p>
                <div class="form-group">
                    <label for="username" class="sr-only">USERNAME</label>
                    <input type="text" v-model="username" class="form-control" placeholder="USERNAME" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="username" class="sr-only">PASSWORD</label>
                    <input type="password" v-model="password" class="form-control"  placeholder="PASSWORD" autocomplete="off">
                </div>
                <div class="form-group form-group2">
                    <van-button :loading='loading' type="primary" @click="login">登 录</van-button>
                    <van-button  type="danger" @click="reg" >去注册</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Button } from 'vant';
import { Toast } from 'vant';
import Vue from 'vue'
Vue.use(Button);
import axios from 'axios'
import Toasts from 'pages/other/Toast';
export default {
    data() {
        return {
            username:'',
            password:'',
            tip:'',
            toastShow:false,
            timer:0,
            loading:false
        }
    },
    components: {
        Toasts
    },
    methods: {
        reg() {
            this.$router.push({'path':'/register'})
        },
         login() {
            if (!this.username || !this.password) {
                Toast('请输入用户名或者密码');
                return
            } else {
                this.isLogin()
            }
        },
        async isLogin() {
            this.loading = true
            const res = await axios.post('/api/login',{
                username:this.username,
                password:this.password
            })
            if (res.data.code == -1) {
                Toast(res.data.msg);
                this.loading = false
            } else {
                setTimeout(() => {
                    this.$router.push({'path':'/'})
                }, 1500);
            }
        }
    },
 
}
</script>

<style lang="stylus" scoped>
    .login
        height 100%
        background #EFEFEF
        overflow hidden
        .form
            width 90%
            margin 0 auto
            background #fff
            position absolute
            top 20%
            left 50%
            transform translateX(-50%)
            padding: 15px 15px 15px 15px
            box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1)
            .form-cont
                padding 15px
                .login-title
                    letter-spacing: 2px;
                    font-size: 40px;
                    margin: 0 0 60px 0;
                    color: #000000;
                .form-group
                    margin-bottom: 60px
                    .van-button
                        height 90px
                        line-height 90px
                        font-size 28px
                        padding 0 30px
                        width 200px
                    .sr-only
                        position: absolute;
                        width: 2px;
                        height: 2px;
                        padding: 0;
                        margin: -2px;
                        overflow: hidden;
                        clip: rect(0,0,0,0);
                        border: 0;    
                        font-size: 28px;
                        font-weight: 300;
                        font-family: "Open Sans", Arial, sans-serif!important
                    .form-control
                        font-size: 32px
                        font-weight: 300
                        width 100%
                        display block
                        height: 100px
                        padding-left: 0
                        padding-right: 0
                        border: none
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1)
                        -webkit-box-shadow: none
                        -moz-box-shadow: none
                        -o-box-shadow: none
                        box-shadow: none
                        -webkit-border-radius: 0px
                        -moz-border-radius: 0px
                        -ms-border-radius: 0px
                        border-radius: 0px
                        -moz-transition: all 0.3s ease
                        -o-transition: all 0.3s ease
                        -webkit-transition: all 0.3s ease
                        -ms-transition: all 0.3s ease
                        transition: all 0.3s ease
                        font-family: "Open Sans", Arial, sans-serif!important
                        color: #555;
                        &:focus
                            border-bottom: 1px solid rgba(0, 0, 0, 0.4) 
                    input::-webkit-input-placeholder
                        color: #D8D8D8
                        font-size 30px
                      
                    .btn-primary
                        height: 100px;
                        padding-right: 40px;
                        padding-left: 40px;
                        border: none;
                        background: #33cccc;
                        color: #ffffff;
                        -webkit-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
                        -moz-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
                        -o-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
                        box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
                        display: inline-block;
                        padding: 12px 24px;
                        margin-bottom: 0;
                        font-size: 28px;
                        font-weight: 400;
                        line-height: 1.42857143;
                        text-align: center;
                        white-space: nowrap;
                        vertical-align: middle;
                        display: inline-block;
                        padding: 12px 50px;
                        margin-bottom: 0;
                        font-size: 28px;
                        font-weight: 400;
                        line-height: 1.42857143;
                        text-align: center;
                        white-space: nowrap;
                        vertical-align: middle;
                        -ms-touch-action: manipulation;
                        touch-action: manipulation;
                        cursor: pointer;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        background-image: none;
                        border: 1px solid transparent;
                        border-radius: 8px;
                        &:active,&:focus,&:hover
                            color: #ffffff;
                            background: #47d1d1 !important;
                            outline: none;
                            border-color: #122b40;
                            box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
                    .reg
                        box-shadow: -2px 10px 20px -1px rgba(255, 0, 128, 0.4);         
        
                    
</style>

