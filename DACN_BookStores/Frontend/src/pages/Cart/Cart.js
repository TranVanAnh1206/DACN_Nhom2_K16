import clsx from 'clsx';
import styles from './Cart.module.scss';
import { formatPrice, totalPayment } from '~/utils/commonUtils';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { deleteBookInCartService, getCartService, updateBookQuantityInCartService } from '~/services/cartService';
import { useSelector } from 'react-redux';
import { getMyVoucherService } from '~/services/voucherService';
import { orderService } from '~/services/orderService';
import { userInfoSelector } from '~/redux/selectors';
import bookImageDefault from '~/assets/imgs/book-default.jpg';
import { useNavigate } from 'react-router-dom';
import customToastify from '~/utils/customToastify';

const Cart = () => {
    const userInfo = useSelector(userInfoSelector);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);

    const [cart, setCart] = useState([]);

    const fetchGetCart = async () => {
        try {
            // setLoading(true);
            const res = await getCartService();
            setCart(res?.data?.cartItems?.reverse());
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchGetCart();
    }, []);

    const changeQuantity = async (cartId, bookId, quantity) => {
        try {
            await updateBookQuantityInCartService({ cartId, bookId, quantity });
            fetchGetCart();
        } catch (error) {
            console.log(error);
        }
    };

    const [checkedBook, setCheckedBook] = useState([]);
    const [totalPay, setTotalPay] = useState(0);

    const handleCheck = (bookId) => {
        setCheckedBook((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]));
    };

    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const res = await getMyVoucherService();
                setVouchers(res?.data?.filter((v) => v?.used === false));
            } catch (error) {
                console.log(error);
            }
        };
        fetchVoucher();
    }, []);
    const [showVoucher, setShowVoucher] = useState(false);
    const [voucherSelected, setVoucherSelected] = useState(null);

    useEffect(() => {
        const total = checkedBook?.reduce((acc, bookId) => {
            const book = cart.find((b) => b.bookId === bookId);
            return acc + book.bookPrice * book.quantity;
        }, 0);
        setTotalPay(() =>
            voucherSelected ? totalPayment(total, { type: '%', value: voucherSelected?.percent }) : total,
        );
    }, [checkedBook, cart, voucherSelected]);

    const handleShowVoucher = () => setShowVoucher(true);
    const handleCloseVoucher = () => setShowVoucher(false);

    const handleAddVoucher = (voucher) => {
        setVoucherSelected(voucher);
        handleCloseVoucher();
    };

    const handleDeleteBookInCart = async (cartId, bookId) => {
        try {
            await deleteBookInCartService({ cartId, bookId });
            fetchGetCart();
        } catch (error) {
            console.log(error);
        }
    };

    const handlePay = async () => {
        setPaying(true);
        try {
            const checkedBookList = checkedBook?.map((bookId) => cart?.find((b) => b?.bookId === bookId));
            await orderService({
                userId: userInfo?.id,
                voucherId: voucherSelected ? voucherSelected?.voucherId : 0,
                orderList: checkedBookList.map((b) => ({ bookId: b?.bookId, quantity: b?.quantity })),
            });

            customToastify.success('Thanh toán thành công');
            navigate('/order');
        } catch (error) {
            console.log(error);

            customToastify.error('Thanh toán thất bại. Vui lòng thử lại!');
        } finally {
            setPaying(false);
        }
    };

    return (
        <>
            <div className={clsx(styles['overlay'])}>
                {loading ? (
                    <Loading className="mt-3" />
                ) : cart?.length > 0 ? (
                    <div className={clsx(styles['pay-wrapper'])}>
                        <div className={clsx(styles['books-wrapper'])}>
                            {cart?.map((book) => {
                                return (
                                    <div className={clsx(styles['book-wrapper'])} key={`book-${book?.bookId}`}>
                                        <div className={clsx(styles['action'])}>
                                            <input
                                                className={clsx(styles['check'])}
                                                type="checkbox"
                                                checked={checkedBook?.includes(book?.bookId)}
                                                onChange={() => handleCheck(book?.bookId)}
                                            />
                                            <button
                                                className={clsx(styles['delete'])}
                                                onClick={() => handleDeleteBookInCart(book?.cartId, book?.bookId)}
                                            >
                                                Xoá
                                            </button>
                                        </div>
                                        <div className={clsx(styles['book-info'])}>
                                            <img
                                                className={clsx(styles['book-image'])}
                                                src={book?.bookImage || bookImageDefault}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = bookImageDefault;
                                                }}
                                            />
                                            <div>
                                                <h6 className={clsx(styles['book-name'])}>{book?.bookName}</h6>
                                                <div className={clsx(styles['book-price'])}>{book?.bookPrice}</div>
                                                <div className={clsx(styles['book-quantity'])}>
                                                    <button
                                                        className={clsx(styles['book-quantity-btn'])}
                                                        disabled={book?.quantity <= 1}
                                                        onClick={() =>
                                                            changeQuantity(
                                                                book?.cartId,
                                                                book?.bookId,
                                                                book?.quantity - 1,
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        value={book?.quantity}
                                                        onChange={(e) => {
                                                            if (
                                                                !isNaN(e.target.value) &&
                                                                e.target.value > 0 &&
                                                                e.target.value <= 50
                                                            ) {
                                                                changeQuantity(
                                                                    book?.cartId,
                                                                    book?.bookId,
                                                                    e.target.value,
                                                                );
                                                            }
                                                        }}
                                                        type="number"
                                                        className={clsx(styles['book-quantity-input'])}
                                                        min={1}
                                                        max={50}
                                                    />
                                                    <button
                                                        disabled={book?.quantity >= 50}
                                                        className={clsx(styles['book-quantity-btn'])}
                                                        onClick={() =>
                                                            changeQuantity(
                                                                book?.cartId,
                                                                book?.bookId,
                                                                book?.quantity + 1,
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={clsx(styles['payment-footer'])}>
                            <div className={clsx(styles['voucher-wrapper'])}>
                                <div>Mã giảm giá:</div>
                                <div className={clsx(styles['voucher-value'])} onClick={handleShowVoucher}>
                                    {voucherSelected ? `Mã giảm giá ${voucherSelected?.percent}%` : 'Chọn mã giảm giá'}
                                </div>
                                <Modal show={showVoucher} onHide={handleCloseVoucher}>
                                    <Modal.Header className="fz-16" closeButton>
                                        <Modal.Title className={clsx(styles['fz-24'])}>Chọn voucher</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {vouchers?.length > 0 ? (
                                            vouchers?.map((voucher) => {
                                                return (
                                                    <div
                                                        key={`voucher-${voucher?.voucherId}`}
                                                        className={clsx(styles['voucher-item'])}
                                                        onClick={() => handleAddVoucher(voucher)}
                                                    >
                                                        Giảm giá {voucher?.percent}%
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="text-center fz-16">Bạn không có voucher nào</div>
                                        )}
                                    </Modal.Body>
                                </Modal>
                            </div>
                            <div className={clsx(styles['total-payment'])}>
                                Tổng tiền: {formatPrice(totalPay, 'VND')}
                            </div>
                            <button className={clsx(styles['btn-pay'])} onClick={handlePay}>
                                Thanh toán
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="fz-16 mt-3 fw-bold">Giỏ hàng của bạn đang trống</div>
                )}
            </div>
        </>
    );
};

export default Cart;
