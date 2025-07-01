import { configureStore } from '@reduxjs/toolkit';
import { userSignupReducers, userLoginReducers, profileReducers } from './reducers/userReducers'; 
import { productDetailReducers, productListReducers } from './reducers/productReducers';
import { categoryDetailReducers, categoryListReducers } from './reducers/categoryReducers';
import { addWishlistReducers, removeWishlistReducers, fetchWishlistReducers } from './reducers/wishlistReducers';
import { addCartReducers, removeCartReducers, fetchCartReducers } from './reducers/cartReducers';

const store = configureStore({
  reducer: {
    userSignup: userSignupReducers,
    userLogin: userLoginReducers,
    productList: productListReducers,
    productDetail: productDetailReducers,
    categoryList: categoryListReducers,
    categoryDetail: categoryDetailReducers,
    addWishlist: addWishlistReducers,
    removeWishlist: removeWishlistReducers,
    fetchWishlist: fetchWishlistReducers,
    addToCart: addCartReducers,
    removeFromCart: removeCartReducers,
    fetchFromCart: fetchCartReducers,
    profile: profileReducers,
  },
});

export default store; 