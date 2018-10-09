

# shoppingMall-VUE

> 一个基于 **<abbr title="Hyper Text Markup Language">vue2.5 + koa2 + mongodb + vant </abbr>** 的电商webapp网站


## 声明
>本项目所用到的ui组件是[有赞](https://github.com/youzan/vant)，前后端完全分离，后端只提供接口，后端代码写的比较简单，适合新手学习，这差不多是一个完整的电商网站流程，只是比较简单，非常适合新手学习研究，后续代码会慢慢更新，欢迎交流，欢迎Issues。
注：部分商品可能没有图片，使用了网络图片代替。

## 技术栈

> **vue2.5+vuex+vue-router+axios+better-scroll+stylus+localStorage+koa2+mongoose+vant**


## 页面
- [x] 商城首页
- [x] 商品分类页
- [x] 个人中心
- [x] 商品详情
- [x] 登录 / 注册
- [x] 地址管理
- [x] 最近浏览
- [x] 我的商品收藏
- [x] 购物车
- [x] 支付页面
- [x] 全部订单


# 实现功能
- [x] 商城首页板块的查询与展示
- [x] 商品各种分类数据查询与展示
- [x] 商品详情展示
- [x] 注册 / 登录
- [x] 商品收藏和取消收藏，写入数据库
- [x] 个人地址增加修改和删除，写入数据库
- [x] 最近浏览，最多30条，本地缓存
- [x] 加入购物车
- [x] 购物车选择商品结算，数量增加、修改、删除
- [x] 订单的支付与查询
- [x] 城市选择 / 城市搜索
- [ ] 商品搜索功能
- [ ] 商品评论

## 截图
![home.png](./images/home.png)
![city.png](./images/city.png)
![category.png](./images/category.png)
![shop.png](./images/shop.png)
![addresse.png](./images/addresse.png)
![addresslist.png](./images/addresslist.png)
![ment.png](./images/ment.png)
![detail.png](./images/detail.png)
![order.png](./images/order.png)
![broese.png](./images/broese.png)
![collectiom.png](./images/collectiom.png)
![my.png](./images/my.png)


## 项目说明

本项目采用前后端完全分离模式，后端提供接口，前端渲染数据,主目录下的 **<abbr title="Hyper Text Markup Language">mall</abbr>** 目录是前端目录，**<abbr title="Hyper Text Markup Language">server</abbr>** 是后端目录，进入这两目录先 **<abbr title="Hyper Text Markup Language">npm i</abbr>** 下载依赖，然后 **<abbr title="Hyper Text Markup Language">npm start</abbr>**，浏览器打开 **<abbr title="Hyper Text Markup Language">http://localhost:8090</abbr>** 既可。

关于数据库问题，项目采用 **<abbr title="Hyper Text Markup Language">mongodb</abbr>** 数据库，**<abbr title="Hyper Text Markup Language">mongoose</abbr>** 建模，运行项目前先要导入往数据库导入数据，数据库版本是**<abbr title="Hyper Text Markup Language">Mongodb4.0</abbr>**，首先安装**<abbr title="Hyper Text Markup Language">Mongodb</abbr>**，安装就不说了，安装好后进入项目 **<abbr title="Hyper Text Markup Language">server</abbr>** 目录，在此目录下打开**<abbr title="Hyper Text Markup Language">cmd</abbr>** 窗口（请确保你的 **<abbr title="Hyper Text Markup Language">node</abbr>** 版本的7.6以上）分别运行 **<abbr title="Hyper Text Markup Language">index1.js</abbr>**  和  **<abbr title="Hyper Text Markup Language">index2.js</abbr>** 往数据库导入数据，提示导入成功后,导入成功后才能运行项目

### 前端请求接口跨域问题，
```js
> 在前端目录mall下的config/index.js文件下面的proxyTable里加上这样一段代码，既可跨域,只适用于开发环境。
proxyTable: {
  '/':{
    target:'http://localhost:3000',
    changeOrigin: true,  //是否跨域
    pathRewrite:{
      '^/api':''
    }
  }
},
> 请求接口时这样写
newDetails(id) {
     axios.get(`/api/details`)
	 ....
}
```






