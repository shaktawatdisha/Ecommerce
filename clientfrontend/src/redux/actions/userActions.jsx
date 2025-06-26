import axios from "axios";
import { 
    USER_SIGNUP_REQUEST, 
    USER_SIGNUP_SUCCESS, 
    USER_SIGNUP_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    PROFILE_FETCH_REQUEST,
    PROFILE_FETCH_SUCCESS,
    PROFILE_FETCH_FAIL
 } from '../constants/userConstants'; 

export const signup = (fname, lname, email, pass) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/register`,
            {
                first_name: fname,
                last_name: lname,  
                email: email,
                password: pass,
            },
            config
        );

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
};





export const login = (email, pass) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
           `${process.env.REACT_APP_API_URL}/api/v1/login`,
            {
                email: email,
                password: pass,
            },
            config
        );
        console.log("data",data)
        const token = data.access;

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('token',token)
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
};


export const logout = () => {
    localStorage.removeItem('token');   
    return { type: USER_LOGOUT };
  };


export const profile = () => async (dispatch) => {
    try {
      dispatch({
        type: PROFILE_FETCH_REQUEST,
      });
  
      const token = localStorage.getItem("token");
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/profile`,
        config
      );
  
      dispatch({
        type: PROFILE_FETCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  