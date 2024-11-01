import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Book from '~/components/Book';
import { searchBookByNameOrAuthor } from '~/services/bookService';
import styles from './SearchResult.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slices/loadingSlide';
import { Col, Row } from 'react-bootstrap';

const SearchResult = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');

    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const fetchSearchBookByNameOrAuthor = async () => {
            dispatch(setLoading(true));

            try {
                const res = await searchBookByNameOrAuthor(keyword);
                console.log(res);
                setSearchResult(res?.data?.datas);
            } catch (error) {
                console.log(error);
                setSearchResult([]);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchSearchBookByNameOrAuthor();
    }, [keyword]);

    return (
        <div className="container section">
            <Row>
                <Col md={3}>
                    <h3>Thể loại</h3>
                </Col>
                <Col md={9}>
                    {searchResult?.length > 0 ? (
                        <div className={clsx('d-flex flex-wrap', styles['search-result-wrapper'])}>
                            {searchResult?.map((book) => {
                                return (
                                    <div key={`book-${book?.id}`} className={clsx(styles['book-wrapper'])}>
                                        <Book
                                            bookId={book?.id}
                                            img={book?.image}
                                            name={book?.title}
                                            nameAuthor={book?.author?.map((a) => a.fullName).join(', ')}
                                            price={book?.price}
                                            rated={book?.rate}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="fz-16 text-center mt-3">Không tìm thấy quyển sách nào</div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default SearchResult;
