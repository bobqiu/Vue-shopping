const mongoose = require('mongoose')   //引入mongoose
const Schema = mongoose.Schema         // 拿到mongoose下的Schema
const db = require('../init.js');
const ObjectId = Schema.Types.ObjectId
const userSchema = new Schema({ 
    username:{
        type:String,        //字段类型为String类型
        unique:true,        //设置这个字段是唯一的，不重复
        required:true,      //生成这个字段的时候是必须的
        max:16,             //设置最大为16
        min:2,              //设置最小为0
    },
    password:{
        type:String,    //字段类型为String类型
        max:16,         //设置最大为100
        min:6,          //设置最小为0
        required:true   //生成这个字段的时候是必须的
    },
    // 用户地址
    addressList: [{
        id: String,                 //  地址id
        name: String,               // 收货人姓名
        tel: String,                // 电话
        address: String,            // 详细地址
        isDefault: Boolean,          // 是否默认,
        province: String,           // 省
        city: String,               // 城市
        county: String,             // 区
        addressDetail: String,      // 详细地址  
        areaCode: String            // 城市编码
    }],
    // 用户收藏
    collections: [],    // 用户收藏
    shopList: [],       // 购物车车
    order:{
        type: Object
    },           // 用户的订单
})
 
// 发布模型
module.exports = db.model('User2',userSchema);