import axios from '~/utils/axios';

export const loginService = ({ username, password }) => {
    return axios.post('/Login/login', {
        userName: username,
        password: password,
    });
};

export const signUpService = ({ username, email, password, address, phoneNumber }) => {
    return axios.post('/Login/register', { username, email, password, address, phoneNumber });
};

export const getPersonalInfoService = () => {
    return axios.get('/User/user-info');
};

export const getAllUsersService = ({ pageNumber = 1, pageSize = 10, filter = '' }) => {
    return axios.get('/User/all-user', {
        params: {
            pageNumber,
            pageSize,
            filter,
        },
    });
};

export const userCreateByAdminService = (data) => {
    return axios.post('/User', data);
};

export const ChangeUserInforService = (data) => {
    return axios.post('/User/change-user-infor', data);
};

export const ChangePasswordService = (oldPass, newPass, confirmPass) => {
    return axios.post(`/User/change-password?oldPass=${oldPass}&newPass=${newPass}&confirmPass=${confirmPass}`);
};
