import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    id: '',
    userId: '',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.id = action.payload.id;
            state.userId = action.payload.userId;
            state.cartItems = action.payload.cartItems;
        },
        removeCartItem: (state) => {
            state.cartItems = [];
            state.id = '';
            state.userId = '';
        },
    },
});

export const { setCartItems, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
