import Home from '~/pages/Home';
import Login from '~/pages/Login';
import BookDetails from '~/pages/BookDetails';
import SearchResult from '~/pages/SearchResult';

// Admin
import AdminLayout from './layouts/AdminLayout';
import Cart from '~/pages/Cart';
import Order from '~/pages/Order';
import NotFound from '~/pages/NotFound';
import Register from './pages/Register';
import NoNavbarLayout from './layouts/NoNavbarLayout';
import AccountInfor from './pages/AccountInfor/AccountInfor';
import Checkout from './pages/Checkout';
import { PaymentMoMoReturn, PaymentVnpayReturn } from './pages/PaymentReturn';
import ManageUser from './pages/AdminPage/ManageUser';
import ManageBook from './pages/AdminPage/ManageBook';
import ManageAuthor from './pages/AdminPage/ManageAuthor';
import ManageGenre from './pages/AdminPage/ManageGenre';
import ManageOrder from './pages/AdminPage/ManageOrder';
import VouchersManager from './pages/AdminPage/VouchersManager';
import Statistic from './pages/AdminPage/Statistic';
import AdminPage from './pages/AdminPage';

const routes = [
    { path: '/', element: Home },
    { path: '/login', element: Login, layout: null },
    { path: '/register', element: Register, layout: null },
    { path: '/book/:id', element: BookDetails, layout: NoNavbarLayout },
    { path: '/search', element: SearchResult },
    { path: '/cart', element: Cart, layout: NoNavbarLayout },
    { path: '/order', element: Order, layout: NoNavbarLayout },
    { path: '/404', element: NotFound, layout: null },
    { path: '/account-infor', element: AccountInfor, layout: NoNavbarLayout },
    { path: '/checkout', element: Checkout, layout: NoNavbarLayout },
    { path: '/payment-vnpay-return', element: PaymentVnpayReturn, layout: null },
    { path: '/payment-momo-return', element: PaymentMoMoReturn, layout: null },
];

export const adminRoutes = [
    { path: '/admin', element: AdminPage, layout: AdminLayout },
    { path: '/admin/manage-users', element: ManageUser, layout: AdminLayout },
    { path: '/admin/manage-books', element: ManageBook, layout: AdminLayout },
    { path: '/admin/manage-authors', element: ManageAuthor, layout: AdminLayout },
    { path: '/admin/manage-genre', element: ManageGenre, layout: AdminLayout },
    { path: '/admin/manage-orders', element: ManageOrder, layout: AdminLayout },
    { path: '/admin/manage-vouchers', element: VouchersManager, layout: AdminLayout },
    { path: '/admin/statistic', element: Statistic, layout: AdminLayout },
];

export default routes;
