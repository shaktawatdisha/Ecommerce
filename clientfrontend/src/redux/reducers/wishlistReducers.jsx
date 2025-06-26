import { loadWishlist } from "../actions/wishlistActions";
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


const initialState = {
    products: [], 
  };


export const addWishlistReducers = (state = initialState, action) => {
  switch (action.type) {
      case ADD_TO_WISHLIST_REQUEST:
          return { loading: true, products: [] }; 

      case ADD_TO_WISHLIST_SUCCESS:
          return { loading: false, products: action.payload }; 

      case ADD_TO_WISHLIST_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};


export const removeWishlistReducers = (state = { products: [] }, action) => {
  switch (action.type) {
      case REMOVE_FROM_WISHLIST_REQUEST:
          return { loading: true, products: [] }; 

      case REMOVE_FROM_WISHLIST_SUCCESS:
          return { loading: false, products: action.payload }; 

      case REMOVE_FROM_WISHLIST_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};


export const fetchWishlistReducers = (state = { products: [] }, action) => {
  switch (action.type) {
      case FETCH_FROM_WISHLIST_REQUEST:
          return { loading: true, products: [] }; 

      case FETCH_FROM_WISHLIST_SUCCESS:
          return { loading: false, products: action.payload }; 

      case FETCH_FROM_WISHLIST_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};

