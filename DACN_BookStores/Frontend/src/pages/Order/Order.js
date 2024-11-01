import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cancelOrderService, getOrderService } from '~/services/orderService';
import styles from './Order.module.scss';
import { Button, Modal } from 'react-bootstrap';
import { submitReviewService } from '~/services/reviewService';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from '~/redux/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { formatDateTime, formatPrice } from '~/utils/commonUtils';
import BreadCrumb from '~/containers/BreadCrumb';
import bookImageDefault from '~/assets/imgs/book-default.jpg';
import { setLoading } from '~/redux/slices/loadingSlide';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const Order = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(userInfoSelector);
    const [orders, setOrders] = useState([]);
    const [showModalReview, setShowModalReview] = useState(false);
    const [currentBookReview, setCurrentBookReview] = useState(null);
    const [reviewRate, setReviewRate] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const [currentCancelOrder, setCurrentCancelOrder] = useState(null);
    const [showModalCancelOrder, setShowModalCancelOrder] = useState(false);

    const fetchOrder = async () => {
        dispatch(setLoading(true));

        try {
            setLoading(true);
            const res = await getOrderService();

            console.log(res);

            if (res && res?.data) {
                setOrders(res?.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const handleCloseModalReview = () => {
        setShowModalReview(false);
        setReviewContent('');
        setReviewRate(0);
        window.scrollTo(0, 0);
    };

    const handleShowModalReview = (bookInfo) => {
        setShowModalReview(true);
        setCurrentBookReview({
            orderId: bookInfo?.orderId,
            book: bookInfo?.book,
        });
    };

    const handleReview = async () => {
        try {
            currentBookReview?.book?.forEach(async (item, index) => {
                await submitReviewService({
                    date: new Date().toISOString(),
                    content: reviewContent,
                    userId: userInfo?.id,
                    rate: reviewRate,
                    bookId: item?.bookId,
                    orderId: currentBookReview?.orderId,
                });
            });

            fetchOrder();

            console.log(currentBookReview, reviewRate, reviewContent);
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModalReview();
        }
    };

    const handleCloseModalCancelOrder = () => {
        setShowModalCancelOrder(false);
    };

    const handleShowModalCancelOrder = (orderId) => {
        setCurrentCancelOrder(orderId);
        setShowModalCancelOrder(true);
    };

    const handleSubmitCancelOrder = async () => {
        dispatch(setLoading(true));

        try {
            await cancelOrderService(currentCancelOrder);
            fetchOrder();
        } catch (error) {
            console.log(error);
        } finally {
            setShowModalCancelOrder(false);
            setCurrentCancelOrder(null);
            window.scrollTo(0, 0);
            dispatch(setLoading(false));
        }
    };

    return (
        <>
            <div className={clsx(styles['overlay'])}>
                <div className={clsx('container', styles['order-wrapper'])}>
                    <BreadCrumb title="Your order" item="Order" />

                    {orders?.map((order) => {
                        const obj = {
                            0: 'Đã huỷ',
                            1: 'Đã thanh toán',
                            2: 'Chưa thanh toán',
                            3: 'Đã giao hàng',
                            4: 'Đang xử lý',
                        };

                        console.log(order);

                        return (
                            <div key={`order-${order?.id}`} className={clsx(styles['order'])}>
                                <div>
                                    <div></div>

                                    <div className={clsx(styles['order-status'])}>{obj[order?.status]}</div>
                                </div>

                                <div className={clsx(styles['order-book-info'])}>
                                    {order?.orderItems?.map((oi, index) => {
                                        return (
                                            <div key={`order-product-${index}`} className={clsx(styles['order-item'])}>
                                                <div className={clsx(styles['order-book-img'])}>
                                                    <img
                                                        src={oi?.bookImage}
                                                        alt={oi?.bookName || bookImageDefault}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = bookImageDefault;
                                                        }}
                                                    />
                                                </div>

                                                <div>
                                                    <div className={clsx(styles['order-book-name-quantity'])}>
                                                        <h5 className={clsx(styles['order-book-name'])}>
                                                            {oi?.bookName}
                                                        </h5>
                                                        <div className={clsx(styles['order-book-quantity'])}>
                                                            Số lượng: x {oi?.quantity}
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-center">
                                                        <span className="fz-16 me-2">Giá: </span>
                                                        <span className={clsx(styles['order-book-price'])}>
                                                            {formatPrice(oi?.bookPrice, 'VND')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className={clsx(styles['order-footer'])}>
                                    <div className={clsx(styles['order-date'])}>
                                        Ngày mua: {formatDateTime(order?.date)}
                                    </div>
                                    <div className="d-flex flex-column align-items-end">
                                        {order?.voucherId !== 0 ? (
                                            <div className="fz-16">
                                                Giảm giá:{' '}
                                                {formatPrice((order.totalAmount * order.voucherPercent) / 100, 'VND')}
                                                <span className="ms-4">({order?.voucherPercent}%)</span>
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        <div className={clsx(styles['order-total-amount'])}>
                                            Thành tiền: {formatPrice(order?.totalAmount, 'VND')}
                                        </div>

                                        {order?.status === 3 && (
                                            <div className={clsx(styles['order-action'])}>
                                                {!order?.orderItems[0].isReviewed && (
                                                    <button
                                                        className={clsx(styles['order-review'])}
                                                        onClick={() =>
                                                            handleShowModalReview({
                                                                orderId: order?.id,
                                                                book: order?.orderItems?.map((item, index) => {
                                                                    return {
                                                                        bookId: item.bookId,
                                                                        bookImage: item.bookImage,
                                                                        bookName: item.bookName,
                                                                    };
                                                                }),
                                                            })
                                                        }
                                                    >
                                                        Đánh giá
                                                    </button>
                                                )}

                                                <Link
                                                    to={`/book/${order?.orderItems[0].bookId}/pay?quantity=${order?.orderItems[0].quantity}`}
                                                    className={clsx(
                                                        {
                                                            ['d-block']: order?.orderItems[0].isReviewed,
                                                        },
                                                        styles['order-buy-back'],
                                                    )}
                                                >
                                                    Mua lại
                                                </Link>
                                            </div>
                                        )}
                                        {order?.status === 0 && (
                                            <div className={clsx(styles['order-action'])}>
                                                <Link
                                                    to={`/book/${order?.orderItems[0].bookId}/pay?quantity=${order?.orderItems[0].quantity}`}
                                                    className={clsx('d-block', styles['order-buy-back'])}
                                                >
                                                    Mua lại
                                                </Link>
                                            </div>
                                        )}
                                        {(order?.status === 4 || order?.status === 2) && (
                                            <div className={clsx('d-flex', styles['order-action'])}>
                                                <button
                                                    className={clsx('d-block', styles['cancel-order'])}
                                                    onClick={() => handleShowModalCancelOrder(order?.id)}
                                                >
                                                    Huỷ đơn
                                                </button>
                                                {order?.status === 2 && (
                                                    <Link
                                                        to={`/book/${order?.orderItems[0].bookId}/pay?quantity=${order?.orderItems[0].quantity}`}
                                                        className={clsx('d-block ms-3', styles['order-buy-back'])}
                                                    >
                                                        Thanh toán
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Modal className={clsx(styles['modal-review'])} show={showModalReview} onHide={handleCloseModalReview}>
                    <Modal.Header className={clsx(styles['review-header'])} closeButton>
                        <Modal.Title className={clsx(styles['review-title'])}>Đánh giá</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={clsx(styles['review-body'])}>
                        <div className="">
                            <div>
                                <p>Đánh giá đơn hàng này!</p>

                                <div>
                                    {currentBookReview?.book?.map((item, index) => {
                                        return (
                                            <div className="my-3">
                                                <img width={100} src={item.bookImage} />
                                                <b>{item.bookName}</b>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles['review-rated'])}>
                            {[...Array(reviewRate).keys()].map((i) => (
                                <FontAwesomeIcon
                                    className={clsx(styles['active'])}
                                    key={`review-rated-${i}`}
                                    icon={faStarSolid}
                                    onClick={() => setReviewRate(i + 1)}
                                />
                            ))}
                            {[...Array(5 - reviewRate).keys()].map((i) => (
                                <FontAwesomeIcon
                                    key={`review-rated-reject-${i}`}
                                    icon={faStarRegular}
                                    onClick={() => setReviewRate((prev) => prev + i + 1)}
                                />
                            ))}
                        </div>

                        <div className={clsx(styles['review-content'])}>
                            <CKEditor
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setReviewContent(data); // Lưu giá trị của editor vào state
                                }}
                                editor={ClassicEditor}
                                config={{
                                    toolbar: {
                                        items: ['undo', 'redo', '|', 'bold', 'italic'],
                                    },
                                    plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
                                    mention: {
                                        // Mention configuration
                                    },
                                }}
                                contextItemMetadata={{
                                    name: 'editor1',
                                    yourAdditionalData: 2,
                                }}
                            />
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button
                            disabled={reviewRate <= 0 || reviewContent === ''}
                            className="btn btn-primary fz-16"
                            onClick={handleReview}
                        >
                            Gửi đánh giá
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    className={clsx(styles['modal-review'])}
                    show={showModalCancelOrder}
                    onHide={handleCloseModalCancelOrder}
                >
                    <Modal.Header className={clsx(styles['review-header'])} closeButton>
                        <Modal.Title className={clsx(styles['review-title'])}>Huỷ đơn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="fz-16">Bạn có chắc chắn muốn huỷ đơn này</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="warning"
                            className="btn btn-primary fz-16"
                            onClick={handleCloseModalCancelOrder}
                        >
                            Huỷ
                        </Button>
                        <Button variant="danger" className="btn btn-primary fz-16" onClick={handleSubmitCancelOrder}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Order;
