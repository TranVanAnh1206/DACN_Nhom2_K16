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
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { TextField } from '@mui/material';
import customToastify from '~/utils/customToastify';

var initialChangePassValue = {
    oldPass: '',
    newPass: '',
    confirmPass: '',
};

var validationChangePassSchema = Yup.object().shape({
    oldPass: Yup.string().required('Vui lòng nhập mật khẩu hiển tại!'),
    newPass: Yup.string()
        .required('Vui lòng nhập mật khẩu mới!')
        .min(6, 'Mật khẩu tối thiểu 6 ký tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt',
        ),
    confirmPass: Yup.string()
        .required('Xác nhận mật khẩu mới!')
        .oneOf([Yup.ref('newPass'), null], 'Mật khẩu xác nhận không khớp'),
});

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
    const [changePassErrors, setChangePassErrors] = useState({});

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

    const handleFrmChangePasswordSubmit = async (values) => {
        dispatch(setLoading(true));

        try {
            // Xử lý dữ liệu sau khi người dùng nhập đúng form
            console.log('Form values:', values);

            var res = await ChangePasswordService(values.oldPass, values.newPass, values.confirmPass);

            if (res.data?.statusCode === 200) {
                customToastify.success(res.data?.message);

                initialChangePassValue = {
                    oldPass: '',
                    newPass: '',
                    confirmPass: '',
                };
            } else {
                customToastify.error(res.data?.message);
            }
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setLoading(false));
        }
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
                                                                <div className="form-check me-3">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name="gender"
                                                                        value={'male'}
                                                                        id="gender_male"
                                                                        checked={userInfo.gender === 'male'}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="gender_male"
                                                                    >
                                                                        Nam
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name="gender"
                                                                        value={'female'}
                                                                        id="gender_female"
                                                                        checked={userInfo.gender === 'female'}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="gender_female"
                                                                    >
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
                                        <Formik
                                            initialValues={initialChangePassValue}
                                            validationSchema={validationChangePassSchema}
                                            onSubmit={handleFrmChangePasswordSubmit}
                                        >
                                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                                <form onSubmit={handleSubmit} autoComplete="off">
                                                    <h2>Đổi mật khẩu</h2>

                                                    <div className={clsx(styles['change-pass-wrap'])}>
                                                        <TextField
                                                            fullWidth
                                                            autoComplete="off"
                                                            type="password"
                                                            size="small"
                                                            name="oldPass"
                                                            label="Mật khẩu hiện tại"
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            value={values.oldPass}
                                                            onChange={handleChange}
                                                            helperText={touched.oldPass && errors.oldPass}
                                                            error={Boolean(errors.oldPass && touched.oldPass)}
                                                            sx={{ mb: 3 }}
                                                        />

                                                        <TextField
                                                            fullWidth
                                                            autoComplete="off"
                                                            type="password"
                                                            size="small"
                                                            name="newPass"
                                                            label="Mật khẩu mới"
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            value={values.newPass}
                                                            onChange={handleChange}
                                                            helperText={touched.newPass && errors.newPass}
                                                            error={Boolean(errors.newPass && touched.newPass)}
                                                            sx={{ mb: 3 }}
                                                        />

                                                        <TextField
                                                            fullWidth
                                                            autoComplete="off"
                                                            type="password"
                                                            size="small"
                                                            name="confirmPass"
                                                            label="Xác nhận mật khẩu"
                                                            variant="outlined"
                                                            onBlur={handleBlur}
                                                            value={values.confirmPass}
                                                            onChange={handleChange}
                                                            helperText={touched.confirmPass && errors.confirmPass}
                                                            error={Boolean(errors.confirmPass && touched.confirmPass)}
                                                            sx={{ mb: 3 }}
                                                        />
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className={clsx(styles.saveButton)}
                                                        disabled={errors === null}
                                                    >
                                                        Đổi mật khẩu
                                                    </button>
                                                </form>
                                            )}
                                        </Formik>
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
