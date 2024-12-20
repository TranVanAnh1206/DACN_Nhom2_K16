import { Button, Col, Modal, Pagination, Form, Row } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { getAllUsersService, userCreateByAdminService } from '~/services/userServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import './StyleManage.css';
// import './StyleManage.css';

const ManageUser = ({ setSpinning }) => {
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);

    const headersExportUser = [
        { label: 'Username', key: 'username' },
        { label: 'Email', key: 'email' },
        { label: 'Address', key: 'address' },
        { label: 'Phone number', key: 'phoneNumber' },
    ];

    const [userList, setUserList] = useState([]);

    const [currentPageUser, setCurrentPageUser] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 10;
    const [searchUserKeyword, setSearchUserKeyword] = useState('');

    const fetchGetAllUsers = async () => {
        try {
            setLoading(true);
            const res = await getAllUsersService({
                pageNumber: currentPageUser,
                pageSize: pageSize,
                filter: searchUserKeyword,
            });
            setTotalPage(res?.data?.totalPage || 0);
            setUserList(
                res?.data?.datas?.map((user) => {
                    return {
                        id: user?.userName,
                        username: user?.userName,
                        email: user?.email,
                        address: user?.address,
                        phoneNumber: user?.phoneNumber,
                    };
                }),
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGetAllUsers();
    }, [currentPageUser]);

    const handleChangePage = (i) => {
        setCurrentPageUser(i);
    };

    const [createUserInfo, setCreateUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
        role: 'User',
        phoneNumber: '',
    });
    const [showModalAddUser, setShowModalAddUser] = useState(false);
    const handleCloseModalAddUser = () => setShowModalAddUser(false);
    const handleShowModalAddUser = () => setShowModalAddUser(true);

    const createUserFormRef = useRef(null);
    const usernameSignupRef = useRef(null);

    const [showPasswordCreateUser, setShowPasswordCreateUser] = useState(false);
    const [validatedFormCreateUser, setValidatedFormCreateUser] = useState(false);
    const [errorCreateUser, setErrorCreateUser] = useState({
        field: '',
        message: '',
    });

    const toggleShowPasswordCreateUser = () => {
        setShowPasswordCreateUser(!showPasswordCreateUser);
    };

    const handleChangeFormCreateUser = (e) => {
        const { name, value } = e.target;
        setCreateUserInfo({
            ...createUserInfo,
            [name]: value,
        });
    };

    const handleSubmitFormCreateUser = async (e) => {
        try {
            const form = createUserFormRef.current;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
                setValidatedFormCreateUser(true);
            } else {
                setSpinning(true);

                await userCreateByAdminService({
                    userName: createUserInfo.username,
                    email: createUserInfo.email,
                    password: createUserInfo.password,
                    role: createUserInfo.role,
                    address: createUserInfo.address,
                    phoneNumber: createUserInfo.phoneNumber,
                });

                setCreateUserInfo({
                    username: '',
                    email: '',
                    password: '',
                    role: 'User',
                    address: '',
                    phoneNumber: '',
                });

                setValidatedFormCreateUser(false);
                setShowModalAddUser(false);
            }
        } catch (error) {
            if (Number(error.status) === 400) {
                setValidatedFormCreateUser(true);
                setErrorCreateUser({
                    field: error?.data?.message?.property,
                    message: error?.data?.message?.message,
                });
            }
        } finally {
            setSpinning(false);
        }
    };

    const handleEnterToSignup = (e) => {
        if (e.key === 'Enter') {
            handleSubmitFormCreateUser(e);
        }
    };

    const handleSearchUser = () => {
        fetchGetAllUsers();
    };

    return (
        <div id="manage-users">
            <div className="d-flex justify-content-between flex-wrap mb-2 gap-2">
                <div className="d-flex align-items-center search-user-input flex-wrap mb-2 gap-2">
                    <div>
                        <input
                            value={searchUserKeyword}
                            className="fz-16 form-control"
                            placeholder="Tìm kiếm theo email/số điện thoại"
                            onChange={(e) => setSearchUserKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearchUser();
                                }
                            }}
                        />
                    </div>
                    <Button
                        variant="primary"
                        className="fz-16"
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={handleSearchUser}
                    >
                        Tìm kiếm
                    </Button>
                </div>
                <div>
                    <button className="btn btn-primary fz-16 me-4" onClick={handleShowModalAddUser}>
                        Tạo mới
                    </button>
                    <CSVLink data={userList} headers={headersExportUser} filename="Users-Sale-Book.csv" separator=";">
                        <button className="btn btn-success fz-16">Xuất file excel</button>
                    </CSVLink>
                </div>
            </div>
            <div className="table-container table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className='text-center text-nowrap'>Họ và tên</th>
                            <th className='text-center text-nowrap'>Email</th>
                            <th className='text-center text-nowrap'>Địa chỉ</th>
                            <th className='text-center text-nowrap'>Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList?.length > 0 ? (
                            userList?.map((user) => {
                                return (
                                    <tr key={`user-${user?.id}`}>
                                        <td>{user?.username}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.address}</td>
                                        <td className='text-center'>{user?.phoneNumber}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5}>
                                    <div className="fz-16 text-center">Không có người dùng nào</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination className="d-flex justify-content-center my-2">
                {Array.from({ length: totalPage }, (_, i) => (i = i + 1))?.map((i) => {
                    return (
                        <Pagination.Item
                            key={i}
                            className="page-number"
                            active={i === currentPageUser}
                            onClick={() => handleChangePage(i)}
                        >
                            {i}
                        </Pagination.Item>
                    );
                })}
            </Pagination>
            <Modal show={showModalAddUser} onHide={handleCloseModalAddUser}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="modal-sign-up-title">Tạo mới</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={createUserFormRef} noValidate validated={validatedFormCreateUser}>
                        <Form.Group className="mb-3" as={Col} md="12">
                            <Form.Control
                                ref={usernameSignupRef}
                                value={createUserInfo.username}
                                name="username"
                                className={`fz-16 ${errorCreateUser.field === 'UserName' && 'invalid'}`}
                                placeholder="Tài khoản"
                                required
                                onKeyUp={handleEnterToSignup}
                                isInvalid={errorCreateUser.field === 'UserName'}
                                onChange={handleChangeFormCreateUser}
                            />
                            {errorCreateUser.field === 'UserName' && (
                                <Form.Control.Feedback className="fz-16" type="invalid">
                                    {errorCreateUser.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md="12">
                            <Form.Control
                                value={createUserInfo.email}
                                name="email"
                                type="email"
                                className={`fz-16 ${errorCreateUser.field === 'Email' && 'invalid'}`}
                                placeholder="Email"
                                required
                                onKeyUp={handleEnterToSignup}
                                onChange={handleChangeFormCreateUser}
                            />
                            {errorCreateUser.field === 'Email' && (
                                <Form.Control.Feedback className="fz-16" type="invalid">
                                    {errorCreateUser.message}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3 position-relative" as={Col} md="12">
                            <Form.Control
                                value={createUserInfo.password}
                                name="password"
                                type={showPasswordCreateUser ? 'text' : 'password'}
                                className="fz-16"
                                minLength={6}
                                placeholder="Mật khẩu"
                                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}"
                                required
                                onKeyUp={handleEnterToSignup}
                                onChange={handleChangeFormCreateUser}
                            />
                            <Form.Control.Feedback className="fz-16" type="invalid">
                                Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.
                            </Form.Control.Feedback>
                            {showPasswordCreateUser ? (
                                <FontAwesomeIcon
                                    className="show-hide-password"
                                    icon={faEye}
                                    onClick={toggleShowPasswordCreateUser}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className="show-hide-password"
                                    icon={faEyeSlash}
                                    onClick={toggleShowPasswordCreateUser}
                                />
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" as={Row} md="12">
                            <Form.Label column sm="2">
                                Vai trò
                            </Form.Label>
                            <Col sm="10">
                                <Form.Select
                                    value={createUserInfo.role}
                                    name="role"
                                    className="fz-16"
                                    required
                                    onChange={handleChangeFormCreateUser}
                                >
                                    <option value="User">Khách hàng</option>
                                    <option value="Admin">Quản trị</option>
                                </Form.Select>
                            </Col>
                            <Form.Control.Feedback className="fz-16" type="invalid">
                                Mật khẩu xác nhận sai
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md="12">
                            <Form.Control
                                value={createUserInfo.address}
                                name="address"
                                className="fz-16"
                                placeholder="Địa chỉ"
                                required
                                onKeyUp={handleEnterToSignup}
                                onChange={handleChangeFormCreateUser}
                            />
                            <Form.Control.Feedback className="fz-16" type="invalid">
                                Địa chỉ không được để trống
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Col} md="12">
                            <Form.Control
                                value={createUserInfo.phoneNumber}
                                name="phoneNumber"
                                className="fz-16"
                                placeholder="Số điện thoại"
                                required
                                minLength="10"
                                maxLength={10}
                                onKeyUp={handleEnterToSignup}
                                onChange={handleChangeFormCreateUser}
                            />
                            <Form.Control.Feedback className="fz-16" type="invalid">
                                Số điện thoại phải là 10 số
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16 sign-up-btn" onClick={handleSubmitFormCreateUser}>
                        Đăng ký
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageUser;
