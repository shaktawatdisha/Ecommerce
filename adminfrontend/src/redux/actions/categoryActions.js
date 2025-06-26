// src/actions/cartActions.js
import axios from 'axios';
import {
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
    EDIT_CATEGORY_REQUEST,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_FAILURE,
    LIST_CATEGORY_REQUEST,
    LIST_CATEGORY_SUCCESS,
    LIST_CATEGORY_FAILURE,
} from '../constants/categoryConstants';


export const listCategoryAction = () => async (dispatch) => {
    console.log("to fetch category list in action")
    // const baseURL = "http://localhost:8000";
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
    console.log("baseURL in list category action", baseURL)
    try {
        dispatch ({
            type: LIST_CATEGORY_REQUEST,
        })
        const token = localStorage.getItem("token");
        console.log("token in list category action", import.meta.env.REACT_APP_API_URL)
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
            //  `${process.env.REACT_APP_API_URL}/adminapi/v1/category/`,
            'http://localhost:8000/adminapi/v1/category/',
            config
        )

        console.log("category list data in action", data)
        dispatch({
            type: LIST_CATEGORY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LIST_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const fetchCategoryAction = (id) => async (dispatch) => {
    console.log("to fetch category detail in action",id)
    try {
        dispatch ({
            type: FETCH_CATEGORY_REQUEST,
        })
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
             `${process.env.REACT_APP_API_URL}/adminapi/v1/category/${id}/`,
            config
        )
        console.log("category detail data in action", data)

        dispatch({
            type: FETCH_CATEGORY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const addCategoryAction = (item) => async (dispatch) => {
    console.log("category details", item)
    try {
        dispatch({
            type: ADD_CATEGORY_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.post(
             `${process.env.REACT_APP_API_URL}/adminapi/v1/category/`,
            item,
            config
        )
        console.log("data", data)
        dispatch({
            type: ADD_CATEGORY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADD_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};


export const deleteCategoryAction = (id) => async (dispatch) => {
    console.log("delete category action ", id)
    try {
        dispatch({
            type: DELETE_CATEGORY_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.delete(
             `${process.env.REACT_APP_API_URL}/adminapi/v1/category/${id}/`,
            config
        )
        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};