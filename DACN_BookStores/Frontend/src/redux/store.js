import { createStore } from 'redux';
import rootReducer from './reducer/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import loadingSlide from './slices/loadingSlide';
import cartSlice from './slices/cartSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        loading: loadingSlide,
        cart: cartSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
