import axios from '~/utils/axios';

const getMyVoucherService = () => {
    return axios.get('/Vouchers/all-vouchers');
};

const getVoucherByIdService = ({ id }) => {
    return axios.get(`/Vouchers/voucher/${id}`);
};

const CreateVoucherService = (data) => {
    return axios.post('/Vouchers', data);
};

const DeleteVoucherService = (id) => {
    return axios.delete(`/Vouchers/${id}`);
};

export { getMyVoucherService, getVoucherByIdService, CreateVoucherService, DeleteVoucherService };
