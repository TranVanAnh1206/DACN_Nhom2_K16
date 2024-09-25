import { SAVE_USER_INFO, CLEAR_USER_INFO } from '../actions/userActions';

const initialState = {
    id: null,
    username: null,
    email: null,
    role: null,
    address: null,
    phoneNumber: null,
    cartId: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_INFO:
            return {
                ...state,
                id: action.payload?.id,
                username: action.payload?.username,
                email: action.payload?.email,
                role: action.payload?.role,
                address: action.payload?.address,
                phoneNumber: action.payload?.phoneNumber,
                cartId: action.payload?.cartId,
            };
        case CLEAR_USER_INFO:
            return {
                id: null,
                username: null,
                email: null,
                role: null,
                address: null,
                phoneNumber: null,
                cartId: null,
            };
        default:
            return state;
    }
};

export default userReducer;
