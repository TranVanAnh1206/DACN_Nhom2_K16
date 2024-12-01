import { useSelector } from 'react-redux';
import './AdminSidebar.css';
import { NavLink } from 'react-router-dom';
import avatarDefault from '~/assets/imgs/avatar-default.png';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BookIcon from '@mui/icons-material/Book';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const AdminSidebar = () => {
    const userInfo = useSelector((state) => state.user);
  return (
        <div id="side-bar" className="d-none d-lg-block mb-2">
            <div className="wrapper h-100">
                <div className="side-bar-top d-flex align-items-center py-2 gap-3 border-2 border-bottom border-secondary-subtle">
                    <div>
                        <img className="my-img" src={avatarDefault} alt="true" />
                    </div>
                    <div>
                        <div className="fw-bold" style={{ lineHeight: '1.3' }}>
                            {userInfo?.username}
                        </div>
                        <p className="m-0 fs-12">Quản trị hệ thống</p>
                    </div>
                </div>
                <ul className="side-bar-bottom list-unstyled">
                    <li>
                        <NavLink
                            className="side-bar-item fw-bold text-decoration-none d-inline-block"
                            to={'/admin/manage-users'}
                        >
                            <AccountBoxIcon /> Quản lý người dùng
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="side-bar-item fw-bold text-decoration-none d-inline-block"
                            to={'/admin/manage-books'}
                        >
                            <BookIcon /> Quản lý sách
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={`side-bar-item fw-bold text-decoration-none d-inline-block `}
                            to="/admin/manage-authors"
                        >
                            <AdminPanelSettingsIcon /> Quản lý tác giả
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="side-bar-item fw-bold text-decoration-none d-inline-block"
                            to={'/admin/manage-genre'}
                        >
                            <CalendarViewMonthIcon /> Quản lý thể loại
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="side-bar-item fw-bold text-decoration-none d-inline-block"
                            to={'/admin/manage-orders'}
                        >
                            <ShoppingCartCheckoutIcon /> Quản lý đơn hàng
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="side-bar-item fw-bold text-decoration-none d-inline-block"
                            to={'/admin/manage-vouchers'}
                        >
                            <CardGiftcardIcon /> Quản lý giảm giá
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="side-bar-item fw-bold text-decoration-none d-inline-block"
                            to={'/admin/statistic'}
                        >
                            <StackedLineChartIcon /> Thống kê
                        </NavLink>
                    </li>
                    <li>
                        <span className="delete-acc d-inline-block fw-bold text-decoration-none text-danger">
                            <HighlightOffIcon /> Delete Account
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;
