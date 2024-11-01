import { formatPrice } from '~/utils/commonUtils';
import clsx from 'clsx';
import styles from './ItemCart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faTicket, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ItemCart = ({
    bookId,
    name,
    image,
    price,
    quantity,
    cartId,
    checkedBook,
    changeItemQuantity,
    deleteCartItem,
    handleCheckedItem,
}) => {
    return (
        <>
            <div className={clsx(styles['item-product-cart'])}>
                <div className={clsx(styles['checked-product-cart'])}>
                    <input
                        checked={checkedBook?.some((book) => book.id === bookId)}
                        onChange={() => handleCheckedItem(bookId, quantity, name, image, price)}
                        type="checkbox"
                        className={clsx(styles['checkbox-add-cart'])}
                    />
                </div>
                <div className={clsx(styles['img-product-cart'])}>
                    <Link to={`/book/${bookId}`} className="product-image">
                        <img src={image} width={120} height={120} alt={name} />
                    </Link>
                </div>
                <div className={clsx(styles['group-product-info'])}>
                    <div className={clsx(styles['info-product-cart'])}>
                        <div>
                            <h2 className={clsx(styles['product-name-full-text'])}>
                                <Link to={`/book/${bookId}`}>{name}</Link>
                            </h2>
                        </div>
                        <div className="price-original">
                            <div className={clsx(styles['cart-price'])}>
                                <div>
                                    <span className={clsx(styles['price'])}>{formatPrice(price, 'VND')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles['number-product-cart'])}>
                        <div className={clsx(styles['product-view-quantity-box'])}>
                            <div className={clsx(styles['product-view-quantity-box-block'])}>
                                <button
                                    disabled={quantity <= 1}
                                    onClick={() => changeItemQuantity(cartId, bookId, quantity - 1)}
                                    className={clsx(styles['btn-subtract-qty'])}
                                >
                                    <img
                                        style={{
                                            width: 12,
                                            height: 'auto',
                                            verticalAlign: 'middle',
                                        }}
                                        src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/ico_minus2x.png"
                                    />
                                </button>
                                <input
                                    type="text"
                                    className={clsx(styles['qty-carts'])}
                                    maxLength={12}
                                    align="center"
                                    min={1}
                                    onInput={(e) => console.log(e.target.value)}
                                    max={999}
                                    value={quantity}
                                    // onClick={(e) => changeItemQuantity(cartId, bookId, e.target.value)}
                                    title="So luong"
                                />
                                <button
                                    onClick={() => changeItemQuantity(cartId, bookId, quantity + 1)}
                                    className={clsx(styles['btn-add-qty'])}
                                >
                                    <img
                                        style={{
                                            width: 12,
                                            height: 'auto',
                                            verticalAlign: 'middle',
                                        }}
                                        src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_plus2x.png"
                                    />
                                </button>
                            </div>

                            <div className="product-view-icon-remove-mobile" style={{ display: 'none' }}>
                                <a title="Remove item" className="btn-remove-mobile-cart">
                                    <i className="fa fa-trash-o" style={{ fontSize: 22 }} />
                                </a>
                            </div>
                        </div>

                        <div className={clsx(styles['cart-price-total'])}>
                            <span className="cart-price">
                                <span className={clsx(styles['price'])}>{formatPrice(price, 'VND')}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={clsx(styles['div-of-btn-remove-cart'])}>
                    <a
                        title="Remove Item"
                        onClick={() => deleteCartItem(bookId, cartId)}
                        className="btn-remove-desktop-cart"
                    >
                        <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: 15 }} />
                    </a>
                </div>
            </div>

            <div className={clsx(styles['border-product'])}></div>
        </>
    );
};

export default ItemCart;
