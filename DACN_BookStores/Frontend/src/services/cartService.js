import axios from '~/utils/axios';

export const getCartService = () => {
    return axios.get('/Cart/carts');
};

export const addToCartService = ({ cartId, bookId, quantity }) => {
    return axios.post('/Cart/add-to-cart', {
        cartId,
        bookId,
        quantity,
    });
};

export const updateBookQuantityInCartService = ({ cartId, bookId, quantity }) => {
    return axios.put('/Cart/update-quantity', null, {
        params: {
            cartId,
            bookId,
            quantity,
        },
    });
};

export const deleteBookInCartService = ({ cartId, bookId }) => {
    return axios.delete(`/Cart/delete-cart-item?cartId=${cartId}&bookId=${bookId}`);
};
