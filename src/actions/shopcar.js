import { DECREASE_SHOP, ADD_SHOP, DELETE_SHOP, CHECK_SHOP,ORDER_SUBMIT } from './../actionTypes/shopcar'

export const addShop = (id) => ({
    type: ADD_SHOP,
    payload: id
})

export const decreaseShop = (id) => ({
    type: DECREASE_SHOP,
    payload: id
})

export const deleteShop = (id) => ({
    type: DELETE_SHOP,
    payload: id
})

export const checkShop = (id, isChecked) => ({
    type: CHECK_SHOP,
    payload: {
        id,
        isChecked
    }
})

export const orderSubmit = () => ({
    type:ORDER_SUBMIT
})