import OnlyHeaderLayout from '~/layouts/OnlyHeaderLayout';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import BookDetails from '~/pages/BookDetails';
import SearchResult from '~/pages/SearchResult';

// Admin
import AdminLayout from './layouts/AdminLayout';

import AdminPage from '~/pages/AdminPage';
import Pay from '~/pages/Pay';
import Cart from '~/pages/Cart';
import Order from '~/pages/Order';
import NotFound from '~/pages/NotFound';

const routes = [
    { path: '/', element: Home },
    { path: '/login', element: Login, layout: null },
    { path: '/book/:id', element: BookDetails },
    { path: '/search', element: SearchResult },
    { path: '/book/:id/pay', element: Pay, layout: OnlyHeaderLayout },
    { path: '/cart', element: Cart, layout: OnlyHeaderLayout },
    { path: '/order', element: Order },
    { path: '/404', element: NotFound, layout: null },
];

export const adminRoutes = [{ path: '/admin', element: AdminPage, layout: AdminLayout }];

export default routes;
