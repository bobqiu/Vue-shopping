import axios from 'axios';

// 百度地图
let getCurrentCityName = () => {
  return new Promise(function (resolve, reject) {
    let myCity = new BMap.LocalCity()
     myCity.get(function (result) {
      resolve(result.name)
    })
  })
}

// 加入购物车
const addShop = async (val,that) => {
  const {goodsId,goodsName,image,mallPrice,id,name,present_price} = val
  const res = await axios.post('/api/addShop',{
          goodsId: goodsId || id,
          goodsName:goodsName || name,
          image:image,
          mallPrice:mallPrice || present_price,
          check:true,
          count:1,
          unitPrice:mallPrice || present_price
      })
      if(res.data.code == 1) {
        that.toastShow = true
        setTimeout(() => {
          that.toastShow = false
        },1500)
      }
}
export {
  getCurrentCityName,
  addShop
} 
