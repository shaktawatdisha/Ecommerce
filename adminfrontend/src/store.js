import { configureStore, createSlice } from '@reduxjs/toolkit';
import { userListReducer, userDetailReducer, userLoginReducer } from './redux/reducers/userReducers'; 
import { addCategoryReducer, listCategoryReducer, fetchCategoryReducer, deleteCategoryReducer, editCategoryReducer } from './redux/reducers/categoryReducers';
import { addProductReducer, listProductReducer, fetchProductReducer, deleteProductReducer, editProductReducer } from './redux/reducers/productReducers';
import { addProductAttributesReducer, listProductAttributesReducer, fetchProductAttributesReducer, deleteProductAttributesReducer, editProductAttributesReducer } from './redux/reducers/productAttributesReducers';
import { addBrandReducer, listBrandReducer, fetchBrandReducer, deleteBrandReducer, editBrandReducer } from './redux/reducers/brandReducers';

const initialState = {
  sidebarShow: true,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui', 
  initialState,
  reducers: {
    set: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { set } = uiSlice.actions;

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    userList: userListReducer,
    userDetail: userDetailReducer,
    userLogin: userLoginReducer,

    addCategory: addCategoryReducer,
    listCategory: listCategoryReducer,
    fetchCategory: fetchCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    editCategoryReducers: editCategoryReducer,

    addProduct: addProductReducer,
    listProduct: listProductReducer,
    fetchProduct: fetchProductReducer,
    deleteProduct: deleteProductReducer,
    editProduct: editProductReducer,

    addProductAttributes: addProductAttributesReducer,
    listProductAttributes: listProductAttributesReducer,
    fetchProductAttributes: fetchProductAttributesReducer,
    deleteProductAttributes: deleteProductAttributesReducer,
    editProductAttributes: editProductAttributesReducer,

    addBrand: addBrandReducer,
    listBrand: listBrandReducer,
    fetchBrand: fetchBrandReducer,
    deleteBrand: deleteBrandReducer,
    editBrandReducers: editBrandReducer,
    
  },
});

export default store;
