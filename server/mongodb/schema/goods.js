// 商品条目表
const mongoose = require('mongoose')   //引入mongoose
const Schema = mongoose.Schema         // 拿到mongoose下的Schema
const db = require('../init.js');
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const goodsSchema = new Schema({
    id:{unique:true,type:String},
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
    collections:'Goods'
})

// 发布模型
module.exports = db.model('Goods',goodsSchema);