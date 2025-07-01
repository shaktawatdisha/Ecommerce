import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAILURE,
    CATEGORY_DETAIL_FAILURE,
    CATEGORY_DETAIL_REQUEST,
    CATEGORY_DETAIL_SUCCESS
} from '../constants/categoryConstants';



export const categoryListReducers = (state = { category: [] }, action) => {
    console.log("categoryListReducers called with action:", action.payload);
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, category: [] }; 

        case CATEGORY_LIST_SUCCESS:
            return { loading: false, category: action.payload }; 

        case CATEGORY_LIST_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state; 
    }
};


export const categoryDetailReducers = (state = { category: [] }, action) => {
    switch (action.type) {
        case CATEGORY_DETAIL_REQUEST:
            return { loading: true, category: [] }; 

        case CATEGORY_DETAIL_SUCCESS:
            return { loading: false, category: action.payload }; 

        case CATEGORY_DETAIL_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state; 
    }
};