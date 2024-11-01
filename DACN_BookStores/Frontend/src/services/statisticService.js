import axios from '~/utils/axios';

export const getStatistic = ({ type = 'DAY', sortType = 'ASC' }) => {
    return axios.get('/Reports', {
        params: {
            type,
            sort_type: sortType,
        },
    });
};
