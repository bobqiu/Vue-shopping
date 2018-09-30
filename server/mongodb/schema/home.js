// 首页展示列表
const mongoose = require('mongoose')   //引入mongoose
const Schema = mongoose.Schema         // 拿到mongoose下的Schema
const db = require('../init.js');
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const recommend = new Schema({
    advertesPicture:Object,
    buyTime:String,
    category:Array,
    floor1:Array,
    floor2:Array,
    floor3:Array,
    floorName:Object,
    hotGoods:Array,
    recommend:Array,
    sendFee:Object,
    slides:Array,
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
    collections:'Recommends'
})

// 每次在存储这个数据之前都会来调用这个方法
recommend.pre('save',function(next){
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
module.exports = db.model('Recommend',recommend);
