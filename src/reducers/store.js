import { ADD_CAR } from './../actionTypes/store'
import { ADD_SHOP, DECREASE_SHOP, DELETE_SHOP, CHECK_SHOP } from './../actionTypes/shopcar'

const reducer = (state = [], action) => {
  switch (action.type) {
    // 商城操作
    case ADD_CAR:
      return addCar(state, action)
    case ADD_SHOP:
      return addShop(state, action)
    case DECREASE_SHOP:
      return decreaseShop(state, action)
    case DELETE_SHOP:
      return deleteShop(state, action)
    case CHECK_SHOP:
      return checkShop(state, action)
    default:
      return state;
  }
}

function addCar(state, action) {
  const addItem = action.payload;
  const addItemId = addItem.id
  const findItem = state.find(item => (item.id === addItemId))

  // 有该商品数量+1
  if (findItem) {
    return state.map(item => {
      if (item.id === addItemId) {
        return Object.assign({}, item, { count: item.count + 1 })
      }
      return item;
    })
  } else {
    // 没有该商品，则存进去state，并且初始化数量为1
    // Object.assign(target,...sources) 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
    const copyAddItem = Object.assign({}, addItem, {
      count: 1,
      isChecked: false
    })
    return [...state, copyAddItem]
  }

}

function addShop(state, action) {
  const addItemId = action.payload;
  const newState = state.map(item => {
    if (item.id === addItemId) {
      return Object.assign({}, item, { count: item.count + 1 })
    }
    return item;
  })
  return newState;
}

function decreaseShop(state, action) {
  const addItemId = action.payload;
  const newState = state.map(item => {
    if (item.id === addItemId) {
      // 如果数量为1，则不发生改变
      if (item.count === 1) return item;
      return Object.assign({}, item, { count: item.count - 1 })
    }
    return item;
  })
  return newState;
}


function deleteShop(state, action) {
  // const deleteId = action.payload
  // return state.filter(item =>
  //   item.id !== deleteId
  // )
}

function checkShop(state, action) {
  const { id, isChecked } = action.payload
  return state.map((item) => {
    if (item.id === id) {
      return Object.assign({}, item, {
        isChecked: isChecked
      })
    }
    return item
  })
}


export default reducer;