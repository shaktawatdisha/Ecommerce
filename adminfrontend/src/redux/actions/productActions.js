// src/actions/cartActions.js
import axios from 'axios';
import {
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    LIST_PRODUCT_REQUEST,
    LIST_PRODUCT_SUCCESS,
    LIST_PRODUCT_FAILURE,
} from '../constants/productConstants';


export const listProductAction = () => async (dispatch) => {
    try {
        dispatch ({
            type: LIST_PRODUCT_REQUEST,
        })
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
             `${process.env.REACT_APP_API_URL}/adminapi/v1/product/`,
            config
        )
        dispatch({
            type: LIST_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LIST_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const fetchProductAction = (id) => async (dispatch) => {
    try {
        dispatch ({
            type: FETCH_PRODUCT_REQUEST,
        })
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
             `${process.env.REACT_APP_API_URL}/adminapi/v1/product/${id}/`,
            config
        )

        dispatch({
            type: FETCH_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const addProductAction = (item) => async (dispatch) => {
    console.log("add product in actions file:", item)
    try {
        dispatch({
            type: ADD_PRODUCT_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.post(
             `${process.env.REACT_APP_API_URL}/adminapi/v1/product/`,
            item,
            config
        )
        console.log("response from the api and data: ", data)
        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};


export const deleteProductAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.delete(
             `${process.env.REACT_APP_API_URL}/adminapi/v1/product/${id}/`,
            config
        )
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};