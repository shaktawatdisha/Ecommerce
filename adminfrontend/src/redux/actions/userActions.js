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
} from '../constants/userConstants'
import axios from 'axios'

export const listUsersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const token = localStorage.getItem('token')
    console.log("token inuser list ", token)

    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/adminapi/v1/users/`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

  export const detailUserAction = (userId) => async (dispatch) => {
    try {
      dispatch({
        type: USER_DETAIL_REQUEST,
      });

      const token = localStorage.getItem("token");
      console.log("barear token", token)
      const config = {
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
         `${process.env.REACT_APP_API_URL}/adminapi/v1/users/${userId}/`,
        config
      );

      dispatch({
        type: USER_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAIL_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};

export const loginAction = (email, pass) => async (dispatch) => {
  console.log("login action called", email, pass)
  try {
      dispatch({
          type: USER_LOGIN_REQUEST,
      });

      const config = {
          headers: {
              'Content-Type': 'application/json',
          },
      };
      console.log("step 1")
      // console.log("login action called", process.env.REACT_APP_API_URL)
      const { data } = await axios.post(
          //  `${process.env.REACT_APP_API_URL}/adminapi/v1/login`,
          'http://localhost:8000/adminapi/v1/login',
          {
              email: email,
              password: pass,
          },
          config
      );
      console.log("step 2", data)
    
      const token = data.data.token.access;
      console.log("token in login action", token)

      dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
      });

      localStorage.setItem('token',token)
  } catch (error) {
    console.log("error in login action", error)
      dispatch({
          type: USER_LOGIN_FAIL, 
          payload: error.response && error.response.data.message 
              ? error.response.data.message 
              : error.message,
      });
  }
};


export const logoutAction = () => {
  localStorage.removeItem('token');   
  return { type: USER_LOGOUT };
};