import { ADD_CAR, UP, DOWN, DELETE, SELECT } from './actionType'

// 初始化数据
const defaultState = {
    carInfo: [],
    orderList: [],
    totalMoney: 0
}

// reducer
const reducer = (state = defaultState, action) => {
    let cloneState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ADD_CAR:
            let addcarState = handleAddCar(cloneState, action.value)
            return addcarState
        case UP:
            let creaseState = oprate(cloneState, 'UP', action.value)
            console.log('creaseState', creaseState)
            return creaseState
        case DOWN:
            let decreseState = oprate(cloneState, 'DOWN', action.value)
            return decreseState
        case DELETE:
            let leaveState = deleteClick(cloneState, action.index, action.value)
            return leaveState
        case SELECT:
            let selectedState = changeCheckbox(cloneState, action.value, action.event)
            return selectedState
        default:
            return cloneState
    }
}

// 选中时对总金额进行计算 将选中的商品添加到可能成为订单的数组
const changeCheckbox = (cloneState, addItem, event) => {
    const isChecked = event.target.checked
    const addItemMoney = +(addItem.price * addItem.count).toFixed(2)
    if (isChecked) {
        cloneState.totalMoney = (+cloneState.totalMoney + +addItemMoney).toFixed(2)
        cloneState.orderList.push(addItem)
    } else {
        cloneState.totalMoney = (+cloneState.totalMoney - +addItemMoney).toFixed(2)
        cloneState.orderList.splice(cloneState.orderList.indexOf(addItem), 1)
    }
    console.log('成为订单选项', cloneState.orderList)
    return cloneState
}


// 单个商品删除
const deleteClick = (cloneState, index, deleteItem) => {
    console.log(index)
    console.log(deleteItem)
    cloneState.carInfo.splice(index, 1)
    return cloneState
}


// 商品相加减
const oprate = (cloneState, oprateMethod, oprateItem) => {
    cloneState.carInfo.forEach(item => {
        if (item.id === oprateItem.id) {
            console.log(oprateMethod)
            if (oprateMethod === 'UP') {
                item.count += 1
                console.log(item.count)
            } else {
                if (item.count === 1) {
                    alert('不能再减少了')
                } else {
                    item.count -= 1
                }
            }
        }
    })
    console.log(cloneState)
    return cloneState
}


// 加入购物车
const handleAddCar = (clonestate, addItem) => {
    const addItemId = addItem.id
    const findItem = clonestate.carInfo.find(item => (item.id === addItemId))
    // 有该商品数量加1
    if (findItem) {
        clonestate.carInfo.forEach(item => {
            if (item.id === addItemId) {
                item.count += 1
            }
        })
    } else {
        // 没有该商品存进去并初始化数量为1
        const copyAddItem = Object.assign({}, addItem, {
            count: 1
        })
        clonestate.carInfo.push(copyAddItem)
    }
    console.log('已加入购物车的数据', clonestate.carInfo)
    return clonestate
}

export default reducer