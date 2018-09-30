const fs = require('fs')
const Goods = require('./mongodb/schema/home');//引入schema
    fs.readFile('./goods.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        console.log(data);
        let saveCount=0
        data.map((value,index)=>{
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
            console.log(saveCount)
                console.log('成功'+saveCount)
            }).catch(error=>{
                console.log('失败：'+error)
            })
        })
    })


  
