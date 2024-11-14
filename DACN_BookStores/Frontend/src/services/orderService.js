import axios from '~/utils/axios';

export const getOrderService = ({ status, sorted = 'date' } = {}) => {
    return axios.get('/Orders/orders-of-user', {
        params: {
            ...(status && { status }),
            sorted,
        },
    });
};

export const orderService = ({ userId, date, paymentMethod, status, voucherId = 0, orderItems }) => {
    return axios.post('/Orders/order', {
        userId,
        date,
        paymentMethod,
        voucherId,
        status: status,
        orderItems: orderItems,
    });
};

export const adminGetAllOrdersService = ({ pageNumber = 1, pageSize = 10, status }) => {
    return axios.get('/Orders/all-orders', { params: { pageNumber, pageSize, ...(status && { ...status }) } });
};

export const cancelOrderService = (orderId) => {
    return axios.put('/Orders/cancelled-order/' + orderId);
};

export const adminChangeStatusOfOrderService = ({ orderId, status }) => {
    return axios.put('/Orders/status-order-update/' + orderId, null, {
        params: {
            orderStatus: status,
        },
    });
};
