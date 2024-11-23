import styles from './Register.module.scss';
import {
    Card,
    Checkbox,
    Grid,
    TextField,
    useTheme,
    Box,
    styled,
    Grid2,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControlLabel,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import posting_photo_svg from '../../../public/assets/images/illustrations/posting_photo.svg';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Label } from '@mui/icons-material';
import { signUpService } from '~/services/userServices';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slices/loadingSlide';
import customToastify from '~/utils/customToastify';

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}));

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRegister = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));

// initial login credentials
var initialValues = {
    new_email: '',
    new_pass: '',
    new_user_name: '',
    new_phone: '',
    new_addr: '',
};

// form field validation schema
const validationSchema = Yup.object().shape({
    new_user_name: Yup.string().required('UserName là bắt buộc!'),
    new_pass: Yup.string()
        .min(6, 'Mật khẩu tối thiểu 6 ký tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt',
        )
        .required('Mật khẩu là bắt buộc!'),
    new_phone: Yup.string()
        .min(10, 'Số điện thoại phải là 10 chữ só')
        .max(10, 'Số điện thoại phải là 10 chữ só')
        .matches(/^[0-9]{10}$/, 'Số điện thoại phải là 10 chữ só')
        .required('Số điện thoại là bắt buộc!'),
    new_addr: Yup.string().required('Số điện thoại là bắt buộc!'),
    new_email: Yup.string().email('Email không đúng định dạng').required('Email Là bắt buộc!'),
});

const Register = () => {
    const dispatch = useDispatch();
    const [agreeTermOfService, setAgreeTermOfService] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = async (value) => {
        dispatch(setLoading(true));
        console.log(value);

        var res = await signUpService({
            username: value.new_user_name,
            email: value.new_email,
            password: value.new_pass,
            address: value.new_addr,
            phoneNumber: value.new_phone,
        });

        console.log(res);

        if (res && res?.status === 200) {
            customToastify.success('Đăng ký tài khoản thành công!');
            dispatch(setLoading(false));
        } else {
            customToastify.success('Đăng ký tài khoản thất bại!');
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        initialValues = {
            new_email: '',
            new_pass: '',
            new_user_name: '',
            new_phone: '',
            new_addr: '',
        };
    }, []);

    return (
        <JWTRegister>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <img width="100%" alt="Register" src="/assets/images/illustrations/posting_photo.svg" />
                        </ContentBox>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <Box p={4} height="100%">
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form name="frm_signin" autoComplete="off" onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            autoComplete="new-username"
                                            size="small"
                                            type="text"
                                            name="new_user_name"
                                            label="Tên người dùng"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.new_user_name}
                                            onChange={handleChange}
                                            helperText={touched.new_user_name && errors.new_user_name}
                                            error={Boolean(errors.new_user_name && touched.new_user_name)}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            autoComplete="new_email"
                                            size="small"
                                            type="email"
                                            name="new_email"
                                            label="Nhập email"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.new_email}
                                            onChange={handleChange}
                                            helperText={touched.new_email && errors.new_email}
                                            error={Boolean(errors.new_email && touched.new_email)}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            autoComplete="new_pass"
                                            size="small"
                                            name="new_pass"
                                            type="password"
                                            label="Mật khẩu"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.new_pass}
                                            onChange={handleChange}
                                            helperText={touched.new_pass && errors.new_pass}
                                            error={Boolean(errors.new_pass && touched.new_pass)}
                                            sx={{ mb: 2 }}
                                        />

                                        <TextField
                                            fullWidth
                                            autoComplete="new-phone"
                                            size="small"
                                            type="text"
                                            name="new_phone"
                                            label="Điện thoại"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.new_phone}
                                            onChange={handleChange}
                                            helperText={touched.new_phone && errors.new_phone}
                                            error={Boolean(errors.new_phone && touched.new_phone)}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            autoComplete="new-addr"
                                            size="small"
                                            type="text"
                                            name="new_addr"
                                            label="Địa chỉ"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.new_addr}
                                            onChange={handleChange}
                                            helperText={touched.new_addr && errors.new_addr}
                                            error={Boolean(errors.new_addr && touched.new_addr)}
                                            sx={{ mb: 3 }}
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    id="agreeTermOfService"
                                                    name="agree term of service"
                                                    onChange={() => setAgreeTermOfService(!agreeTermOfService)}
                                                    sx={{ padding: 0 }}
                                                />
                                            }
                                            label="Tôi đã đọc và đồng ý với các điều khoản dịch vụ."
                                        />

                                        <Button disabled={!agreeTermOfService} className="mt-4 mb-3" type="submit">
                                            Đăng ký tài khoản
                                        </Button>

                                        <p>
                                            <span className="me-2">Bạn đã có tài khoản chưa?</span>
                                            <NavLink to="/login">Đăng nhập ngay</NavLink>
                                        </p>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </JWTRegister>
    );
};

export default Register;
