import { 
    ADD_ORDER_FAILURE,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAILURE
} from "../constants/orderConstants";



const initialState = {
    products: [], 
  };


export const addOrderReducers = (state = initialState, action) => {
  switch (action.type) {
      case ADD_ORDER_REQUEST:
          return { loading: true, products: [] }; 

      case ADD_ORDER_SUCCESS:
          return { loading: false, products: action.payload }; 

      case ADD_ORDER_FAILURE:
          return { loading: false, error: action.payload };

      default:
          return state; 
  }
};



export const fetchOrderReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_REQUEST:
            return { loading: true, products: [] }; 
  
        case FETCH_ORDER_SUCCESS:
            return { loading: false, products: action.payload }; 
  
        case FETCH_ORDER_FAILURE:
            return { loading: false, error: action.payload };
  
        default:
            return state; 
    }
  };


//   export const listOrderReducers = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_ORDER_REQUEST:
//             return { loading: true, products: [] }; 
  
//         case ADD_ORDER_SUCCESS:
//             return { loading: false, products: action.payload }; 
  
//         case ADD_ORDER_FAILURE:
//             return { loading: false, error: action.payload };
  
//         default:
//             return state; 
//     }
//   };
