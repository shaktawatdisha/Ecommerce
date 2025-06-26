import { 
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
    FETCH_FROM_CART_REQUEST,
    FETCH_FROM_CART_FAILURE,
    FETCH_FROM_CART_SUCCESS,
} from "../constants/cartConstants";



const initialState = {
    products: [], 
  };


export const addCartReducers = (state = initialState, action) => {
  switch (action.type) {
      case ADD_TO_CART_REQUEST:
          return { loading: true, products: [] }; 

      case ADD_TO_CART_SUCCESS:
          return { loading: false, products: action.payload }; 

      case ADD_TO_CART_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};


export const removeCartReducers = (state = { products: [] }, action) => {
  switch (action.type) {
      case REMOVE_FROM_CART_REQUEST:
          return { loading: true, products: [] }; 

      case REMOVE_FROM_CART_SUCCESS:
          return { loading: false, products: action.payload }; 

      case REMOVE_FROM_CART_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};


export const fetchCartReducers = (state = { products: [] }, action) => {
  switch (action.type) {
      case FETCH_FROM_CART_REQUEST:
          return { loading: true, products: [] }; 

      case FETCH_FROM_CART_SUCCESS:
          return { loading: false, products: action.payload }; 

      case FETCH_FROM_CART_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};

