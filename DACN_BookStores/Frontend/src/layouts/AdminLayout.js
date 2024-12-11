import AdminHeader from '~/containers/AdminHeader';
import AdminNav from '~/containers/AdminNav';
import AdminSidebar from '~/containers/AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <div style={{backgroundColor: "#e6e6e6"}}>
            <AdminHeader />
            <AdminNav />

            <div className="container-fluid">
                <div className="d-flex gap-2">
                    <AdminSidebar />
                    <div className="w-100 my-2 mt-md-0 bg-white rounded-2 px-2 py-3 header-wrapper">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
