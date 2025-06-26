import {
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    LIST_PRODUCT_REQUEST,
    LIST_PRODUCT_SUCCESS,
    LIST_PRODUCT_FAILURE,
} from '../constants/productConstants';

const initialState = {
    product: [], 
  };


export const addProductReducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD_PRODUCT_REQUEST:
          return { loading: true, product: [] }; 

      case ADD_PRODUCT_SUCCESS:
          return { loading: false, product: action.payload }; 

      case ADD_PRODUCT_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};



export const fetchProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return { loading: true, product: [] }; 
  
        case FETCH_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }; 
  
        case FETCH_PRODUCT_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


export const listProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_PRODUCT_REQUEST:
            return { loading: true, product: [] }; 
  
        case LIST_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }; 
  
        case LIST_PRODUCT_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


export const editProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PRODUCT_REQUEST:
            return { loading: true, product: [] }; 
  
        case EDIT_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }; 
  
        case EDIT_PRODUCT_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


export const deleteProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return { loading: true, product: [] }; 
  
        case DELETE_PRODUCT_SUCCESS:
            return { loading: false, deleteSuccess: action.payload }; 
  
        case DELETE_PRODUCT_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };

