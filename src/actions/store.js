import { ADD_CAR } from './../actionTypes/store'
export const addCar = (item) => (
    {
        type: ADD_CAR,
        payload: item
    }
)

