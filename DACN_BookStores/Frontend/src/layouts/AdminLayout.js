import AdminHeader from '~/containers/AdminHeader';

const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminHeader />
            {children}
        </div>
    );
};

export default AdminLayout;
