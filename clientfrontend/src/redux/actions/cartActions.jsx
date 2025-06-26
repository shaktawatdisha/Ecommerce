// src/actions/cartActions.js
import axios from 'axios';
import { 
    ADD_TO_CART_REQUEST, 
    ADD_TO_CART_SUCCESS, 
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_FAILURE,
    REMOVE_FROM_CART_SUCCESS,
    FETCH_FROM_CART_REQUEST,
    FETCH_FROM_CART_SUCCESS,
    FETCH_FROM_CART_FAILURE, 
    CLEAR_CART, 
    ADD_TO_CART_FAILURE} from '../constants/cartConstants';



export const fetchCart = () => async (dispatch) => {
    try {
        dispatch ({
            type: FETCH_FROM_CART_REQUEST,
        })
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const {data} = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/v1/cart`,
            config
        )

        dispatch({
            type: FETCH_FROM_CART_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_FROM_CART_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const addToCart = (item) => async (dispatch) => {
    console.log("item to add in action", item)
    try {
        dispatch({
            type: ADD_TO_CART_REQUEST,
        })

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/cart/`,
            {
                product: item,
            },
            config
        )
        console.log("added to cart in action",data)
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAILURE,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
};

    

export const removeFromCart = (itemId) => async (dispatch) => {
    console.log("remove product form the cart")
    try{
        dispatch({
            type: REMOVE_FROM_CART_REQUEST,
        });
         
        const token = localStorage.getItem("token")

        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            }
        }

        const {data} = await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/v1/cart/${itemId}`,
            config
        )
        console.log("data frim cart remove:", data)

        dispatch({
            type: REMOVE_FROM_CART_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: REMOVE_FROM_CART_FAILURE,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

// export const clearCart = () => ({
//     type: CLEAR_CART,
// });
