import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getPersonalInfoService } from '~/services/userServices';
import * as actions from '~/redux/actions';
import { getCartService } from '~/services/cartService';

const useFetchUserData = () => {
    const dispatch = useDispatch();

    const fetchUserData = useCallback(async () => {
        try {
            const resUserInfo = await getPersonalInfoService();
            const resCart = await getCartService();
            dispatch(
                actions.saveUserInfo({
                    id: resUserInfo?.data?.id,
                    username: resUserInfo?.data?.userName,
                    email: resUserInfo?.data?.email,
                    role: resUserInfo?.data?.role,
                    phoneNumber: resUserInfo?.data?.phoneNumber,
                    address: resUserInfo?.data?.address,
                    cartId: resCart?.data?.id,
                }),
            );
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return fetchUserData;
};

export default useFetchUserData;
