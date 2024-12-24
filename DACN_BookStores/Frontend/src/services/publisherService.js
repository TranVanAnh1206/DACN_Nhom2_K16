import axios from '~/utils/axios';

export const getAllPublisherService = () => {
    return axios.get('/Publishers');
};
