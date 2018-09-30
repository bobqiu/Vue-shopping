// 用户名表
const mongoose = require('mongoose')   //引入mongoose
const Schema = mongoose.Schema         // 拿到mongoose下的Schema
const db = require('../init.js');
const userSchema = new Schema({        //生成模型
    //以下创建了两个字段
    username:{
        type:String,    //字段类型为String类型
        unique:true,    //设置这个字段是唯一的，不重复
        required:true,   //生成这个字段的时候是必须的
        max:16,        //设置最大为16
        min:2,          //设置最小为0
    },
    password:{
        type:String,    //字段类型为String类型
        max:16,        //设置最大为100
        min:6,          //设置最小为0
        required:true   //生成这个字段的时候是必须的
    },
    avatar:{
        type:String
    }
})

// 发布模型
module.exports = db.model('User',userSchema);