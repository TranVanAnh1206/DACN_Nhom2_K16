import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Book.module.scss';
import { formatPrice } from '~/utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStarHalfStroke, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import bookImageDefault from '~/assets/imgs/book-default.jpg';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartService } from '~/services/cartService';
import { setLoading } from '~/redux/slices/loadingSlide';
import customToastify from '~/utils/customToastify';
import { CartContext } from '~/hooks/CartContext';

const Book = ({ bookId, img, name, nameAuthor, price, rated = 0 }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const user = useSelector((state) => state.user);
    const { handleAddToCart } = useContext(CartContext);

    useEffect(() => {
        //
    }, []);

    return (
        <div className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['product-inner'])}>
                <div>
                    <div className={clsx(styles['image-wrap'])}>
                        <Link to={`/book/${bookId}`}>
                            <img src={img} alt={name} />
                        </Link>

                        <div className={clsx(styles['product-actions'])}>
                            <div>
                                <div className={clsx(styles['action-add-cart'])}>
                                    <span
                                        onClick={() => handleAddToCart(bookId, user?.cartId, 1)}
                                        data-bs-toggle="tooltip"
                                        title="Add to cart"
                                    >
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles['book-info-wrap'])}>
                        <Link to={`/book/${bookId}`} className={clsx(styles['product-name'])}>
                            <div className={clsx(styles['name-wrap'])}>
                                <span>{name}</span>
                            </div>
                        </Link>

                        <div className={clsx(styles['product-price'])}>
                            <span>{formatPrice(price, 'VND')}</span>
                        </div>

                        <div className={clsx(styles['product-rated'])}>
                            {[...Array(Math.floor(rated)).keys()]?.map((i) => (
                                <FontAwesomeIcon key={`number-of-rates-${i}`} icon={faStarSolid} />
                            ))}
                            {rated > Math.floor(rated) && <FontAwesomeIcon icon={faStarHalfStroke} />}
                            {[...Array(5 - Math.ceil(rated)).keys()]?.map((i) => (
                                <FontAwesomeIcon key={`number-of-rates-reject-${i}`} icon={faStarRegular} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
