import { getPersonalInfoService } from '~/services/userServices';
import { clearUser, saveUser } from '../slices/userSlice';

export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export const saveUserInfo = (payload) => {
    return {
        type: SAVE_USER_INFO,
        payload,
    };
};

export const clearUserInfo = () => {
    return {
        type: CLEAR_USER_INFO,
    };
};

const saveUserInfors = () => async (dispatch) => {
    try {
        var user = await getPersonalInfoService();

        // console.log(user);

        if (user && user.data) {
            dispatch(saveUser(user.data));
            return user;
        }

        return null;
    } catch (error) {
        console.error(error);
        dispatch(clearUser());
    }
};

export { saveUserInfors };
