import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

const LoadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
