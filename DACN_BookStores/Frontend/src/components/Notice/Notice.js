import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './Notice.module.scss';
import { formatPrice } from '~/utils/commonUtils';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Notice = ({ title, fetchData, icon }) => {
    const [cartItems, setCartItems] = useState([]);

    const handleFetchData = async () => {
        const data = await fetchData();
        if (data) {
            setCartItems(data.cartItems); // Cập nhật state với dữ liệu giỏ hàng
        }
    };

    useEffect(() => {
        handleFetchData(); // Fetch cart data khi component mount
    }, []);

    return (
        <>
            <div className="dropdown">
                <button
                    onClick={handleFetchData}
                    className="btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <div className={clsx(styles['icon-wrap'])}>
                        <div>
                            <FontAwesomeIcon icon={icon} />
                        </div>
                        <span>{cartItems?.length}</span>
                        <div>{title}</div>
                    </div>
                </button>
                <div
                    className={clsx('dropdown-menu', 'dropdown-menu-end', styles['notice-menu'])}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={clsx(styles['dropdown-menu-title'])}>
                        <p>Giỏ hàng</p>
                    </div>

                    <div className={clsx(styles['dropdown-menu-body'])}>
                        <div style={{ width: '100%' }}>
                            {cartItems?.map((item, index) => {
                                return (
                                    <div className={clsx(styles['notice-menu-item'])} key={index}>
                                        <Link to={`/book/${item?.bookId}`} className={clsx('dropdown-item')} href="#">
                                            <div className={clsx(styles['item-img-wrap'])}>
                                                <img src={item.bookImage}></img>
                                            </div>

                                            <div>
                                                <div style={{ textWrap: 'wrap' }}>{item.bookName}</div>
                                                <p className={clsx(styles['notice-price'])}>
                                                    {formatPrice(item.bookPrice, 'VND')}
                                                </p>
                                                <p>x {item.quantity}</p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={clsx(styles['dropdown-menu-footer'])}>
                        <Link to={'/cart'}>
                            <p>Đi tới giỏ hàng</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notice;
