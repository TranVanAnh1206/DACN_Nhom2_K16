import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { addToCartService, deleteBookInCartService, getCartService } from '~/services/cartService';
import customToastify from '~/utils/customToastify';

var CartContext = createContext();

var CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        id: null,
        userId: null,
        cartItems: [],
    });

    const fetchUserCart = async () => {
        let res = await getCartService();

        if (res && res?.status === 200) {
            setCart(res?.data);
        }
    };

    const handleAddToCart = async (bookId, cartId, quantity) => {
        console.log({ cartId, bookId, quantity });

        var res = await addToCartService({ cartId, bookId, quantity });

        if (res) {
            fetchUserCart();

            customToastify.success('Thêm sách vào giỏ hàng thành công!');
        }
    };

    const handleDeleteToCart = async (bookId, cartId) => {
        try {
            await deleteBookInCartService({ cartId, bookId });
            customToastify.success('Xóa thành công');
            fetchUserCart();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, fetchUserCart, handleAddToCart, handleDeleteToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
