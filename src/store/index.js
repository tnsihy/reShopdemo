// 引入createStore方法
import { createStore, combineReducers } from 'redux'
import storeReducer from './../reducers/store'
import orderReducer from './../reducers/order'

// combineReducers 
// 把一个由多个不同reducer函数作为value的object,合并成一个最终的reducer函数,然后就可以对这个reducer调用createStore
const rootReducer = combineReducers({
    store: storeReducer,
    order: orderReducer
})

// 创建数据存储仓库
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// 为了在控制台拿取store数据
window.store = store

// 暴露出去
export default store