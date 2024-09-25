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
import { useEffect, useRef, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import { searchBookByNameOrAuthor } from '~/services/bookService';
import { formatPrice } from '~/utils/commonUtils';
import { getMyVoucherService } from '~/services/voucherService';
import bookImageDefault from '~/assets/imgs/book-default.jpg';
import { Notice } from '~/components/Notice';
import { getCartService } from '~/services/cartService';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '~/redux/actions/cartAction';

const Header = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    const [cart, setCart] = useState({
        cartItems: [],
        id: '',
        userId: '',
    });
    const location = useLocation();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const searchKey = useDebounce(keyword, 300);

    const [loading, setLoading] = useState(false);

    const searchResultRef = useRef(null);

    const [searchResult, setSearchResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const handleShowSearchResult = () => setShowSearchResult(true);
    const handleCloseSearchResult = () => setShowSearchResult(false);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    useEffect(() => {
        setKeyword('');
        handleCloseSearchResult();
    }, [location]);

    useEffect(() => {
        const fetchSearchBookByNameOrAuthor = async () => {
            try {
                if (searchKey !== '') {
                    const res = await searchBookByNameOrAuthor(searchKey);
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
        fetchSearchBookByNameOrAuthor();
    }, [searchKey]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?keyword=${keyword}`);
        }
    };

    const fetchCartData = async () => {
        try {
            var res = await getCartService();

            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={clsx(styles['header'], 'container')}>
            <Link to="/">
                <img width={50} height={50} src={logo} alt="VEdu" />
            </Link>

            <div className={clsx(styles['search-wrapper'])}>
                <div className={clsx(styles['search-input'])}>
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={handleShowSearchResult}
                        onKeyDown={handleSearch}
                        placeholder="Tìm tên sách/tên tác giả"
                    />
                    <button className={clsx(styles['search-button'])}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

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
                <Notice title={'Giỏ hàng'} fetchData={fetchCartData} icon={faBagShopping} />

                <AccountAvatar className={clsx(styles['user-action'])} />
            </div>
        </div>
    );
};

export default Header;
