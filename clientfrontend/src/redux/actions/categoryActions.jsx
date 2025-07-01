import {
  CATEGORY_DETAIL_FAILURE,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  } from "../constants/categoryConstants";
  import axios from "axios";
  
  export const listCategory = () => async (dispatch) => {
    console.log("listCategory action called");
    try {
      dispatch({
        type: CATEGORY_LIST_REQUEST,
      });
  
      const token = localStorage.getItem("token");
      console.log("token", token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await axios.get(
        'http://localhost:8000/api/category',
        config
      );
  
      console.log("data", data);
      dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  
  export const CategoryDetail = (categoryId) => async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_DETAIL_REQUEST,
      });
  
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await axios.get(
       `http://localhost:8000/api/category/${categoryId}`,
        config
      );
  
      dispatch({
        type: CATEGORY_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_DETAIL_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };