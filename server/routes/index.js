const router = require('koa-router')()
const mongoose = require('mongoose')
const Goods = require('../mongodb/schema/home')
const GoodsList = require('../mongodb/schema/goods')
const User = require('../mongodb/schema/user')
const Address = require('../mongodb/schema/address')
const Collection = require('../mongodb/schema/collection')
const md5 = require("md5")
// 首页
router.get('/recommend', async (ctx, next) => {
  console.log(ctx.session.username);

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

// 注册
router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body
  let data = await User.findOne({ username })
  if (!data) {
    await new User({
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
  let data = await User.findOne({ username }) //拿到用户名查询数据库
  if (!data) {  //说明数据库没有这个名字
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
    if (data.id) {  // 说明是更新地址
      const res = await Address.findOneAndUpdate({ id: data.id }, data)
      ctx.body = {
        status: 200,
        msg: '更新成功',
        data: res
      }
    } else { // 说明是新增地址
      const data2 = Object.assign(data, {
        id: String(+Date.now())
      })
      await new Address(data2).save()
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
    const res = await Address.find({ username: ctx.session.username })
    ctx.body = {
      address: res
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
    await Address.remove({ id: ctx.request.body.id })
    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  }
})

// 查询是否已经收藏
router.post('/isCollection', async (ctx, next) => {
  const res = ctx.request.body
  if (ctx.session.login != 1) { // 没有登录
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    const result = await Collection.find({ username: ctx.session.username }).exec()
    let isCollection
    if (!res || !res.id) {
      isCollection = 0  // 未收藏
    } else {
      if (result.username === ctx.session.username) {  // 判断是不是同一个用户
        isCollection = 1
      } else {
        isCollection = 0
      }
    }
    ctx.body = {
      status: 200,
      isCollection,
    }
  }
})
// 查询用户收藏
router.get('/collection/list', async (ctx, next) => {
  if (ctx.session.login != 1) { // 没有登录
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    const result = await Collection.find({ username: ctx.session.username }).exec()
    ctx.body = {
      status: 200,
      collection: result || []
    }
  }

})

// 用户收藏，加入数据库
router.post('/collection', async (ctx, next) => {
  const data = ctx.request.body
  if (ctx.session.login != 1) {
    ctx.body = {
      status: -1,
      msg: '请先登录'
    }
  } else {
    data['username'] = ctx.session.username
    await new Collection(data).save()
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
    await Collection.remove({ id: ctx.request.body.id })
    ctx.body = {
      status: 200,
      msg: '取消收藏成功'
    }
  }
})
module.exports = router
