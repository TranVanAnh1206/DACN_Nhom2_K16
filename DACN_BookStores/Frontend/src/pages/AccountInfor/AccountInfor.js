import { useEffect, useState } from 'react';
import styles from './AccountInfor.module.scss';
import './AccountInfor.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvartar from '../../assets/imgs/avatar-default.png';
import { ChangeUserInforService } from '~/services/userServices';
import { setLoading } from '~/redux/slices/loadingSlide';
import { Tabs } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

var AccountInfor = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({
        id: null,
        userName: null,
        email: null,
        isActive: true,
        phoneNumber: null,
        address: null,
        displayName: null,
        gender: null,
        birthday: '2024-10-25',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        setUserInfo({ ...user });
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSave = async () => {
        dispatch(setLoading(true));
        try {
            setIsEditing(false);

            await ChangeUserInforService(userInfo);
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleChangeInfor = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    return (
        <div className="container mt-3">
            <div className={clsx(styles['user-info-wrap'], 'user-info-wrap_css')}>
                <div className={clsx(styles.sidebar)}>
                    {/* <ul className={clsx(styles.menu)}>
                        <li>Hồ Sơ</li>
                        <li>Đổi Mật Khẩu</li>
                        <li>Cài Đặt Thông Báo</li>
                    </ul> */}

                    <Tab.Container id="left-tabs-example" defaultActiveKey="hoso">
                        <Row>
                            <Col sm={3}>
                                <div className={clsx(styles.userInfo)}>
                                    <img
                                        src={user?.avatar || defaultAvartar}
                                        alt="User Avatar"
                                        className={clsx(styles.avatar)}
                                    />
                                    <p className={clsx(styles.username)}>{user?.username}</p>
                                </div>

                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="hoso">Hồ sơ</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Đổi mật khẩu</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="hoso">
                                        <div className={clsx(styles.profileContent)}>
                                            <h2>Hồ Sơ Của Tôi</h2>
                                            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

                                            <div className={clsx(styles.profileForm)}>
                                                <div className={clsx(styles.profileFormItem, 'row')}>
                                                    <label className="col-md-4">Tên đăng nhập</label>
                                                    <p className="col-md-8">{userInfo.username}</p>
                                                </div>

                                                <div className={clsx(styles.profileFormItem, 'row')}>
                                                    <label className="col-md-4">Email</label>
                                                    {!isEditing ? (
                                                        <>
                                                            <p className="col-md-8">{userInfo.email}</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="col-md-8">{userInfo.email}</p>
                                                        </>
                                                    )}
                                                </div>

                                                <div className={clsx(styles.profileFormItem, 'row')}>
                                                    <label className="col-md-4">Tên hiển thị</label>
                                                    {!isEditing ? (
                                                        <>
                                                            <p className="col-md-8">{userInfo.displayName}</p>
                                                        </>
                                                    ) : (
                                                        <div className="col-md-8">
                                                            <input
                                                                type="text"
                                                                name="displayName"
                                                                required
                                                                value={userInfo.displayName}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className={clsx(styles.profileFormItem, 'row')}>
                                                    <label className="col-md-4">Số điện thoại</label>
                                                    {!isEditing ? (
                                                        <>
                                                            <p className="col-md-8">{userInfo.phoneNumber}</p>
                                                        </>
                                                    ) : (
                                                        <div className="col-md-8">
                                                            <input
                                                                type="text"
                                                                name="phoneNumber"
                                                                value={userInfo.phoneNumber}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className={clsx(styles.profileFormItem, 'row')}>
                                                    <label className="col-md-4">Địa chỉ</label>

                                                    {!isEditing ? (
                                                        <>
                                                            <p className="col-md-8">{userInfo.address}</p>
                                                        </>
                                                    ) : (
                                                        <div className="col-md-8">
                                                            <input
                                                                type="text"
                                                                name="address"
                                                                value={userInfo.address}
                                                                onChange={handleInputChange}
                                                            />

                                                            <p>Đây sẽ là địa chỉ nhận hàng của bạn!</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className={clsx(styles.profileFormItem, 'row')}>
                                                    <label className="col-md-4">Giới tính</label>
                                                    <div className={clsx(styles.gender, 'col-md-8')}>
                                                        {!isEditing ? (
                                                            <div>{userInfo.gender === 'male' ? 'Nam' : 'Nữ'}</div>
                                                        ) : (
                                                            <>
                                                                <div class="form-check me-3">
                                                                    <input
                                                                        class="form-check-input"
                                                                        type="radio"
                                                                        name="gender"
                                                                        value={'male'}
                                                                        id="gender_male"
                                                                        checked={userInfo.gender === 'male'}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    <label class="form-check-label" for="gender_male">
                                                                        Nam
                                                                    </label>
                                                                </div>
                                                                <div class="form-check">
                                                                    <input
                                                                        class="form-check-input"
                                                                        type="radio"
                                                                        name="gender"
                                                                        value={'female'}
                                                                        id="gender_female"
                                                                        checked={userInfo.gender === 'female'}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    <label class="form-check-label" for="gender_female">
                                                                        Nữ
                                                                    </label>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className={clsx(styles.profileFormItem, 'row')}>
                                                    <label className="col-md-4">Ngày sinh</label>
                                                    {!isEditing ? (
                                                        <>
                                                            <p className="col-md-8">{userInfo.birthDate}</p>
                                                        </>
                                                    ) : (
                                                        <div className="col-md-8">
                                                            <input
                                                                type="date"
                                                                name="birthday"
                                                                value={userInfo.birthDate}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-8">
                                                        {isEditing ? (
                                                            <button
                                                                className={clsx(styles.saveButton)}
                                                                onClick={handleSave}
                                                            >
                                                                Lưu
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className={clsx(styles.saveButton)}
                                                                onClick={handleChangeInfor}
                                                            >
                                                                Thay đổi thông tin
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <div>
                                            <h2>Đổi mật khẩu</h2>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
};

export default AccountInfor;
