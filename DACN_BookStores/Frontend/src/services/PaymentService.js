import axios from '~/utils/axios';

export const getMomoLinkPaymentService = ({ amount, orderId, orderInfo }) => {
    return axios.post('/Payments/momo-payment', {
        amount,
        orderId,
        orderInfo,
    });
};

export const getVnpayLinkPaymentService = ({ amount, orderId, orderInfo }) => {
    return axios.post('/Payments/vnpay-payment', {
        amount,
        orderId,
        orderInfo,
    });
};
