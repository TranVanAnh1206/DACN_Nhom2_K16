import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserInfo } from '~/redux/actions/';
import Swal from 'sweetalert2';

const wrapStyle = {
    cursor: 'pointer',
    color: 'red',
};

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Đăng xuất?',
            text: 'Bạn muốn đăng xuất ngay bây giờ!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không!',
            confirmButtonText: 'Yes, Đăng xuất!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(clearUserInfo());
                localStorage.removeItem('token');
                navigate('/login');
            }
        });
    };

    return (
        <>
            <div style={wrapStyle} onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} /> <span className="">Đăng xuất</span>
            </div>
        </>
    );
};

export default Logout;
