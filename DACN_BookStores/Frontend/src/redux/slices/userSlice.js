import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    username: null,
    email: null,
    role: null,
    address: null,
    phoneNumber: null,
    cartId: null,
};

const userSlice = createSlice({
    name: 'user/get_infor',
    initialState,
    reducers: {
        // Action để lưu thông tin người dùng
        saveUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.userName;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.address = action.payload.address;
            state.phoneNumber = action.payload.phoneNumber;
            state.cartId = action.payload.cartId;
        },
        // Action để xóa thông tin người dùng
        clearUser: (state) => {
            state.id = null;
            state.username = null;
            state.email = null;
            state.role = null;
            state.address = null;
            state.phoneNumber = null;
            state.cartId = null;
        },
    },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
