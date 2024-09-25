import { loginService } from '~/services/userServices';
import { loginStart, loginSuccess } from '../slices/authSlice';

const userLogin = (credentials) => async (dispatch) => {
    dispatch(loginStart());

    try {
        var res = await loginService(credentials);

        console.log(res);

        if (res && res.data && res.status === 200) {
            dispatch(loginSuccess(res.data));
        }

        return res;
    } catch (err) {
        console.log(err);
        dispatch(loginFailure('Đăng nhập thất bại'));
    }
};

export { userLogin };
