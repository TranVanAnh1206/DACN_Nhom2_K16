import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
            <h1>404 - Page Not Found</h1>
            <p className="fz-16">Sorry, the page you are looking for does not exist.</p>
            <Link className="fz-16" to="/">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound;
