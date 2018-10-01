

// 所有的状态管理
let defaultCiti = '成都'
// 防止一些浏览器没有存储功能
try {
    if (localStorage.citi) {
        defaultCiti = localStorage.citi
    }
} catch (e) {
    console.log(e);
}
const state = {
    city:defaultCiti,    //默认城市
    listCommodity:'',       //轮播图下面的5个商品
    currendIndex:0,   //点击tab栏
    leftTabIndex:0,   //点击右侧的tab
    tabList:'',       //右侧tab栏对应的数据列表
    tabArr:[],      //用来存储tab首次加载数据的id
    detail:'',      //详情页面数据
}
export default state
