<template>
    <div class="warpper" ref='right'>
            <div v-if='active==0'>
                <div>
                    <img class="img" @load="imageLoaded" :ref="val" v-for="(val,index) in lets" :src="val" alt="" :key="index" srcset="">
                </div>
            </div>
            <div class='tab'>
                <div :class="active==index?'active':''" @click='tablist(index)' v-for='(val,index) of tabs' :key='index'>{{val}}</div>
            </div>
            <div v-if='active==1'  class='comment'>
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
            <div v-if='active==1' class="comment-input">
                <input type="text" placeholder="在此输入评论" v-model="comment">
                <span :class="!comment?'no':''" @click="send">发送</span>
            </div>
    </div>

</template>

<script>
import BScroll from 'better-scroll'
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            arr:[],
            tabs:['商品详情','评论'],
            active:0,
            comment:''
        }
    },
    methods: {
        imageLoaded() {
            this.scroll = new BScroll(this.$refs.right);
        },
        tablist(index) {
            this.active = index
        },
        // 发送
        send() {
            if (!this.comment) {
                return
            }
        }
    },
    computed:{
        ...mapGetters(['detail']),
        lets() {
            let str = this.detail.detail
            let arr = str.split('/>')
            let a = []
            let b = []
            for (let i = 0; i < arr.length; i++) {
                a[i] = arr[i].split('src="')[1]
                if (a[i]) {
                   b[i] = a[i].split('" width')[0]
                }
            }
            return b
        }
    },
    mounted() {


    },
}
</script>
<style lang="stylus" scoped>
    @import '~styles/animate.min.styl';
    .warpper  
        position fixed
        z-index 4001
        background #fff
        top 0px
        left 0
        right 0
        bottom 0
        width 100%
        overflow hidden
        .img
            width 100%
            height auto
            &:first-child
                margin-top 80px
        .tab
            position fixed    
            top 0px
            left 0px
            z-index 4002
            height 80px
            line-height 80px
            width 100%
            background #fff
            display flex
            div
                flex 1
                text-align center
                font-size 30px
                border 1px  solid #666
                color #666
                &:nth-child(1)
                    margin-right -1px
            .active
                color #fff 
                background #666   
        .comment
            margin-top 80px
            .comment-content
                display flex
                padding 0 0 0 32px
                margin-bottom 25px
                &:first-child
                    margin-top 100px
                .avatar
                    flex: 0 0 70px
                    width: 70px
                    margin-right: 20px
                    img
                        width 75px
                        height 75px
                        border 1px solid #eee
                        border-radius 50%
                .desc
                    flex: 1
                    padding-bottom: 14px
                    display flex 
                    padding-right 30px
                    flex-direction column 
                    .fist
                        display flex
                        flex-direction row
                        justify-content space-between
                        .name
                            font-size 28px
                            color grey
                        .num
                            color: gray
                            font-size 28px    
                            fa
                                font-size 28px
                    .timer
                        color grey       
                        margin-top 10px
                    .cont 
                        margin-top: 14px
                        color: #000
                        overflow: hidden
                        word-wrap: break-word
                        word-break: break-all
                        text-align: justify
                        font-size: 28px
                        line-height: 1.6      
        .comment-input
            position fixed
            bottom 0
            left 0
            right 0
            width 100%
            display flex      
            height 80px
            background #eee
            align-items center
            input
                flex 1
                margin-left 30px
                padding-left 10px
                box-sizing border-box
                height 50px
                line-height 50px
                border-radius 5px
                margin-right 10px
            span    
                width 100px
                flex 0 0 150px     
                text-align center   
                background #32C27D
                color #fff          
                height 50px
                border-radius 5px
                line-height 50px
            .no
                color #666



</style>
