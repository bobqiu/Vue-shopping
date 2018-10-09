import { tab,address,recentlyBrowse,city } from 'js/cache'
import * as types from './mutations-type'
export const setTab = function ({ commit }, tabs) {
    commit(types.CATEGORY, tab.setTab(tabs))
}

// 保存要修改的地址
export const setAddress = function({ commit }, list) {
    commit(types.ADDRESSINFO, address.setAddress(list))
}

// 清楚要修改的地址
export const clearAddress = function({ commit }) {
    commit(types.ADDRESSINFO, address.clearAddress())
}

// 最近浏览, 加入缓存
export const setBrowse = function({commit,state},data) {
    commit(types.BROWSE, recentlyBrowse.setBrowse(data))
}

// 清除一条，最近浏览
export const deleteOne = function ({commit},id) {
    commit(types.BROWSE, recentlyBrowse.deleteOne(id))
}

// 选择地址
export const selectCity = function ({commit},citys) {
    commit(types.CITY, city.setCity(citys))
}