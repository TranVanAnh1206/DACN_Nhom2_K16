import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './AccountAvatar.module.scss';
import Logout from '~/components/Logout';
import avatarDefault from '~/assets/imgs/avatar-default.png';
import { useSelector } from 'react-redux';

const AccountAvatar = () => {
    const userInfo = useSelector((state) => state.user);

    const generalMenu = [
        { title: 'Thông tin tài khoản', icon: '', path: '/account-infor' },
        { title: 'Đơn hàng của tôi', icon: '', path: '/order' },
        { title: 'LogOut', component: Logout, icon: '', path: '' },
    ];
    const adminMenu = [
        {
            title: 'Quản trị hệ thống',
            path: '/admin/manage-users',
            icon: '',
        },
    ];

    const menus = userInfo?.role === 'Admin' ? [...adminMenu, ...generalMenu] : generalMenu;

    useEffect(() => {
        //
    }, []);

    return (
        <>
            <div className="dropdown">
                <a className="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="m-0 me-2 ">{userInfo?.username}</p>
                        <img className={clsx('rounded-circle', styles[''])} src={avatarDefault} />
                    </div>
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                    {menus?.map((menu, index) => {
                        return (
                            <>
                                {menu.component ? (
                                    <li key={`diliver-${index}`}>
                                        <hr className="dropdown-divider" />
                                    </li>
                                ) : (
                                    <></>
                                )}
                                <li key={index}>
                                    {menu.path ? (
                                        <NavLink className="dropdown-item" to={menu.path}>
                                            {menu.component ? <menu.component /> : <>{menu.title}</>}
                                        </NavLink>
                                    ) : (
                                        <a className="dropdown-item">
                                            {menu.component ? <menu.component /> : <>{menu.title}</>}
                                        </a>
                                    )}
                                </li>
                            </>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default AccountAvatar;
