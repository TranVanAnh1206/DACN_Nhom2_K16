import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Book from '~/components/Book';
import { searchBookByNameOrAuthor } from '~/services/bookService';
import styles from './SearchResult.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slices/loadingSlide';
import { Col, Row } from 'react-bootstrap';
import { getAllGenresService } from '~/services/genreService';
import { getAllAuthorsService } from '~/services/authorService';

const SearchResult = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');
    const navigate = useNavigate();

    const [searchResult, setSearchResult] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [authorIdsFilter, setAuthorIdsFilter] = useState([]);
    const [authorNamesFilter, setAuthorNamesFilter] = useState([]);
    const [genreIdsFilter, setGenreIdsFilter] = useState([]);
    const [genreNamesFilter, setGenreNamesFilter] = useState([]);
    const genreCheckboxRef = useRef();

    useEffect(() => {
        queryParams.set('page', pageNumber);
        if (genreNamesFilter.length > 0) {
            queryParams.set('genres', genreNamesFilter.join(','));
        }
        if (authorNamesFilter.length > 0) {
            queryParams.set('authors', authorNamesFilter.join(','));
        }

        navigate(`${location.pathname}?${queryParams.toString()}`);

        const fetchSearchBookByNameOrAuthor = async () => {
            dispatch(setLoading(true));

            try {
                const res = await searchBookByNameOrAuthor({
                    bookGroups: genreIdsFilter,
                    authors: authorIdsFilter,
                    keyword: keyword,
                    pageNumber: pageNumber,
                    pageSize: 12,
                });
                setSearchResult(res?.data?.datas);
                setTotalCount(res?.data?.totalCount);
                setTotalPages(res?.data?.totalPage);
            } catch (error) {
                console.error(error);
                setSearchResult([]);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchSearchBookByNameOrAuthor();
    }, [keyword, pageNumber, genreIdsFilter, authorIdsFilter]);

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getAllGenresService();

            setCategories(res?.data);
        };

        const fetchAuthors = async () => {
            const res = await getAllAuthorsService();

            setAuthors(res?.data);
        };

        fetchAuthors();
        fetchCategory();
    }, []);

    useEffect(() => {
        console.log(genreCheckboxRef);

        const initialGenres = queryParams.get('genres')?.split(',') || [];
        const initGenresQuery = categories.filter((item) => initialGenres.includes(item.name));

        if (initGenresQuery.length > 0) {
            setGenreIdsFilter((prev) => [...prev, initGenresQuery.map((item) => item.id)]);
            setGenreNamesFilter((prev) => [...prev, initGenresQuery.map((item) => item.name).join('')]);
        } else {
            setGenreIdsFilter([]);
            setGenreNamesFilter([]);
        }
    }, [categories]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPageNumber(page);
        }
    };

    const handleChooseGenre = (e, genre) => {
        const checked = e.target.checked;

        if (checked) {
            setGenreIdsFilter((prev) => [...genreIdsFilter, parseInt(genre?.id)]);
            setGenreNamesFilter((prev) => [...genreNamesFilter, genre?.name]);
        } else {
            setGenreIdsFilter((prev) => prev.filter((item) => item !== parseInt(genre?.id)));
            setGenreNamesFilter((prev) => prev.filter((item) => item !== genre?.name));
        }
    };

    const handleChooseAuthor = (e, author) => {
        const checked = e.target.checked;

        if (checked) {
            setAuthorIdsFilter((prev) => [...authorIdsFilter, parseInt(author?.id)]);
            setAuthorNamesFilter((prev) => [...authorNamesFilter, author?.fullName]);
        } else {
            setAuthorIdsFilter((prev) => prev.filter((item) => item !== parseInt(author?.id)));
            setAuthorNamesFilter((prev) => prev.filter((item) => item !== author?.fullName));
        }
    };

    return (
        <div className="container section">
            <Row>
                <Col md={3}>
                    <div className={clsx(styles['left-slide-wraper'])}>
                        <div>
                            <h3>Thể loại</h3>
                            <div ref={genreCheckboxRef}>
                                {categories?.map((item, index) => {
                                    return (
                                        <div key={`categ-id-${item?.id}`}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item?.id}
                                                    id={`category-item-${item?.id}`}
                                                    onChange={(e) => handleChooseGenre(e, item)}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`category-item-${item?.id}`}
                                                >
                                                    {item?.name}
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mt-3">
                            <h3>Tác giả</h3>

                            <div>
                                {authors?.map((author, index) => {
                                    return (
                                        <div key={`author-${author?.id}`}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    id={`author-${author?.id}`}
                                                    type="checkbox"
                                                    value={author?.id}
                                                    onChange={(e) => handleChooseAuthor(e, author)}
                                                />
                                                <label className="form-check-label" htmlFor={`author-${author?.id}`}>
                                                    {author?.fullName}
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={9}>
                    <div className={clsx(styles['search-result-title-wrap'])}>
                        <b>Kết quả tìm kiếm:</b>
                        <span>{`${keyword || ''} (${totalCount} kết quả)`}</span>
                    </div>

                    <div style={{ margin: '10px' }}>
                        {genreNamesFilter?.map((name, index) => {
                            return (
                                <span key={`genre-name-${index}`} className="badge bg-badge-custom me-2">
                                    thể loại: {name}
                                </span>
                            );
                        })}

                        {authorNamesFilter?.map((name, index) => {
                            return (
                                <span key={`author-name-${index}`} className="badge bg-badge-custom me-2">
                                    tác giả: {name}
                                </span>
                            );
                        })}
                    </div>

                    <div>
                        {searchResult?.length > 0 ? (
                            <>
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

                                {totalCount === 1 ? (
                                    <></>
                                ) : (
                                    <>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <nav aria-label="Page navigation">
                                                <div className="pagination">
                                                    <div className="page-item">
                                                        <button
                                                            onClick={() => handlePageChange(pageNumber - 1)}
                                                            disabled={pageNumber === 1}
                                                            className="page-link"
                                                        >
                                                            Trang trước
                                                        </button>
                                                    </div>

                                                    {Array.from({ length: totalPages }, (_, index) => {
                                                        return (
                                                            <div
                                                                key={`page-${index + 1}`}
                                                                className={`page-item ${
                                                                    pageNumber === index + 1 ? 'active' : ''
                                                                }`}
                                                            >
                                                                <button
                                                                    onClick={() => handlePageChange(index + 1)}
                                                                    className="page-link"
                                                                >
                                                                    {index + 1}
                                                                </button>
                                                            </div>
                                                        );
                                                    })}

                                                    <div className="page-item">
                                                        <button
                                                            onClick={() => handlePageChange(pageNumber + 1)}
                                                            disabled={pageNumber === totalPages}
                                                            className="page-link"
                                                        >
                                                            Trang sau
                                                        </button>
                                                    </div>
                                                </div>
                                            </nav>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="fz-16 text-center mt-3">Không tìm thấy quyển sách nào</div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SearchResult;
