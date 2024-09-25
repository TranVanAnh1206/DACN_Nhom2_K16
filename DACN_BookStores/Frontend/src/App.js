import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import routes, { adminRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFetchUserData from '~/hooks/useFetchUserData';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from './redux/selectors';
import NotFound from '~/pages/NotFound';
import { SetupInterceptors } from './utils/axios';
import { saveUserInfors } from './redux/actions';
import Loading from './components/Loading/Loading';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function NavigateFunctionComponent() {
    let navigate = useNavigate();
    const [ran, setRan] = useState(false);

    {
        /* only run setup once */
    }
    if (!ran) {
        SetupInterceptors(navigate);
        setRan(true);
    }
    return <></>;
}

function App() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user);

    useEffect(() => {
        const fetUser = async () => {
            var token = localStorage.getItem('token');

            if (token) {
                await dispatch(saveUserInfors());
            }

            console.log(userInfo);
        };

        fetUser();
    }, [dispatch]);

    return (
        <BrowserRouter>
            {<NavigateFunctionComponent />}
            <ScrollToTop />

            <Routes>
                {routes.map((route, index) => {
                    const Page = route.element;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = React.Fragment;
                    }
                    return (
                        <Route
                            key={`route-${index}`}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}

                {userInfo?.role === 'Admin' &&
                    adminRoutes.map((route, index) => {
                        const Page = route.element;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = React.Fragment;
                        }
                        return (
                            <Route
                                key={`route-${index}`}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                <Route element={NotFound} />
            </Routes>

            <Loading />
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
