import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const AT = localStorage.getItem('token');

const initialState = {
    accessToken: AT ? AT : '',
    login_Error: null,
    login_Success: AT ? true : false,
};

const authSlice = createSlice({
    name: 'auth/login',
    initialState,
    reducers: {
        loginStart: (state) => {
            (state.login_Error = null), (state.login_Success = false);
        },
        loginSuccess: (state, action) => {
            state.login_Success = true;
            state.accessToken = action.payload.token;
        },
        loginFailure: (state, action) => {
            state.login_Error = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.login_Error = null;
            state.login_Successed = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
