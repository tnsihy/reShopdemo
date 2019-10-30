// 引入createStore方法
import { createStore, combineReducers } from 'redux'
import storeReducer from './../reducers/store'

const rootReducer = combineReducers({
    store: storeReducer
})
// 创建数据存储仓库
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store;
// 暴露出去
export default store