// src/actions/cartActions.js
import axios from 'axios';
import {
    ADD_PRODUCT_ATTRIBUTES_REQUEST,
    ADD_PRODUCT_ATTRIBUTES_SUCCESS,
    ADD_PRODUCT_ATTRIBUTES_FAILURE,
    FETCH_PRODUCT_ATTRIBUTES_REQUEST,
    FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
    FETCH_PRODUCT_ATTRIBUTES_FAILURE,
    DELETE_PRODUCT_ATTRIBUTES_REQUEST,
    DELETE_PRODUCT_ATTRIBUTES_SUCCESS,
    DELETE_PRODUCT_ATTRIBUTES_FAILURE,
    EDIT_PRODUCT_ATTRIBUTES_REQUEST,
    EDIT_PRODUCT_ATTRIBUTES_SUCCESS,
    EDIT_PRODUCT_ATTRIBUTES_FAILURE,
    LIST_PRODUCT_ATTRIBUTES_REQUEST,
    LIST_PRODUCT_ATTRIBUTES_SUCCESS,
    LIST_PRODUCT_ATTRIBUTES_FAILURE,
} from '../constants/productAttributesConstants';


export const listProductAttributesAction = () => async (dispatch) => {
    try {
        dispatch ({
            type: LIST_PRODUCT_ATTRIBUTES_REQUEST,
        })
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
            //  `${process.env.REACT_APP_API_URL}/adminapi/v1/category/`,
            'http://localhost:8000/adminapi/product-attributes/',
            config
        )

        dispatch({
            type: LIST_PRODUCT_ATTRIBUTES_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LIST_PRODUCT_ATTRIBUTES_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const fetchProductAttributesAction = (id) => async (dispatch) => {
    try {
        dispatch ({
            type: FETCH_PRODUCT_ATTRIBUTES_REQUEST,
        })
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
            //  `${process.env.REACT_APP_API_URL}/api/categories/${id}/`,
            `http://localhost:8000/adminapi/product-attributes/${id}`,
            config
        )

        dispatch({
            type: FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCT_ATTRIBUTES_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const addProductAttributesAction = (item) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_PRODUCT_ATTRIBUTES_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.post(
            //  `${process.env.REACT_APP_API_URL}/adminapi/v1/category/`,
            'http://localhost:8000/adminapi/product-attributes/',
            item,
            config
        )
        dispatch({
            type: ADD_PRODUCT_ATTRIBUTES_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_ATTRIBUTES_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};


export const deleteProductAttributesAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_ATTRIBUTES_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.delete(
            //  `${process.env.REACT_APP_API_URL}/adminapi/v1/product-attributes/${id}/`,
            `http://localhost:8000/adminapi/product-attributes/${id}/`,
            config
        )
        dispatch({
            type: DELETE_PRODUCT_ATTRIBUTES_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_ATTRIBUTES_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};