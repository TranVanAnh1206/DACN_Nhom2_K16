import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './AdminHeader.module.scss';
import AccountAvatar from '~/components/AccountAvatar';
import logo from '~/assets/imgs/logo-nhasachtritue-2.png';

const AdminHeader = () => {
    return (
        <div className={clsx("d-flex flex-wrap" ,styles['header'])}>
            <Link to="/">
                <img height={70} src={logo} alt="logo-nhasachtritue" />
            </Link>
            {/* <h4 className={clsx(styles['fz-32'])}>Admin Management</h4> */}
            <AccountAvatar className={clsx(styles['user-action'])} />
        </div>
    );
};

export default AdminHeader;
