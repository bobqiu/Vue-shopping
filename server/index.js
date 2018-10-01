const fs = require('fs')
const mongoose = require('mongoose')
const Koa = require('koa')
const app = new Koa()
const Router = require ('koa-router')
let router = new Router()
// const Goods = require('./mongodb/schema/home');//引入schema
//     fs.readFile('./goods.json','utf8',(err,data)=>{
//         data=JSON.parse(data)
//         console.log(data);
//         let saveCount=0
//         data.map((value,index)=>{
//             let newGoods = new Goods(value)
//             newGoods.save().then(()=>{
//                 saveCount++
//             console.log(saveCount)
//                 console.log('成功'+saveCount)
//             }).catch(error=>{
//                 console.log('失败：'+error)
//             })
//         })
//     })

  
    const Goods = require('./mongodb/schema/goods');//引入schema
    fs.readFile('./goods2.json','utf8',(err,data)=>{
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