import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBagShopping,
    faCartShopping,
    faMagnifyingGlass,
    faReceipt,
    faTicket,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './Header.module.scss';
import logo from '~/assets/imgs/VEdu.png';
import AccountAvatar from '~/components/AccountAvatar';
import { useContext, useEffect, useRef, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import { searchBookByNameOrAuthor } from '~/services/bookService';
import { formatPrice } from '~/utils/commonUtils';
import bookImageDefault from '~/assets/imgs/book-default.jpg';
import { Notice } from '~/components/Notice';
import { useDispatch, useSelector } from 'react-redux';
import { CartContext } from '~/hooks/CartContext';

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { cart, fetchUserCart } = useContext(CartContext);
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const searchKey = useDebounce(keyword, 300);
    const searchResultRef = useRef(null);
    const [searchResult, setSearchResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);

    const handleShowSearchResult = () => setShowSearchResult(true);
    const handleCloseSearchResult = () => setShowSearchResult(false);

    useEffect(() => {
        const initialKeyword = queryParams.get('keyword') || '';
        setKeyword(initialKeyword);
        handleCloseSearchResult();
    }, [location.search]);

    useEffect(() => {
        fetchUserCart();
        setShowSearchResult(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchResultRef.current && !searchResultRef.current.contains(e.target)) {
                handleCloseSearchResult();
            }
        };

        // Gắn sự kiện khi component mount
        document.addEventListener('mousedown', handleClickOutside);

        // Xóa sự kiện khi component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchResultRef]);

    const fetchSearchBookByNameOrAuthor = async () => {
        try {
            if (keyword !== '') {
                const res = await searchBookByNameOrAuthor({ keyword: keyword, pageNumber: 1, pageSize: 12 });
                setSearchResult(res?.data?.datas);
                handleShowSearchResult();
            } else {
                setSearchResult([]);
            }
        } catch (error) {
            setSearchResult([]);
            console.log(error);
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?keyword=${keyword}`);
        }
    };

    return (
        <div className={clsx(styles['header'])}>
            <div className={clsx(styles['header-content'], 'container')}>
                <Link to="/">
                    <img width={50} height={50} src={logo} alt="VEdu" />
                </Link>

                <div className={clsx(styles['search-wrapper'])}>
                    <form autoComplete="off" className={clsx(styles['search-input'])}>
                        <input
                            type="search"
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value);
                            }}
                            onInput={fetchSearchBookByNameOrAuthor}
                            onKeyDown={handleSearch}
                            placeholder="Tìm tên sách/tên tác giả"
                        />
                        <button type="button" className={clsx(styles['search-button'])}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>

                    {/* Hiển thị các kết quả tìm kiếm phù hợp */}
                    {showSearchResult && (
                        <div ref={searchResultRef}>
                            {searchResult?.length > 0 ? (
                                <div className={clsx(styles['search-result-wrapper'])}>
                                    <div className={clsx(styles['search-result'])}>
                                        {searchResult.map((book) => {
                                            return (
                                                <Link
                                                    to={`/book/${book?.id}`}
                                                    key={`book-${book?.id}`}
                                                    className={clsx(styles['result-item'])}
                                                >
                                                    <img
                                                        src={book?.image || bookImageDefault}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = bookImageDefault;
                                                        }}
                                                    />
                                                    <div className={clsx(styles['result-item-info'])}>
                                                        <h6 className={clsx(styles['result-item-header'])}>
                                                            {book?.title}
                                                        </h6>
                                                        <div className={clsx(styles['result-item-name'])}>
                                                            {book?.title}
                                                        </div>
                                                        <div className={clsx(styles['result-item-expand'])}>
                                                            <div className={clsx(styles['search-result-item-authors'])}>
                                                                {book?.author
                                                                    ?.map((a) => {
                                                                        return a?.fullName;
                                                                    })
                                                                    .join(', ')}
                                                            </div>
                                                            <div className={clsx(styles['search-result-item-price'])}>
                                                                {formatPrice(book?.price, 'VND')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    <Link to={`/search?keyword=${keyword}`} className={clsx(styles['see-all-result'])}>
                                        Xem tất cả
                                    </Link>
                                </div>
                            ) : (
                                searchKey !== '' && (
                                    <div className={clsx(styles['search-result-empty'])}>Không có kết quả</div>
                                )
                            )}
                        </div>
                    )}
                </div>

                <div className={clsx(styles['user-actions'])}>
                    <Notice title={'Giỏ hàng'} icon={faBagShopping} cart={cart} />

                    <AccountAvatar className={clsx(styles['user-action'])} />
                </div>
            </div>
        </div>
    );
};

export default Header;
