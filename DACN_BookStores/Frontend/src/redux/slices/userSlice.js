import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    username: null,
    displayName: null,
    email: null,
    role: null,
    gender: null,
    address: null,
    birthday: null,
    phoneNumber: null,
    cartId: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action để lưu thông tin người dùng
        saveUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.userName;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.gender = action.payload.gender;
            state.role = action.payload.role;
            state.address = action.payload.address;
            state.birthday = action.payload.birthday;
            state.phoneNumber = action.payload.phoneNumber;
            state.cartId = action.payload.cartId;
        },
        // Action để xóa thông tin người dùng
        clearUser: (state) => {
            state.id = null;
            state.username = null;
            state.displayName = null;
            state.email = null;
            state.role = null;
            state.gender = null;
            state.address = null;
            state.birthday = null;
            state.phoneNumber = null;
            state.cartId = null;
        },
    },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
