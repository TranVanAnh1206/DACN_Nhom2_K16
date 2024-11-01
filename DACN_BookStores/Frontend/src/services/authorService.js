import axios from '~/utils/axios';

export const getAllAuthorsService = () => {
    return axios.get('/Authors');
};

export const getAuthorPagingService = ({ pageNumber = 1, pageSize = 10 }) => {
    return axios.get('/Authors/paging', {
        params: { pageNumber, pageSize },
    });
};

export const createAuthorService = (data) => {
    return axios.post('/Authors', data);
};

export const updateAuthorService = (data) => {
    return axios.put(`/Authors/${data?.id}`, data);
};

export const deleteAuthorService = (id) => {
    return axios.delete(`/Authors/${id}`);
};
