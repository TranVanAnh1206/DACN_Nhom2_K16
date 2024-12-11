import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
            <h1>404 - Không tìm thấy trang</h1>
            <p className="fz-16">Xin lỗi, Trang không tồn tại.</p>
            <Link className="fz-16" to="/">
                Về trang chủ
            </Link>
        </div>
    );
};

export default NotFound;
