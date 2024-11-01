import styles from './Register.module.scss';
import { Card, Checkbox, Grid, TextField, useTheme, Box, styled, Grid2 } from '@mui/material';
import posting_photo_svg from '../../../public/assets/images/illustrations/posting_photo.svg';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

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
const initialValues = {
    email: '',
    password: '',
    username: '',
};

// form field validation schema
const validationSchema = Yup.object().shape({
    username: Yup.string().required('UserName là bắt buộc!'),
    password: Yup.string()
        .min(6, 'Mật khẩu tối thiểu 6 ký tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt',
        )
        .required('Mật khẩu là bắt buộc!'),
    email: Yup.string().email('Email không đúng định dạng').required('Email Là bắt buộc!'),
});

const Register = () => {
    const [agreeTermOfService, setAgreeTermOfService] = useState(false);

    const handleFormSubmit = (value) => {
        //
    };

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
                                    <form autocomplete="off" onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            autocomplete="off"
                                            size="small"
                                            type="text"
                                            name="username"
                                            label="Username"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.username}
                                            onChange={handleChange}
                                            helperText={touched.username && errors.username}
                                            error={Boolean(errors.username && touched.username)}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            autocomplete="off"
                                            size="small"
                                            type="email"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.email}
                                            onChange={handleChange}
                                            helperText={touched.email && errors.email}
                                            error={Boolean(errors.email && touched.email)}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            autocomplete="off"
                                            size="small"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.password}
                                            onChange={handleChange}
                                            helperText={touched.password && errors.password}
                                            error={Boolean(errors.password && touched.password)}
                                            sx={{ mb: 2 }}
                                        />

                                        <FlexBox gap={1} alignItems="center">
                                            <Checkbox
                                                size="small"
                                                name="agree term of service"
                                                onChange={() => setAgreeTermOfService(!agreeTermOfService)}
                                                sx={{ padding: 0 }}
                                            />

                                            <p>I have read and agree to the terms of service.</p>
                                        </FlexBox>

                                        <Button disabled={!agreeTermOfService} className="mt-4 mb-3" type="submit">
                                            Register
                                        </Button>

                                        <p>
                                            <span className="me-2">Already have an account?</span>
                                            <NavLink to="/login">Login</NavLink>
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
