import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import loadingSlide from './slices/loadingSlide';

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        loading: loadingSlide,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
