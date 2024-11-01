import axios from '~/utils/axios';

export const submitReviewService = ({ date, content, userId, rate, bookId, orderId }) => {
    return axios.post('/Reviews', {
        date,
        content,
        userId,
        rate,
        bookId,
        orderId,
    });
};
