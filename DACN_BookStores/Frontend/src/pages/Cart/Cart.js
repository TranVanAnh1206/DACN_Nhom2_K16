import clsx from 'clsx';
import styles from './Cart.module.scss';
import { formatPrice, totalPayment } from '~/utils/commonUtils';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { deleteBookInCartService, getCartService, updateBookQuantityInCartService } from '~/services/cartService';
import { useDispatch, useSelector } from 'react-redux';
import { getMyVoucherService, getVoucherByIdService } from '~/services/voucherService';
import { orderService } from '~/services/orderService';
import { userInfoSelector } from '~/redux/selectors';
import bookImageDefault from '~/assets/imgs/book-default.jpg';
import { useNavigate } from 'react-router-dom';
import customToastify from '~/utils/customToastify';
import { setLoading } from '~/redux/slices/loadingSlide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faClose, faTicket, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ItemCart from './ItemCart';
import VoucherItem from './VoucherItem';
import { CartContext } from '~/hooks/CartContext';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, fetchUserCart, handleDeleteToCart } = useContext(CartContext);
    const userInfo = useSelector((state) => state.user);
    const loading = useSelector((state) => state.loading);
    const navigate = useNavigate();
    const [paying, setPaying] = useState(false);
    const [checkedBooks, setCheckedBooks] = useState([]);
    const [totalPay, setTotalPay] = useState(0);
    const [vouchers, setVouchers] = useState([]);
    const [showVoucher, setShowVoucher] = useState(false);
    const [voucherSelected, setVoucherSelected] = useState(null);
    const [voucherSelectedId, setVoucherSelectedId] = useState(0);

    const changeQuantity = async (cartId, bookId, quantity) => {
        try {
            await updateBookQuantityInCartService({ cartId, bookId, quantity });
            fetchUserCart();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheck = (bookId, quantity, name, image, price) => {
        setCheckedBooks((prev) => {
            const isChecked = prev.some((book) => book.id === bookId);

            if (isChecked) {
                return prev.filter((book) => book.id !== bookId);
            } else {
                return [...prev, { id: bookId, name, quantity, image, price }];
            }
        });
    };

    const handleCheckAll = () => {
        if (checkedBooks?.length === cart?.cartItems?.length) {
            setCheckedBooks([]);
        } else {
            setCheckedBooks(
                cart?.cartItems?.map((cart) => ({
                    id: cart.bookId,
                    name: cart.name,
                    price: cart.price,
                    image: cart.image,
                    quantity: cart.quantity,
                })),
            );
        }
    };

    // fetch vouchers list
    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const res = await getMyVoucherService();

                setVouchers(res?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchVoucher();
    }, []);

    useEffect(() => {
        const total = checkedBooks?.reduce((acc, book) => {
            const bookSelected = cart?.cartItems?.find((b) => b.bookId === book.id);

            console.log(acc, book);

            return acc + bookSelected.bookPrice * bookSelected.quantity;
        }, 0);

        setTotalPay(() =>
            voucherSelected ? totalPayment(total, { type: 'VND', value: voucherSelected?.discountAmount }) : total,
        );
    }, [checkedBooks, cart, voucherSelected]);

    // handle add voucher
    useEffect(() => {
        const fetchVoucherById = async () => {
            if (voucherSelectedId !== 0) {
                var res = await getVoucherByIdService({ id: voucherSelectedId });

                setVoucherSelected(res?.data);
            }
        };

        fetchVoucherById();
    }, [voucherSelectedId]);

    const addVoucherForOrder = (voucherId) => {
        if (checkedBooks && checkedBooks?.length > 0) {
            setVoucherSelectedId(voucherId);
            handleCloseVoucher();
        } else {
            customToastify.error('Vui lòng chọn sản phẩm trước khi thêm mã giảm giá!');
        }
    };

    const handleCancelAddVoucher = () => {
        setVoucherSelectedId(0);
        setVoucherSelected(null);
    };
    // End

    const handleShowVoucher = () => setShowVoucher(true);
    const handleCloseVoucher = () => setShowVoucher(false);

    const handlePay = async () => {
        if (!checkedBooks || checkedBooks.length <= 0) {
            customToastify.error('Vui lòng chọn sản phẩm!');
            return;
        }

        navigate('/checkout', { state: { checkedBooks, totalPay, voucherSelected } });
    };

    return (
        <div className={clsx(styles['cart-component-wrap'])}>
            <div className="container">
                <div className="pt-4">
                    <div className="pb-3">
                        <h4>Giỏ hàng ({cart?.cartItems?.length} sản phẩm)</h4>
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                            <div className={clsx(styles['header-cart-item'], 'd-flex')}>
                                <div className="checkbox-all-product ">
                                    <input
                                        checked={checkedBooks?.length === cart?.cartItems?.length}
                                        onChange={() => handleCheckAll()}
                                        className="checkbox-add-cart"
                                        type="checkbox"
                                        id="checkbox-all-products"
                                    />
                                </div>

                                <div>
                                    <span>
                                        Chọn tất cả (
                                        <span className="num-items-checkbox">{cart?.cartItems?.length}</span> sản phẩm)
                                    </span>
                                </div>
                                <div>Số lượng</div>
                                <div>Thành tiền</div>
                                <div></div>
                            </div>

                            <div className={clsx(styles['product-cart-left'])}>
                                {/* Item cart */}
                                {cart?.cartItems?.map((item, index) => {
                                    return (
                                        <ItemCart
                                            key={`item-cart-${index}`}
                                            bookId={item.bookId}
                                            name={item.bookName}
                                            image={item.bookImage}
                                            price={item.bookPrice}
                                            quantity={item.quantity}
                                            cartId={userInfo.cartId}
                                            checkedBook={checkedBooks}
                                            changeItemQuantity={changeQuantity}
                                            deleteCartItem={handleDeleteToCart}
                                            handleCheckedItem={handleCheck}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className={clsx(styles['event-promotion-wrap'])}>
                                <div className={clsx(styles['event-promotion-title'])}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>
                                            <FontAwesomeIcon icon={faTicket} /> Khuyến mãi
                                        </span>
                                        <span className={clsx(styles['choose-ticket'])} onClick={handleShowVoucher}>
                                            Xem thêm <FontAwesomeIcon icon={faChevronRight} />
                                        </span>
                                    </div>
                                </div>

                                <div className={clsx(styles['promotion-ticket-used'])}>
                                    {voucherSelected ? (
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{voucherSelected?.code}</span>
                                                <div>
                                                    <button onClick={() => handleCancelAddVoucher()} className="btn">
                                                        <FontAwesomeIcon icon={faClose} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className={clsx(styles['choosed-voucher-name'])}
                                            >{`Mã giảm ${formatPrice(voucherSelected?.discountAmount, 'VND')}`}</div>
                                            <div>{voucherSelected?.description}</div>
                                        </div>
                                    ) : (
                                        <div className={clsx(styles['no-ticket-used'])}>
                                            Chưa có mã khuyến mãi nào được áp dụng
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={clsx(styles['block-total-cart'])}>
                                <div className={clsx(styles['block-totals-cart-page'])}>
                                    <div className={clsx(styles['total-cart-page'])}>
                                        <div className={clsx(styles['title-cart-page-left'])}>Tổng tiền</div>
                                        <div className={clsx(styles['number-cart-page-right'])}>
                                            <span className="price">{formatPrice(totalPay, 'VND')}</span>
                                        </div>
                                    </div>
                                    <div className="border-product" />

                                    {voucherSelected ? (
                                        <div className={clsx(styles['total-cart-page'])}>
                                            <div className={clsx(styles['title-cart-page-left'])}>Mã giảm giá</div>
                                            <div className={clsx(styles['number-cart-page-right'])}>
                                                <span className={clsx(styles['price'])}>
                                                    - {formatPrice(voucherSelected?.discountAmount, 'VND')}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <div className={clsx(styles['total-cart-page'], styles['title-final-total'])}>
                                        <div className={clsx(styles['title-cart-page-left'])}>Thành tiền</div>
                                        <div className={clsx(styles['number-cart-page-right'])}>
                                            <span className={clsx(styles['price'])}>
                                                {formatPrice(totalPay, 'VND')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="checkout-type-button-cart" style={{ textAlign: 'center' }}>
                                    <div className={clsx(styles['method-button-cart'])}>
                                        <button
                                            type="button"
                                            title="Thanh toán"
                                            onClick={handlePay}
                                            className={clsx(
                                                styles['button'],
                                                styles['btn-proceed-checkout'],
                                                styles['btn-checkout'],
                                            )}
                                        >
                                            Thanh toán
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx(styles['voucher-wrapper'])}>
                <Modal show={showVoucher} onHide={handleCloseVoucher}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chọn mã khuyến mãi</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {vouchers?.length > 0 ? (
                            vouchers?.map((voucher) => {
                                return (
                                    <VoucherItem
                                        key={`voucher-${voucher?.id}`}
                                        voucherId={voucher?.id}
                                        name={`Giảm giá ${formatPrice(voucher?.discountAmount, 'VND')}`}
                                        desc={voucher?.description}
                                        status={voucher?.status}
                                        handleSelectVoucher={addVoucherForOrder}
                                    />
                                    // <div
                                    //     key={`voucher-${voucher?.voucherId}`}
                                    //     className={clsx(styles['voucher-item'])}
                                    //     onClick={() => handleAddVoucher(voucher)}
                                    // >
                                    //     Giảm giá {voucher?.percent}%
                                    // </div>
                                );
                            })
                        ) : (
                            <div className="text-center">Bạn không có voucher nào</div>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default Cart;
