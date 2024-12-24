import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BookIcon from '@mui/icons-material/Book';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const adminNavigations = [
    // {
    //     name: 'Dashboard',
    //     path: '/admin/dashboard',
    //     icon: '',
    // },
    {
        name: 'Người dùng',
        path: '/admin/manage-users',
        icon: <AccountBoxIcon />,
    },
    {
        name: 'Quản lý sách',
        path: '/admin/manage-books',
        icon: <BookIcon />,
    },
    {
        name: 'Quản lý tác giả',
        path: '/admin/manage-authors',
        icon: <AdminPanelSettingsIcon />,
    },
    {
        name: 'Quản lý thể loại',
        path: '/admin/manage-genre',
        icon: <CalendarViewMonthIcon />,
    },
    // {
    //     name: 'Publishers',
    //     path: '/admin/publisher',
    //     icon: '',
    // },
    {
        name: 'Quản lý đơn đặt hàng',
        path: '/admin/manage-orders',
        icon: <ShoppingCartCheckoutIcon />,
    },
    {
        name: 'Báo cáo',
        path: '/admin/statistic',
        icon: <StackedLineChartIcon />,
    },
    {
        name: 'Quản lý mã giảm giá',
        path: '/admin/manage-vouchers',
        icon: <CardGiftcardIcon />,
    },
];

const clientNavigations = [
    {
        name: 'Trang chủ',
        path: '/',
    },
    {
        name: 'Liên hệ',
        path: '/contact',
    },
    {
        name: 'Blog',
        path: 'blog',
    },
    {
        name: 'Về chúng tôi',
        path: '/aboutus',
    },
];

export { adminNavigations, clientNavigations };
