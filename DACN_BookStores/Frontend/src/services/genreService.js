import axios from '~/utils/axios';

export const getAllGenresService = () => {
    return axios.get('/BookGroups');
};

export const getGenrePagingService = ({ pageNumber = 1, pageSize = 10 }) => {
    return axios.get('/BookGroups/paging', {
        params: { pageNumber, pageSize },
    });
};

export const createGenreService = (data) => {
    return axios.post('/BookGroups', data);
};

export const updateGenreService = (data) => {
    return axios.put(`/BookGroups/${data?.id}`, data);
};

export const deleteGenreService = (id) => {
    return axios.delete(`/BookGroups/${id}`);
};
