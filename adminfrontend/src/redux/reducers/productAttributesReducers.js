import {
    ADD_PRODUCT_ATTRIBUTES_REQUEST,
    ADD_PRODUCT_ATTRIBUTES_SUCCESS,
    ADD_PRODUCT_ATTRIBUTES_FAILURE,
    FETCH_PRODUCT_ATTRIBUTES_REQUEST,
    FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
    FETCH_PRODUCT_ATTRIBUTES_FAILURE,
    DELETE_PRODUCT_ATTRIBUTES_REQUEST,
    DELETE_PRODUCT_ATTRIBUTES_SUCCESS,
    DELETE_PRODUCT_ATTRIBUTES_FAILURE,
    EDIT_PRODUCT_ATTRIBUTES_REQUEST,
    EDIT_PRODUCT_ATTRIBUTES_SUCCESS,
    EDIT_PRODUCT_ATTRIBUTES_FAILURE,
    LIST_PRODUCT_ATTRIBUTES_REQUEST,
    LIST_PRODUCT_ATTRIBUTES_SUCCESS,
    LIST_PRODUCT_ATTRIBUTES_FAILURE,
} from '../constants/productAttributesConstants';


const initialState = {
    productAttributes: [], 
  };


export const addProductAttributesReducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD_PRODUCT_ATTRIBUTES_REQUEST:
          return { loading: true, productAttributes: [] }; 

      case ADD_PRODUCT_ATTRIBUTES_SUCCESS:
          return { loading: false, productAttributes: action.payload }; 

      case ADD_PRODUCT_ATTRIBUTES_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};



export const fetchProductAttributesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_ATTRIBUTES_REQUEST:
            return { loading: true, productAttributes: [] }; 
  
        case FETCH_PRODUCT_ATTRIBUTES_SUCCESS:
            return { loading: false, productAttributes: action.payload }; 
  
        case FETCH_PRODUCT_ATTRIBUTES_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


export const listProductAttributesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_PRODUCT_ATTRIBUTES_REQUEST:
            return { loading: true, productAttributes: [] }; 
  
        case LIST_PRODUCT_ATTRIBUTES_SUCCESS:
            return { loading: false, productAttributes: action.payload }; 
  
        case LIST_PRODUCT_ATTRIBUTES_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


export const editProductAttributesReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PRODUCT_ATTRIBUTES_REQUEST:
            return { loading: true, productAttributes: [] }; 
  
        case EDIT_PRODUCT_ATTRIBUTES_SUCCESS:
            return { loading: false, productAttributes: action.payload }; 
  
        case EDIT_PRODUCT_ATTRIBUTES_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };

export const deleteProductAttributesReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_ATTRIBUTES_REQUEST:
            return { loading: true, productAttributes: [] }; 
  
        case DELETE_PRODUCT_ATTRIBUTES_SUCCESS:
            return { loading: false, deleteSuccess: action.payload }; 
  
        case DELETE_PRODUCT_ATTRIBUTES_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };

