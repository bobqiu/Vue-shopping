// 收货地址
const mongoose = require('mongoose')   //引入mongoose
const Schema = mongoose.Schema         // 拿到mongoose下的Schema
const db = require('../init.js');
let ObjectId = Schema.Types.ObjectId    //声明Object类型

const addressSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    username: {         // 用户名
        type: String,
        required: true,
    },
    name: {         // 收货人姓名
        type: String,
        required: true,
    },
    tel: {              // 电话
        type: String,
        required: true
    },
    address: {        // 详细地址
        type: String,
        required: true
    },
    isDefault: {    // 是否默认
        type: Boolean,
        required: true
    },
    province: {     // 省
        type: String,
        required: true
    },
    city: {         // 城市
        type: String,
        required: true
    },
    county: {         // 城市
        type: String,
        required: true
    },
    addressDetail: {         // 城市
        type: String,
        required: true
    },
    areaCode: {
        type: String,
        required: true
    }
})

// 发布模型
module.exports = db.model('Address', addressSchema);