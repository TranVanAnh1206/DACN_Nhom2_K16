import { useEffect } from 'react';
import styles from './PaymentReturn.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import loading from '../../assets/gifs/loading_payment_return.gif';
import clsx from 'clsx';
import customToastify from '~/utils/customToastify';

const PaymentMoMoReturn = () => {
    var location = useLocation();
    var navigate = useNavigate();

    useEffect(() => {
        const handleRequestPaymentReturn = async () => {
            const params = new URLSearchParams(location.search);

            const paymentData = {
                partnerCode: params.get('partnerCode'),
                orderId: params.get('orderId'),
                requestId: params.get('requestId'),
                amount: params.get('amount'),
                orderInfo: params.get('orderInfo'),
                transId: params.get('transId'),
                resultCode: params.get('resultCode'),
                message: params.get('message'),
                payType: params.get('payType'),
                responseTime: params.get('responseTime'),
                extraData: params.get('extraData'),
                signature: params.get('signature'),
            };

            var res = await axios.get('/payments/momo-return', { params: paymentData });

            if (res?.data?.paymentStatus === '00') {
                customToastify.success('Thanh toán thành công!');
                navigate('/order');
            } else {
                customToastify.info('Hủy thanh toán!');
                navigate('/order');
            }
        };

        handleRequestPaymentReturn();
    }, [location, navigate]);

    return (
        <div className="container section">
            <div className={clsx(styles['processing-wrapper'])}>
                <h3>Đang xử lý</h3>
                <img src={loading} alt="Loading" />
            </div>
        </div>
    );
};

export default PaymentMoMoReturn;
