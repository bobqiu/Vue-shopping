import * as types from './mutations-type'
const matutaions = {
    [types.CITY](state,city){
        state.city = city
        try {
            localStorage.citi = citi
        } catch (error) {
            console.log(e);
        }
    },
    [types.LISTCOMMODITY](state,listCommodity) {
        state.listCommodity = listCommodity
    },
    [types.CURRENDINDEX](state,currendIndex) {
        state.currendIndex = currendIndex
    },
    [types.LEFTTABINDEX](state,leftTabIndex) {
        state.leftTabIndex = leftTabIndex
    },
    [types.TABLIST](state,tabList) {
        state.tabList = tabList
    },
    [types.TABARR](state,tabArr) {
        state.tabArr = tabArr
    },
    [types.DETAIL](state,detail) {
        state.detail = detail
    },
}

export default matutaions
