import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { formatPrice } from '~/utils/commonUtils';
import styles from './Checkout.module.scss';
import { Modal } from 'react-bootstrap';
import { getMyVoucherService, getVoucherByIdService } from '~/services/voucherService';
import VoucherItem from '../Cart/VoucherItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faClose, faTicket } from '@fortawesome/free-solid-svg-icons';
import { orderService } from '~/services/orderService';
import customToastify from '~/utils/customToastify';
import { setLoading } from '~/redux/slices/loadingSlide';

const Checkout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const { checkedBooks, totalPay } = location.state;
    let { voucherSelected } = location.state;
    const [vouchers, setVouchers] = useState([]);
    const [voucher, setVoucher] = useState(voucherSelected);
    const [showVoucher, setShowVoucher] = useState(false);
    const [voucherSelectedId, setVoucherSelectedId] = useState(0);

    // handle add voucher
    useEffect(() => {
        const fetchVoucherById = async () => {
            if (voucherSelectedId !== 0) {
                var res = await getVoucherByIdService({ id: voucherSelectedId });

                setVoucher(res?.data);
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
        voucherSelected = null;
        setVoucher(null);
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

    const handleShowVoucher = () => setShowVoucher(true);
    const handleCloseVoucher = () => setShowVoucher(false);

    const handleOrder = async (e) => {
        e.preventDefault();

        dispatch(setLoading(true));
        // setPaying(true);

        try {
            await orderService({
                userId: user?.id,
                voucherId: voucher ? voucher?.voucherId : 0,
                orderList: checkedBooks.map((b) => ({ bookId: b?.id, quantity: b?.quantity })),
            });

            customToastify.success('Thanh toán thành công');
            navigate('/order');
        } catch (error) {
            console.log(error);

            customToastify.error('Thanh toán thất bại. Vui lòng thử lại!');
        } finally {
            dispatch(setLoading(false));
            // setPaying(false);
        }
    };

    return (
        <div className="section container">
            <div>
                <div className="border mb-3 p-3">
                    {checkedBooks?.map((item, index) => {
                        return (
                            <div key={`book_${item.id}`} className="mb-3 d-flex">
                                <div className="me-3">
                                    <img width={100} src={item.image} alt={item.name} />
                                </div>
                                <div>
                                    <b>{item.name}</b>
                                    <div>x{item.quantity}</div>
                                    <div>{formatPrice(item.price, 'VND')}</div>
                                </div>
                            </div>
                        );
                    })}

                    <hr></hr>

                    <div>
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
                            {voucher ? (
                                <div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>{voucher?.code}</span>
                                        <div>
                                            <button onClick={() => handleCancelAddVoucher()} className="btn">
                                                <FontAwesomeIcon icon={faClose} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={clsx(styles['choosed-voucher-name'])}>{`Mã giảm ${formatPrice(
                                        voucher?.discountAmount,
                                        'VND',
                                    )}`}</div>
                                    <div>{voucher?.description}</div>
                                </div>
                            ) : (
                                <div className={clsx(styles['no-ticket-used'])}>
                                    Chưa có mã khuyến mãi nào được áp dụng
                                </div>
                            )}
                        </div>

                        <hr />

                        {!voucher ? <></> : <div>Mã giảm giá: {formatPrice(voucher?.discountAmount, 'VND')}</div>}
                        <div>
                            Thành tiền: <b className={clsx(styles['price'])}>{formatPrice(totalPay, 'VND')}</b>
                        </div>
                    </div>
                </div>
            </div>

            <form>
                <Row>
                    <Col>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" value={user?.displayName} />
                            <label for="floatingInput">Họ tên người nhận</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input
                                type="email"
                                class="form-control"
                                placeholder="name@example.com"
                                value={user?.email}
                            />
                            <label for="floatingInput">Địa chỉ email</label>
                        </div>
                    </Col>

                    <Col>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" value={user?.phoneNumber} />
                            <label for="floatingInput">Số điện thoại liên hệ</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" value={user?.address} />
                            <label for="floatingInput">Địa chỉ nhận hàng</label>
                        </div>
                    </Col>
                </Row>

                <div>
                    <button
                        onClick={(e) => {
                            handleOrder(e);
                        }}
                        className="btn btn-primary"
                    >
                        Đặt hàng
                    </button>
                </div>
            </form>

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

export default Checkout;
