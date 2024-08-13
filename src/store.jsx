import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Components/js/addToCart.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
