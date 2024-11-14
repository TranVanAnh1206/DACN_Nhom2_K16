import axios from '~/utils/axios';

export const getBookPagingService = ({ pageNumber = 1, pageSize = 10, sortBy, genres = [], filter }) => {
    const s = genres.reduce((acc, genre, index) => {
        if (index !== genres.length - 1) {
            return `${acc}BookGroupIds=${genre}&`;
        }
        return `${acc}BookGroupIds=${genre}`;
    }, '');
    return axios.get(`/Books/searching?${s}`, {
        params: {
            pageNumber,
            pageSize,
            sorting: sortBy,
            filter,
        },
    });
};

export const getBookRelatedService = ({ authorId = [], groupId }) => {
    var authorIdStr = authorId.reduce((prev, id, index) => {
        return `${prev}authorId=${id}`;
    });

    return axios.get(`Books/book-related?${authorIdStr}`, {
        params: {
            groupId,
        },
    });
};

export const getBookByIdService = (id) => {
    return axios.get(`/Books/${id}`);
};

export const searchBookByNameOrAuthor = ({ bookGroups = [], authors = [], keyword, pageNumber = 1, pageSize = 10 }) => {
    const params = {
        filter: keyword,
        pageNumber: pageNumber,
        pageSize: pageSize,
    };

    const genreQuery = bookGroups.map((bgId) => `BookGroupIds=${bgId}`).join('&');
    const authorQuery = authors.map((authorId) => `AuthorIds=${authorId}`).join('&');
    const additionalQuery = [genreQuery, authorQuery].filter(Boolean).join('&');
    const url = additionalQuery ? `/Books/searching?${additionalQuery}` : '/Books/searching';

    // if (bookGroups.length > 0) {
    //     const bg = bookGroups.reduce((acc, bgId, index) => {
    //         if (index !== bookGroups.length - 1) {
    //             return `${acc}BookGroupIds=${bgId}&`;
    //         }

    //         return `${acc}BookGroupIds=${bgId}`;
    //     }, '');

    //     return axios.get(`/Books/searching?${bg}`, {
    //         params: params,
    //     });
    // }

    return axios.get(url, {
        params: params,
    });
};

export const createBookService = (data) => {
    return axios.post('/Books', data);
};

export const updateBookService = (data) => {
    return axios.put(`/Books/${data?.id}`, data);
};

export const deleteBookService = (id) => {
    return axios.delete(`/Books/${id}`);
};
