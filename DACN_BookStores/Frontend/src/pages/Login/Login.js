import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import styles from './Login.module.scss';
import customToastify from '~/utils/customToastify';
import { loginService, signUpService } from '~/services/userServices';
import useFetchUserData from '~/hooks/useFetchUserData';
import { styled, Box, Card, Grid, Checkbox, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userLogin } from '~/redux/actions/authAction';
import { setLoading } from '~/redux/slices/loadingSlide';
import { saveUserInfo, saveUserInfors } from '~/redux/actions';

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
    display: 'flex',
}));

const ContentBox = styled('div')(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}));

const StyledRoot = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A2038',
    height: '100vh',
    fontSize: '14px',

    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',

        display: 'flex',
        justifyContent: 'center',
        borderRadius: 12,
        alignItems: 'center',
    },

    '.img-wrapper': {
        height: '100%',
        minWidth: 320,
        display: 'flex',
        padding: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate(null);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const fetchUserData = useFetchUserData();
    const [inputType, setInputType] = useState('password');
    const signUpFormRef = useRef(null);

    const [signUpInfo, setSignUpInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phoneNumber: '',
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);

    const handleClickShowPassword = () => setInputType((type) => (type === 'password' ? 'text' : 'password'));

    const handleChangeFormLogin = (e) => {
        const { name, value } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        dispatch(setLoading(true));
        try {
            // if (form.checkValidity() === false) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //     setValidatedFormLogin(true);
            // } else {
            //     setLoading(true);
            //     const res = await loginService(loginInfo);
            //     if (res?.data?.token) {
            //         localStorage.setItem('token', res?.data.token);
            //         fetchUserData();
            //         navigate('/');
            //     }
            // }

            e.preventDefault();

            var res = await dispatch(userLogin({ username: username, password }));

            if (res) {
                const token = res.data.token;
                localStorage.setItem('token', token);

                await dispatch(saveUserInfors());

                dispatch(setLoading(false));
                navigate('/');
                customToastify.success('Đăng nhập thành công!');
            }
        } catch (error) {
            dispatch(setLoading(false));
            setErrorLogin('Tài khoản hoặc mật khẩu của bạn không chính xác');
        } finally {
            dispatch(setLoading(false));
            setLoading(false);
        }
    };

    const handleChangeFormSignUp = (e) => {
        const { name, value } = e.target;
        setSignUpInfo({
            ...signUpInfo,
            [name]: value,
        });
    };

    const handleSubmitFormSignUp = async (e) => {
        try {
            const form = signUpFormRef.current;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
                setValidatedFormSignUp(true);
            } else {
                await signUpService({
                    username: signUpInfo.username,
                    email: signUpInfo.email,
                    password: signUpInfo.password,
                    address: signUpInfo.address,
                    phoneNumber: signUpInfo.phoneNumber,
                });

                customToastify.success('Đăng ký tài khoản thành công!');

                setSignUpInfo({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    address: '',
                    phoneNumber: '',
                });

                setValidatedFormSignUp(false);
                setShowFormSignUp(false);
            }
        } catch (error) {
            if (Number(error.status) === 400) {
                setValidatedFormSignUp(true);
                setErrorCreateUser({
                    field: error?.data?.message?.property,
                    message: error?.data?.message?.message,
                });
            }
        }
    };

    return (
        <>
            <StyledRoot>
                <Card className="card">
                    <Grid container>
                        <Grid item sm={6} xs={12}>
                            <div className="img-wrapper">
                                <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
                            </div>
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <ContentBox>
                                <Form onSubmit={(e) => handleLogin(e)}>
                                    <TextField
                                        fullWidth
                                        size="Normal"
                                        type="text"
                                        name="username"
                                        label="UserName"
                                        variant="outlined"
                                        sx={{ mb: 3 }}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />

                                    <div className={clsx(styles['password-wrap'])}>
                                        <TextField
                                            fullWidth
                                            size="Normal"
                                            name="password"
                                            type={inputType}
                                            label="Password"
                                            variant="outlined"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <span
                                            onClick={handleClickShowPassword}
                                            className={clsx(styles['show-hide-password'])}
                                        >
                                            {inputType === 'password' ? (
                                                <FontAwesomeIcon icon={faEye} />
                                            ) : (
                                                <FontAwesomeIcon icon={faEyeSlash} />
                                            )}
                                        </span>
                                    </div>

                                    <FlexBox justifyContent="space-between">
                                        <FlexBox gap={1}>
                                            <Checkbox
                                                id="ckb_rememberMe"
                                                size="Normal"
                                                name="remember"
                                                sx={{ padding: 0 }}
                                            />

                                            <label htmlFor="ckb_rememberMe">Remember Me</label>
                                        </FlexBox>

                                        <NavLink to="/session/forgot-password">Forgot password?</NavLink>
                                    </FlexBox>

                                    <Button className="mt-3" variant="primary" type="submit">
                                        Đăng nhập
                                    </Button>

                                    <div className="mt-3">
                                        Don't have an account?
                                        <NavLink className={clsx('ms-2')} to="/register">
                                            Register
                                        </NavLink>
                                    </div>
                                </Form>
                            </ContentBox>
                        </Grid>
                    </Grid>
                </Card>
            </StyledRoot>
        </>
    );
}

export default Login;
