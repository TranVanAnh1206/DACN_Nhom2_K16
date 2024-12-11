import { useState } from 'react';
import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './AdminNav.css';

const AdminNav = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Navbar id="nav-account" expand="false" className="mb-2">
            <Container fluid>
                <div
                    className="title"
                    // onClick={() => navigate(`/customer/${customer_id}/profiles`)}
                >
                    <AccountBalanceIcon /> Trang quản trị
                </div>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" onClick={handleShow} />
                <Navbar.Offcanvas
                    show={show}
                    onHide={handleClose}
                    id="offcanvasNavbar-expand-false"
                    aria-labelledby="offcanvasNavbarLabel-expand-false"
                    placement="start"
                >
                    <Offcanvas.Header closeButton className="border-2 border-bottom border-primary-subtle">
                        <Offcanvas.Title
                            style={{ color: '#5497fe' }}
                            id="offcanvasNavbarLabel-expand-false"
                            className="fw-bold"
                        >
                            Nhà sách Trí Tuệ
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <NavLink
                                to={'/admin/manage-users'}
                                className="nav-item-account text-decoration-none"
                                onClick={handleClose} // Đóng offcanvas khi click
                            >
                                Quản lý người dùng
                            </NavLink>
                            <NavLink
                                to={'/admin/manage-books'}
                                // to={`/customer/${customer_id}/profiles`}
                                className="nav-item-account text-decoration-none"
                                onClick={handleClose} // Đóng offcanvas khi click
                            >
                                Quản lý sách
                            </NavLink>
                            <NavLink
                                to="/admin/manage-authors"
                                // to={`/customer/${customer_id}/message`}
                                className="nav-item-account text-decoration-none"
                                onClick={handleClose} // Đóng offcanvas khi click
                            >
                                Quản lý tác giả
                            </NavLink>
                            <NavLink
                                to={'/admin/manage-genre'}
                                // to={`/customer/${customer_id}/purchase_order`}
                                className="nav-item-account text-decoration-none"
                                onClick={handleClose} // Đóng offcanvas khi click
                            >
                                Quản lý thể loại
                            </NavLink>
                            <NavLink
                                to={'/admin/manage-orders'}
                                // to={`/customer/${customer_id}/change_password`}
                                className="nav-item-account text-decoration-none"
                                onClick={handleClose} // Đóng offcanvas khi click
                            >
                                Quản lý đơn hàng
                            </NavLink>
                            <NavLink
                                to={'/admin/manage-vouchers'}
                                // to={`/customer/${customer_id}/change_password`}
                                className="nav-item-account text-decoration-none"
                                onClick={handleClose} // Đóng offcanvas khi click
                            >
                                Quản lý phiếu giảm giá
                            </NavLink>
                            <NavLink
                                to={'/admin/statistic'}
                                // to={`/customer/${customer_id}/change_password`}
                                className="nav-item-account text-decoration-none"
                                onClick={handleClose} // Đóng offcanvas khi click
                            >
                                Thống kê
                            </NavLink>
                            <span className="delete-acc text-danger">Delete Account</span>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default AdminNav;
