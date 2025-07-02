// src/actions/cartActions.js
import axios from 'axios';
import {
    ADD_BRAND_REQUEST,
    ADD_BRAND_SUCCESS,
    ADD_BRAND_FAILURE,
    FETCH_BRAND_REQUEST,
    FETCH_BRAND_SUCCESS,
    FETCH_BRAND_FAILURE,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAILURE,
    EDIT_BRAND_REQUEST,
    EDIT_BRAND_SUCCESS,
    EDIT_BRAND_FAILURE,
    LIST_BRAND_REQUEST,
    LIST_BRAND_SUCCESS,
    LIST_BRAND_FAILURE,
} from '../constants/brandConstants';


export const listBrandAction = () => async (dispatch) => {
    try {
        dispatch ({
            type: LIST_BRAND_REQUEST,
        })
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
            //  `${process.env.REACT_APP_API_URL}/adminapi/v1/Brand/`,
            'http://localhost:8000/adminapi/brands/',
            config
        )

        dispatch({
            type: LIST_BRAND_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LIST_BRAND_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const fetchBrandAction = (id) => async (dispatch) => {
    try {
        dispatch ({
            type: FETCH_BRAND_REQUEST,
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
            `http://localhost:8000/adminapi/brands/${id}`,
            config
        )

        dispatch({
            type: FETCH_BRAND_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_BRAND_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const addBrandAction = (item) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_BRAND_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.post(
            //  `${process.env.REACT_APP_API_URL}/adminapi/v1/Brand/`,
            'http://localhost:8000/adminapi/brands/',
            item,
            config
        )
        dispatch({
            type: ADD_BRAND_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADD_BRAND_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};


export const deleteBrandAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_BRAND_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.delete(
            //  `${process.env.REACT_APP_API_URL}/adminapi/v1/brand/${id}/`,
            `http://localhost:8000/adminapi/brands/${id}/`,
            config
        )
        dispatch({
            type: DELETE_BRAND_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DELETE_BRAND_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};