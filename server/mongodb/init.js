// 1,引包
const mongoose = require('mongoose');
// 2，创建数据库连接
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/shop2');
db.once('open',callback => {
    console.log('mongoose连接成功')
})
// 导出模块
module.exports = db;