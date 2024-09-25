import { setCartItems } from '../slices/cartSlice';

import { addToCartService, getCartService } from '~/services/cartService';

const addToCart = (credentials) => async (dispatch) => {
    try {
        var res = await addToCartService(credentials);

        if (res === 1) {
            var cart = await getCartService();

            dispatch(setCartItems(cart.data));
        }
    } catch (error) {
        console.error(error);
    }
};

const getCart = () => async (dispatch) => {
    try {
        var cart = await getCartService();

        console.log(cart);

        dispatch(setCartItems(cart.data));
    } catch (error) {
        console.error(error);
    }
};

export { addToCart, getCart };
