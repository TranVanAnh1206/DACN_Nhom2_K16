import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import 'sweetalert2/src/sweetalert2.scss';

import 'bootstrap/dist/js/bootstrap.bundle.js';

import '~/styles/index.scss';
import { CartProvider } from './hooks/CartContext';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <CartProvider>
                <App />
            </CartProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
