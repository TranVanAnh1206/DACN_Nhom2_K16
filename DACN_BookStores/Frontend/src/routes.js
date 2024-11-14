import OnlyHeaderLayout from '~/layouts/OnlyHeaderLayout';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import BookDetails from '~/pages/BookDetails';
import SearchResult from '~/pages/SearchResult';

// Admin
import AdminLayout from './layouts/AdminLayout';

import AdminPage from '~/pages/AdminPage';
import Cart from '~/pages/Cart';
import Order from '~/pages/Order';
import NotFound from '~/pages/NotFound';
import Register from './pages/Register';
import NoNavbarLayout from './layouts/NoNavbarLayout';
import AccountInfor from './pages/AccountInfor/AccountInfor';
import Checkout from './pages/Checkout';
import { PaymentMoMoReturn, PaymentVnpayReturn } from './pages/PaymentReturn';

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

export const adminRoutes = [{ path: '/admin', element: AdminPage, layout: AdminLayout }];

export default routes;
