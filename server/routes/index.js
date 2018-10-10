const router = require('koa-router')()
const mongoose = require('mongoose')
const Goods = require('../mongodb/schema/home')
const GoodsList = require('../mongodb/schema/goods')
// const User = require('../mongodb/schema/user')
const Address = require('../mongodb/schema/address')
const Collection = require('../mongodb/schema/collection')
const ShopList = require('../mongodb/schema/shopList')
const userTest = require('../mongodb/schema/user2')
const md5 = require("md5")
require('../public/js/utils')
// 首页
router.get('/recommend', async (ctx, next) => {
  const res = await Goods.find({})
  ctx.body = res[0]
  if (res) {
    ctx.body = {
      code: 200,
      data: res[0]
    }
  } else {
    ctx.body = {
      code: -1,
      data: []
    }
  }
})


// 分类列表页面tab对应数据
router.get('/classification', async (ctx, next) => {
  let { mallSubId } = ctx.query
  const res = await GoodsList.find({ 'sub_id': mallSubId })
  if (res) {
    ctx.body = {
      code: 200,
      dataList: res
    }
  } else {
    ctx.body = {
      code: -1,
      dataList: []
    }
  }
})

// 获取单个商品详情
router.get('/goods/one', async (ctx, next) => {
  const { id } = ctx.query
  const res = await GoodsList.find({ id: id })
  if (res && res.length) {
    ctx.body = {
      code: 200,
      goodsOne: res[0]
    }
  } else {
    ctx.body = {
      code: -1,
      goodsOne: []
    }
  }
})

router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body
  let data = await userTest.findOne({ username })
  if (!data) {
    await new userTest({
      username,
      password: md5(password)
    }).save()
    ctx.body = {
      code: 200,
      msg: '注册成功'
    }
    ctx.session['login'] = 1
    ctx.session['username'] = username
  } else {
    if (data.username === username) {
      ctx.body = {
        code: -1,
        msg: '用户名已存在'
      }
    }
  }
})

// 登录
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  let data = await userTest.findOne({ username }) //拿到用户名查询数据库
  console.log(data);

  if (!data || !data.username) {  //说明数据库没有这个名字
    ctx.body = {
      code: -1,
      msg: '用户名不存在',
    }
  } else {
    if (data.password != md5(password)) {
      ctx.body = {
        code: -1,
        msg: '密码错误',
      }
    } else {
      ctx.session['login'] = 1
      ctx.session['username'] = username
      ctx.body = {
        code: 200,
        msg: '登录成功',
      }
    }
  }
})

// 保持登录，刷新不掉
router.post('/keeplogin', async (ctx, next) => {
  if (ctx.session.username) {
    ctx.body = {
      status: ctx.session.login,
      username: ctx.session.username,
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '请登录'
    }
  }
})

// 退出登录
router.post('/loginOut', async (ctx, next) => {
  if (ctx.session.username) {
    const out = ctx.session.username = ''
    const status = ctx.session.login = 0
    ctx.body = {
      status
    }
  }
})

// 保存收货地址
router.post('/address', async (ctx, next) => {
  const data = ctx.request.body
  if (ctx.session.login != 1) { // 没有登录
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    const username = ctx.session.username
    if (data.id) {    // 说明是更新地址
      await userTest.findOneAndUpdate({ username, 'addressList.id': data.id }, {
        $set: {
          'addressList.$': data
        }
      })
      ctx.body = {
        status: 200,
        msg: '更新成功'
      }
    } else {  // 新增地址
      const data2 = Object.assign(data, {
        id: String(+Date.now())
      })    // 地址id
      await userTest.findOneAndUpdate({ username }, {
        $push: {
          'addressList': data2
        }
      })
      ctx.body = {
        status: 200,
        msg: '添加成功'
      }
    }
  }
})

// 查询地址
router.get('/getAddress', async (ctx, next) => {
  if (ctx.session.login != 1) { // 没有登录
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    const res = await userTest.findOne({ username: ctx.session.username }).exec()
    ctx.body = {
      status: 200,
      address: res.addressList
    }
  }
})

// 删除地址
router.post('/deleteAddress', async (ctx, next) => {
  if (ctx.session.login != 1) { // 没有登录
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    await userTest.findOneAndUpdate({ username: ctx.session.username }, {
      $pull: {
        'addressList': {
          'id': ctx.request.body.id
        }
      }
    })
    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  }
})

// 查询是否已经收藏
router.post('/isCollection', async (ctx, next) => {
  const res = ctx.request.body
  const username = ctx.session.username
  if (ctx.session.login != 1) { // 没有登录
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    const result = await userTest.findOne({ username }).exec()
    let isCollection
    if (!res || !res.id) {
      isCollection = 0  // 未收藏
    } else {
      if (result.collections.length) {
        for (let i = 0; i < result.collections.length; i++) {
          if (result.collections[i].id === res.id) {
            isCollection = 1
            break
          } else {
            isCollection = 0
          }
        }
      } else {
        isCollection = 0
      }
    }
    ctx.body = {
      status: 200,
      isCollection
    }
  }
})

// 查询用户收藏列表
router.get('/collection/list', async (ctx, next) => {
  const username = ctx.session.username
  if (ctx.session.login != 1) { // 没有登录
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    const result = await userTest.findOne({ username }).exec()
    ctx.body = {
      status: 200,
      collection: result.collections || []
    }
  }

})

// 用户收藏，加入数据库
router.post('/collection', async (ctx, next) => {
  const data = ctx.request.body
  const username = ctx.session.username
  if (ctx.session.login != 1) {
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    await userTest.findOneAndUpdate({ username }, {
      $push: {
        'collections': data
      }
    })
    ctx.body = {
      status: 200,
      msg: '收藏成功'
    }
  }
})

// 取消收藏
router.post('/cancelCollection', async (ctx, next) => {
  if (ctx.session.login != 1) {
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    await userTest.findOneAndUpdate({ username: ctx.session.username }, {
      $pull: {
        'collections': {
          'id': ctx.request.body.id
        }
      }
    })
    ctx.body = {
      status: 200,
      msg: '取消收藏成功'
    }
  }
})

// 加入购物车
router.post('/addShop', async (ctx, next) => {
  if (!ctx.request.body.id) {
    ctx.body = {
      code: -1,
      msg: '缺少参数id'
    }
    return
  }
  const username = ctx.session.username
  // 单价 id image_path 商品名字
  // 先查数据库有没有这条商品,有就数量加1,没有就新创建一条
  const test = await userTest.aggregate([{ "$unwind": "$shopList" },
  { "$match": { "shopList.id": ctx.request.body.id, username } },
  { "$project": { "shopList": 1 } }])
  let newData = test.length && test[0].shopList
  console.log(newData);

  if (newData) {
    await userTest.findOneAndUpdate({ username, 'shopList.id': ctx.request.body.id }, {
      $set: {
        'shopList.$.count': newData.count += 1
      }
    })
  } else {  // 说明没有这条数据
    // 查到这条商品数据
    let goods = await GoodsList.findOne({ id: ctx.request.body.id }).exec()
    const { present_price, id, image_path, name } = goods
    let shop = {
      present_price,
      id,
      image_path,
      name,
      mallPrice: present_price,
      check: false,
      count: 1,
    }
    await userTest.findOneAndUpdate({ username }, {
      $push: {
        'shopList': shop
      }
    })
  }
  ctx.body = {
    status: 200,
    msg: '加入购物车成功'
  }
})

// 查询购物车
router.get('/getCard', async (ctx, next) => {
  const username = ctx.session.username
  if (!username) {
    ctx.body = {
      status: -1,
      msg: '请登录'
    }
    return
  }
  const res = await userTest.findOne({ username })
  ctx.body = {
    status: 200,
    shopList: res && res.shopList || []
  }
})

// 购物车增加和减少
router.post('/editCart', async (ctx, next) => {
  const { count, id, mallPrice } = ctx.request.body
  const username = ctx.session.username
  await userTest.findOneAndUpdate({ username, 'shopList.id': id }, {
    $set: {
      'shopList.$.count': count,
      'shopList.$.mallPrice': mallPrice,
    }
  })
  ctx.body = {
    status: 200,
    msg: '修改成功'
  }
})

// 购物车的删除
router.post('/deleteShop', async (ctx, next) => {
  let id = ctx.request.body
  id.forEach(ids => {
    userTest.findOneAndUpdate({ username: ctx.session.username, 'shopList.id': ids }, {
      $pull: {
        'shopList': {
          'id': ids
        }
      }
    }).exec()
  })
  ctx.body = {
    status: 200,
    msg: '删除成功'
  }
})

// 接受订单
router.post('/order', async (ctx, next) => {
  // 订单信息
  let platform = '622'           // 订单头
  let r1 = Math.floor(Math.random() * 10)
  let r2 = Math.floor(Math.random() * 10)
  let sysDate = new Date().Format('yyyyMMddhhmmss')           // 体统时间
  let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')   // 订单创建时间
  let orderId = platform + r1 + sysDate + r2;   // 订单id
  const data = ctx.request.body
  const username = ctx.session.username
  let newData = []
  const order = await userTest.findOne({ username })
  if (!order.order) {
    order.order = {}
  }
  // 根据id查询出购物车订单
  for (let i = 0; i < data.orderId.length; i++) {
    if (data.idDirect) {
      const res = await GoodsList.findOne({ id: data.orderId[0] })
      newData[i] = {
        order_id: orderId + i,
        count: data.count,
        present_price: res.present_price,
        id: res.id,
        image_path: res.image_path,
        name: res.namem,
        mallPrice: data.totalPrice,
      }
    } else {
      let item = await userTest.aggregate([{ "$unwind": "$shopList" },
      { "$match": { "shopList.id": data.orderId[i], username } },
      { "$project": { "shopList": 1 } }])
      newData[i] = item[0].shopList
      newData[i].order_id = orderId + i
    }

  }
  if (!order.order[orderId]) {
    order.order[orderId] = {
      address: data.address,
      tel: data.tel,
      orderList: newData,
      totalPrice: data.totalPrice,
      createDate,
      orderId,
    }
  }
  await userTest.update({ username }, {
    $set: {
      'order': order.order,
    }
  })

  for (let i = 0; i < data.orderId.length; i++) {
    await userTest.findOneAndUpdate({ username, 'shopList.id': data.orderId[i] }, {
      $pull: {
        'shopList': {
          'id': data.orderId[i]
        }
      }
    })
  }
  ctx.body = {
    status: 200,
    msg: '结算成功!'
  }
})

// 查询用户完成订单
router.get('/myOrder', async (ctx, next) => {
  const res = await userTest.findOne({ username: ctx.session.username })
  ctx.body = {
    status: 200,
    list: res.order
  }
})
module.exports = router
