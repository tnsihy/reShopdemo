import { ORDER_SUBMIT } from './../actionTypes/order'

// 这个state是指提交订单的数据了    action.payload是购物车的数据
const reducer = (state = [], action) => {
    switch (action.type) {
        case ORDER_SUBMIT:
            return orderSubmit(state, action)
        default:
            return state
    }
}

function orderSubmit(state, action) {
    // 获取购物车的被选中的数据 赋值给state
    const shopData = action.payload
    const orderList = shopData.filter(item => item.isChecked)
    return [...state,...orderList]
}

export default reducer