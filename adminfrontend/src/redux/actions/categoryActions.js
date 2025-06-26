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
    // const baseURL = "http://localhost:8000";
    try {
        dispatch ({
            type: LIST_CATEGORY_REQUEST,
        })
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
            'http://localhost:8000/adminapi/categories/',
            config
        )

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
            'http://localhost:8000/adminapi/categories/',
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
             'http://localhost:8000/adminapi/categories/',
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
             `http://localhost:8000/adminapi/categories/${id}/`,
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