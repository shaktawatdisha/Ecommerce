// src/actions/cartActions.js
import axios from 'axios';
import {
    ADD_ORDER_FAILURE,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_REQUEST,
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAILURE
} from '../constants/orderConstants';



export const fetchOrder = () => async (dispatch) => {
    try {
        dispatch ({
            type: FETCH_ORDER_REQUEST,
        })
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
           `${process.env.REACT_APP_API_URL}/api/v1/order`,
            config
        )
        console.log("order data in action", data)

        dispatch({
            type: FETCH_ORDER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_ORDER_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const addOrder = (item) => async (dispatch) => {
    console.log("order item", item)
    try {
        dispatch({
            type: ADD_ORDER_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/order`,
            item,
            config
        )
        console.log("data", data)
        dispatch({
            type: ADD_ORDER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADD_ORDER_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};