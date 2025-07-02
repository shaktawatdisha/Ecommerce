import {
    ADD_BRAND_REQUEST,
    ADD_BRAND_SUCCESS,
    ADD_BRAND_FAILURE,
    FETCH_BRAND_REQUEST,
    FETCH_BRAND_SUCCESS,
    FETCH_BRAND_FAILURE,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAILURE,
    EDIT_BRAND_REQUEST,
    EDIT_BRAND_SUCCESS,
    EDIT_BRAND_FAILURE,
    LIST_BRAND_REQUEST,
    LIST_BRAND_SUCCESS,
    LIST_BRAND_FAILURE,
} from '../constants/brandConstants';


const initialState = {
    brand: [], 
  };


export const addBrandReducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD_BRAND_REQUEST:
          return { loading: true, brand: [] }; 

      case ADD_BRAND_SUCCESS:
          return { loading: false, brand: action.payload }; 

      case ADD_BRAND_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};



export const fetchBrandReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BRAND_REQUEST:
            return { loading: true, brand: [] }; 
  
        case FETCH_BRAND_SUCCESS:
            return { loading: false, brand: action.payload }; 
  
        case FETCH_BRAND_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


export const listBrandReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_BRAND_REQUEST:
            return { loading: true, brand: [] }; 
            
            case LIST_BRAND_SUCCESS:
            return { loading: false, brand: action.payload }; 
  
        case LIST_BRAND_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


export const editBrandReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_BRAND_REQUEST:
            return { loading: true, brand: [] }; 
  
        case EDIT_BRAND_SUCCESS:
            return { loading: false, brand: action.payload }; 
  
        case EDIT_BRAND_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };

export const deleteBrandReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_BRAND_REQUEST:
            return { loading: true, brand: [] }; 
  
        case DELETE_BRAND_SUCCESS:
            return { loading: false, deleteSuccess: action.payload }; 
  
        case DELETE_BRAND_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };

