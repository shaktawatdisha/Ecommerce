import { 
    ADD_TO_WISHLIST_REQUEST,
    ADD_TO_WISHLIST_FAILURE,
    ADD_TO_WISHLIST_SUCCESS,
    FETCH_FROM_WISHLIST_REQUEST,
    FETCH_FROM_WISHLIST_FAILURE,
    FETCH_FROM_WISHLIST_SUCCESS,
    REMOVE_FROM_WISHLIST_REQUEST,
    REMOVE_FROM_WISHLIST_SUCCESS,
    REMOVE_FROM_WISHLIST_FAILURE
  } from "../constants/wishlistConstants";
import axios from "axios";


export const addWishItem = (product) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_TO_WISHLIST_REQUEST,
      });
  
      const token = localStorage.getItem("token");
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
       `${process.env.REACT_APP_API_URL}/api/v1/wishlist`,
        {
            product: product.id
        },
        config
      );
      
      console.log("data after adding in wishlist",data)
      dispatch({
        type: ADD_TO_WISHLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("error happened", error)
      dispatch(
        {
        type: ADD_TO_WISHLIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  

export const fetchWishItem = () => async (dispatch) => {
    try {
      dispatch({
        type: FETCH_FROM_WISHLIST_REQUEST,
      });
  
      const token = localStorage.getItem("token");
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await axios.get(
       `${process.env.REACT_APP_API_URL}/api/v1/wishlist`,
        config
      );
      
      console.log("data", {data})
      dispatch({
        type: FETCH_FROM_WISHLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("error", error)
      dispatch({
        type: FETCH_FROM_WISHLIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};


export const removeWishItem = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_FROM_WISHLIST_REQUEST,
    });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Pass productId in the URL to specify which item to delete
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/wishlist/${productId}`,
      config
    );

    dispatch({
      type: REMOVE_FROM_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_WISHLIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
  

// const saveWishlistToLocalStorage = (wishlist) => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
// };

// const loadWishlistFromLocalStorage = () => {
//     const savedWishlist = localStorage.getItem('wishlist');
//     return savedWishlist ? JSON.parse(savedWishlist) : [];
// };



// export const addItem = (item) => (dispatch, getState) => {
//     console.log("item added in wishlkist")
//     dispatch({
//         type: ADD_ITEM,
//         payload: item,
//     });

//     const { wishlist } = getState();
//     saveWishlistToLocalStorage(wishlist.items);
// };

// export const removeItem = (index) => (dispatch, getState) => {
//     dispatch({
//         type: REMOVE_ITEM,
//         payload: index,
//     });

//     const { wishlist } = getState();
//     saveWishlistToLocalStorage(wishlist.items);
// };

// export const loadWishlist = () => {
//     return loadWishlistFromLocalStorage();
// };
