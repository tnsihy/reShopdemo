import { ORDER_SUBMIT } from './../actionTypes/order'

export const orderSubmit = (shopData) => (
    {
        type: ORDER_SUBMIT,
        payload: shopData
    }
)
