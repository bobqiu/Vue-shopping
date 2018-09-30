// 商品条目表
const mongoose = require('mongoose')   //引入mongoose
const Schema = mongoose.Schema         // 拿到mongoose下的Schema
const db = require('../init.js');
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const shoplist = new Schema({
    id:String,        // 商品id
    name:String,       // 商品名字
    image_path:String,  // 商品图片
    mallPrice:String,     // 总价
    check:Boolean,       // 是否选中
    count:Number,       // 数量
    present_price:String,   //单价
    username: String,
    meta:{
        // 创建数据的时间
        createdAt: {
            type:Date,  //type是一个时间类型
            default:Date.now()
        },
        // 更新这条数据的时间
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
},{
    collections:'shoplist'
})

// 每次在存储这个数据之前都会来调用这个方法
shoplist.pre('save',function(next){
    if (this.isNew) {   //判断这条数据是不是新加的
        // 如果数据是新加的话，就把他创建的时间已经更新的时间设置为当前的时间
        this.meta.createdAt = this.meta.updateAt = Date.now()
    } else {
        // 如果这个数据已经有了,就只更新他的updateAt
        this.meta.updateAt = Date.now()
    }
    next()  //将存储流程走下去
})
// 发布模型
module.exports = db.model('Shoplist',shoplist);
