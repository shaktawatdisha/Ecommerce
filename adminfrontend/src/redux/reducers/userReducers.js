import {
    USER_DETAIL_FAILURE,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_LIST_FAILURE,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
  } from "../constants/userConstants";


export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true, users: [] }; 

        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }; 

        case USER_LIST_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state; 
    }
};


export const userDetailReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return { loading: true, user: [] }; 

        case USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload }; 

        case USER_DETAIL_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state; 
    }
};


export const userLoginReducer = (state={}, action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
 }
