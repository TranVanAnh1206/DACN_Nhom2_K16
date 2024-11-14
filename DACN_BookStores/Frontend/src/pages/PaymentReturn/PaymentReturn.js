import { useEffect } from 'react';
import styles from './PaymentReturn.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import loading from '../../assets/gifs/loading_payment_return.gif';
import clsx from 'clsx';
import customToastify from '~/utils/customToastify';

const PaymentReturn = () => {
    var location = useLocation();
    var navigate = useNavigate();

    useEffect(() => {
        const handleRequestPaymentReturn = async () => {
            const params = new URLSearchParams(location.search);

            const paymentData = {
                vnp_Amount: params.get('vnp_Amount'),
                vnp_BankCode: params.get('vnp_BankCode'),
                vnp_BankTranNo: params.get('vnp_BankTranNo'),
                vnp_CardType: params.get('vnp_CardType'),
                vnp_OrderInfo: params.get('vnp_OrderInfo'),
                vnp_PayDate: params.get('vnp_PayDate'),
                vnp_ResponseCode: params.get('vnp_ResponseCode'),
                vnp_TmnCode: params.get('vnp_TmnCode'),
                vnp_TransactionNo: params.get('vnp_TransactionNo'),
                vnp_TransactionStatus: params.get('vnp_TransactionStatus'),
                vnp_TxnRef: params.get('vnp_TxnRef'),
                vnp_SecureHash: params.get('vnp_SecureHash'),
            };

            var res = await axios.get('/payments/vnpay-return', { params: paymentData });

            console.log(res);

            if (res?.data?.paymentStatus === '00') {
                customToastify.success('Thanh toán thành công!');
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

export default PaymentReturn;
