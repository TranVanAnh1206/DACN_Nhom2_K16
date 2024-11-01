import axios from '~/utils/axios';

const getMyVoucherService = () => {
    return axios.get('/Vouchers/all-vouchers');
};

const getVoucherByIdService = ({ id }) => {
    return axios.get(`/Vouchers/voucher/${id}`);
};

export { getMyVoucherService, getVoucherByIdService };
