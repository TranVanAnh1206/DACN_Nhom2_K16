import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './Notice.module.scss';
import { formatPrice } from '~/utils/commonUtils';
import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartContext } from '~/hooks/CartContext';

const Notice = ({ title, icon, cart }) => {
    return (
        <>
            <div className="dropdown">
                <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className={clsx(styles['icon-wrap'])}>
                        <div>
                            <FontAwesomeIcon icon={icon} />
                        </div>
                        <span>{cart?.cartItems?.length}</span>
                        <div>{title}</div>
                    </div>
                </button>
                <div className={clsx('dropdown-menu', 'dropdown-menu-end', styles['notice-menu'])}>
                    <div className={clsx(styles['dropdown-menu-title'])}>
                        <p>Giỏ hàng</p>
                    </div>

                    <div className={clsx(styles['dropdown-menu-body'])}>
                        <div onClick={(e) => e.stopPropagation()} style={{ width: '100%' }}>
                            {cart?.cartItems?.length > 0 ? (
                                cart?.cartItems?.map((item, index) => {
                                    return (
                                        <div className={clsx(styles['notice-menu-item'])} key={index}>
                                            <Link
                                                to={`/book/${item?.bookId}`}
                                                className={clsx('dropdown-item')}
                                                href="#"
                                            >
                                                <div className={clsx(styles['item-img-wrap'])}>
                                                    <img src={item.bookImage}></img>
                                                </div>

                                                <div style={{ width: '100%' }}>
                                                    <div
                                                        className={clsx(styles['name-wrap'])}
                                                        style={{ textWrap: 'wrap' }}
                                                    >
                                                        {item.bookName}
                                                    </div>
                                                    <p className={clsx(styles['notice-price'])}>
                                                        <p className="me-3">{formatPrice(item.bookPrice, 'VND')}</p>
                                                        <p style={{ color: '#333' }}>x {item.quantity}</p>
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className={clsx(styles['cart-body-empty'])}>
                                    <span>Giỏ hàng trống!</span>
                                </div>
                            )}
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
