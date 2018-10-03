// 用户收藏表
const mongoose = require('mongoose')   //引入mongoose
const Schema = mongoose.Schema         // 拿到mongoose下的Schema
const db = require('../init.js');
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const collectionSchema = new Schema({
    username: String,
    id:String,
    shop_id:String,
    sub_id:String,
    name:String,
    present_price:Number,
    amount:Number,
    detail:String,
    image:String,
    create_time:String,
    update_time:String,
    image_path:String,
    orl_price:Number,
    goods_serlal_number:String
},{
    collections:'Collection'
})

// 发布模型
module.exports = db.model('Collection',collectionSchema);