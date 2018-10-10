<template>
<transition name='bounce'>
    <div class="login" > 
        <img src="../../assets/img/login.jpg" alt="" srcset="" class="login-img">
        <div class="form">
            <div class="form-cont">   
                <p class="login-title">登录 / 注册</p>
                <div class="form-group">
                    <label for="username" class="sr-only">USERNAME</label>
                    <input type="text" v-model="username" class="form-control" maxlength="16" placeholder="USERNAME" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="username" class="sr-only">PASSWORD</label>
                    <input type="password" v-model="password" class="form-control" maxlength="16" placeholder="PASSWORD" autocomplete="off">
                </div>
                <div class="form-group form-group2">
                    <van-button :loading='loginLoding' type="primary" @click="login(false)">登 录</van-button>
                    <van-button :loading='regLoding'  type="danger" @click="login(true)" >注册</van-button>
                </div>
            </div>
        </div>
        <Back/>
    </div>
</transition>      
</template>

<script>
import Back from 'pages/other/Back'
import {mapMutations} from 'vuex'
import {Toast} from 'vant'
export default {
    data() {
        return {
            username:'',
            password:'',
            tip:'',
            timer:0,
            regLoding:false,
            loginLoding: false
        }
    },
    components: {
        Back,
    },
    methods: {
         login(flag) {
            if (!this.username || !this.password) {
                Toast('请输入用户名或者密码');
                return
            }
            if (!flag) {    // 登录
                this.register(false)
            } else {  // 注册
                this.register(true)
            }
        },

        async register(flag) {
            if (flag) { //  注册
                this.regLoding = true
                const res = await this.$http.post('/api/register',{
                    username: this.username,
                    password: this.username
                })
                if (res.data.code == 200) {
                    this.setName(this.username)
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 1500);
                }
                this.regLoding = false
                Toast(res.data.msg);
            } else {    // 登录
                this.loginLoding = true
                const res = await this.$http.post('/api/login',{
                    username: this.username,
                    password: this.username
                })
                if (res.data.code == 200) {
                    this.setName(this.username)
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 1500);
                }
                this.loginLoding = false
                Toast(res.data.msg);
            }
        },

        ...mapMutations({
            setName: 'USERNAME'
        })

    },
 
}
</script>

<style lang="stylus" scoped>
    .login
        height 100%
        background #EFEFEF
        overflow hidden
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 2000
        .login-img
            width 100%
            height 100%
        .form
            width 90%
            margin 0 auto
            background #fff
            position absolute
            top 20%
            left 50%
            transform translateX(-50%)
            padding: 7px
            box-shadow: -2px 3px 23px 1px rgba(0, 0, 0, 0.1)
            .form-cont
                padding 8px
                .login-title
                    letter-spacing: 1px;
                    font-size: 20px;
                    margin: 0 0 30px 0;
                    color: #000000;
                .form-group
                    margin-bottom: 30px
                    .van-button
                        height 45px
                        line-height 45px
                        font-size 14px
                        padding 0 15px
                        width 100px
                    .sr-only
                        position: absolute;
                        width: 1px;
                        height: 1px;
                        padding: 0;
                        margin: -1px;
                        overflow: hidden;
                        clip: rect(0,0,0,0);
                        border: 0;    
                        font-size: 14px;
                        font-weight: 300;
                        font-family: "Open Sans", Arial, sans-serif!important
                    .form-control
                        font-size: 16px
                        font-weight: 300
                        width 100%
                        display block
                        height: 50px
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
                        font-size 15px
                      
                    .btn-primary
                        height: 50px;
                        padding-right: 20px;
                        padding-left: 20px;
                        border: none;
                        background: #33cccc;
                        color: #ffffff;
                        box-shadow: -1px 5px 10px -1px rgba(51, 204, 204, 0.4);
                        display: inline-block;
                        padding: 6px 12px;
                        margin-bottom: 0;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 1.42857143;
                        text-align: center;
                        white-space: nowrap;
                        vertical-align: middle;
                        display: inline-block;
                        padding: 6px 14px;
                        margin-bottom: 0;
                        font-size: 14px;
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
                        border-radius: 4px;
                        &:active,&:focus,&:hover
                            color: #ffffff;
                            background: #47d1d1 !important;
                            outline: none;
                            border-color: #122b40;
                            box-shadow: inset 0 1.5px 2.5px rgba(0,0,0,.125);
                    .reg
                        box-shadow: -1px 5px 10px -1px rgba(255, 0, 128, 0.4);         
        
                    
</style>

