import * as types from './mutations-type'
const matutaions = {
    [types.CATEGORY](state,category) {
        state.category = category
    },
    [types.GOODSDETAILS](state,goodsDetails) {
        state.goodsDetails = goodsDetails
    },
    [types.USERNAME](state,userName) {
        state.userName = userName
    },
    [types.ADDRESSINFO](state,addressInfo) {
        state.addressInfo = addressInfo
    },
    [types.BROWSE](state,browse) {
        state.browse = browse
    },
    [types.SHOPORDERLIST](state,shopOrderList) {
        state.shopOrderList = shopOrderList
    }
}

export default matutaions