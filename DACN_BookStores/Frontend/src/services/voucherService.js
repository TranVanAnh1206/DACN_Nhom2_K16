import axios from '~/utils/axios';

export const getMyVoucherService = () => {
    return axios.get('/Vouchers/vouchers-of-user');
};
