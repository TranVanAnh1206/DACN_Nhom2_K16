import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { getMomoLinkPaymentService, getVnpayLinkPaymentService } from '~/services/PaymentService';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const Checkout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const { checkedBooks, totalPay } = location.state;
    let { voucherSelected } = location.state;
    const [vouchers, setVouchers] = useState([]);
    const [voucher, setVoucher] = useState(voucherSelected);
    const [showVoucher, setShowVoucher] = useState(false);
    const [voucherSelectedId, setVoucherSelectedId] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [isChecout, setIsCheckout] = useState(false);
    const [notificationsConnection, setNotificationsConnection] = useState(null);

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
            let orderStatus = 4;
            if (paymentMethod === 'COD') {
                orderStatus = 4;
            } else if (paymentMethod === 'MOMO') {
                orderStatus = 2;
            } else if (paymentMethod === 'VNPAY') {
                orderStatus = 2;
            }

            const resOrder = await orderService({
                userId: user?.id,
                date: new Date().toISOString(),
                paymentMethod: paymentMethod,
                voucherId: voucher ? voucher?.id : 0,
                status: orderStatus,
                orderItems: checkedBooks.map((b) => ({ bookId: b?.id, quantity: b?.quantity })),
            });

            if (paymentMethod == 'MOMO' && resOrder && resOrder.data?.statusCode === 200) {
                var resMoMo = await getMomoLinkPaymentService({
                    amount: resOrder.data?.totalAmount,
                    orderId: resOrder.data?.orderId,
                    orderInfo: `Thanh toán ${resOrder.data?.totalAmount} cho đơn hàng ${resOrder.data?.orderId}`,
                });

                if (resMoMo.status === 200) {
                    window.location.href = resMoMo.data?.payUrl;
                }
            } else if (paymentMethod == 'VNPAY' && resOrder && resOrder.data?.statusCode === 200) {
                var resVnpay = await getVnpayLinkPaymentService({
                    amount: resOrder.data?.totalAmount,
                    orderId: resOrder.data?.orderId,
                    orderInfo: `Thanh toán ${resOrder.data?.totalAmount} cho đơn hàng ${resOrder.data?.orderId}`,
                });

                if (resVnpay.status === 200) {
                    window.location.href = resVnpay.data?.payUrl;
                }
            } else {
                customToastify.success('Đặt hàng thành công');
                navigate('/order');
            }

            // setIsCheckout(true);
        } catch (error) {
            console.log(error);
            // setIsCheckout(false);

            customToastify.error('Đặt hàng thất bại. Vui lòng thử lại!');
        } finally {
            dispatch(setLoading(false));
            // setPaying(false);
        }
    };

    useEffect(() => {
        let connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7193/notificationHub')
            .withAutomaticReconnect()
            .build();

        connection
            .start()
            .then(() => {
                console.log('connection to hubs');

                customToastify.info('Checkouted');
            })
            .catch((err) => console.error('Connection error: ', err));

        connection.on('OnConnected', () => {
            OnConnected();
        });

        setNotificationsConnection(connection);

        const OnConnected = () => {
            var username = user?.username;

            console.log(username);

            if (username) {
                // connection.invoke('SaveUserConnection', username).catch(function (err) {
                //     return console.error(err.toString());
                // });
            }
        };

        if (connection) {
            connection.on('ReceivedNotification', function (msg) {
                console.log(msg);
                customToastify.info(msg);
                // DisplayGeneralNotification(msg, 'General message.');
            });
        }

        // return () => {
        //     if (connection) connection.stop();
        // };
    }, [user]);

    const handleSendMessage = () => {
        // Gửi thông báo đến admin sau khi đặt hàng thành công
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
                <div>
                    <h4>Thông tin người nhận</h4>
                </div>

                <Row>
                    <Col>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={user?.displayName} />
                            <label htmlFor="floatingInput">Họ tên người nhận</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={user?.email}
                            />
                            <label htmlFor="floatingInput">Địa chỉ email</label>
                        </div>
                    </Col>

                    <Col>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={user?.phoneNumber} />
                            <label htmlFor="floatingInput">Số điện thoại liên hệ</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={user?.address} />
                            <label htmlFor="floatingInput">Địa chỉ nhận hàng</label>
                        </div>
                    </Col>
                </Row>

                <div className="mb-3">
                    <div>
                        <h4>Phương thức thanh toán</h4>
                    </div>

                    <div>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Thanh toán khi nhận hàng"
                                    onChange={() => setPaymentMethod('COD')}
                                />
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label={
                                        <>
                                            <img
                                                width={40}
                                                style={{ marginRight: '16px' }}
                                                src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png"
                                            />
                                            Thanh toán bằng MOMO
                                        </>
                                    }
                                    onChange={() => setPaymentMethod('MOMO')}
                                />
                                <FormControlLabel
                                    value="other"
                                    control={<Radio />}
                                    label={
                                        <>
                                            <img
                                                width={60}
                                                style={{ marginRight: '16px' }}
                                                src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png"
                                            />
                                            Thanh toán bằng VNPAY
                                        </>
                                    }
                                    onChange={() => setPaymentMethod('VNPAY')}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>

                <div>
                    <button
                        onClick={(e) => {
                            handleOrder(e);
                        }}
                        className="btn btn-primary"
                    >
                        Đặt hàng
                    </button>

                    {/* <button type="button" onClick={() => handleSendMessage()}>
                        Check signalr
                    </button> */}
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
