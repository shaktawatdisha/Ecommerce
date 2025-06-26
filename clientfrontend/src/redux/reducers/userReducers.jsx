import { 
    USER_SIGNUP_REQUEST, 
    USER_SIGNUP_SUCCESS, 
    USER_SIGNUP_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    PROFILE_FETCH_FAIL,
    PROFILE_FETCH_REQUEST,
    PROFILE_FETCH_SUCCESS
 } from '../constants/userConstants'; 


export const userSignupReducers = (state={}, action)=>{
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {loading:true}
        case USER_SIGNUP_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case USER_SIGNUP_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }
 }


export const userLoginReducers = (state={}, action)=>{
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

 export const profileReducers = (state={}, action)=>{
    switch(action.type){
        case PROFILE_FETCH_REQUEST:
            return {loading:true}
        case PROFILE_FETCH_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case PROFILE_FETCH_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
 }

