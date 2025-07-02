import {
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
    EDIT_CATEGORY_REQUEST,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_FAILURE,
    LIST_CATEGORY_REQUEST,
    LIST_CATEGORY_SUCCESS,
    LIST_CATEGORY_FAILURE,
} from '../constants/categoryConstants';


const initialState = {
    category: [], 
  };


export const addCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD_CATEGORY_REQUEST:
          return { loading: true, category: [] }; 

      case ADD_CATEGORY_SUCCESS:
          return { loading: false, category: action.payload }; 

      case ADD_CATEGORY_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};



export const fetchCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_REQUEST:
            return { loading: true, category: [] }; 
  
        case FETCH_CATEGORY_SUCCESS:
            return { loading: false, category: action.payload }; 
  
        case FETCH_CATEGORY_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


export const listCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_CATEGORY_REQUEST:
            return { loading: true, category: [] }; 
  
        case LIST_CATEGORY_SUCCESS:
            return { loading: false, category: action.payload }; 
  
        case LIST_CATEGORY_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


export const editCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_CATEGORY_REQUEST:
            return { loading: true, category: [] }; 
  
        case EDIT_CATEGORY_SUCCESS:
            return { loading: false, category: action.payload }; 
  
        case EDIT_CATEGORY_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };

export const deleteCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return { loading: true, category: [] }; 
  
        case DELETE_CATEGORY_SUCCESS:
            return { loading: false, deleteSuccess: action.payload }; 
  
        case DELETE_CATEGORY_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };

