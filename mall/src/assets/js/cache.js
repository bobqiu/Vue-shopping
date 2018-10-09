// 缓存
import storage from 'good-storage'
const TAB_LIST = 'tab'      // TAB 
const ADDRESS = 'address'     // 地址列表
const RECENTLY_BROWSE = 'browse'  // 最近浏览
const CITY = 'city'
export const tab = {
    getTab() {
        return storage.get(TAB_LIST,[])
    },

    setTab(list) {
        return storage.set(TAB_LIST,list)
    },
}

// 用户修改单条地址
export const address = {
    getAddress() {
        return storage.get(ADDRESS,{})
    },

    setAddress(list) {
        return storage.set(ADDRESS,list)
    },

    clearAddress() {
        return storage.remove(ADDRESS)
    }
}

// 最近浏览
export const recentlyBrowse = {
    getBrowse() {
        return storage.get(RECENTLY_BROWSE,[])
    },

    setBrowse(data) {
        let newData = this.getBrowse()
        if (newData.length) {
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].id == data.id) {
                    newData.splice(i,1)
                }
            }
        }
        newData.unshift(data)
        if (newData.length > 30) {  // 最近浏览最多30条缓存
            newData.pop()
        }
        storage.set(RECENTLY_BROWSE,newData)
        return newData
    },

    clearBrowse() {
        return storage.remove(RECENTLY_BROWSE)
    },

    // 删除一条
    deleteOne(id) {
        let data = this.getBrowse()
        const index = data.findIndex((val,ind,arr) => {
            return id == val.id
        })
        data.splice(index,1)
        storage.set(RECENTLY_BROWSE,data)
        return data
    }
}

// 缓存城市
export const city = {
    getCity() {
        return storage.get(CITY,'北京市')
    },

    setCity(city) {
        return storage.set(CITY,city)
    }
}
