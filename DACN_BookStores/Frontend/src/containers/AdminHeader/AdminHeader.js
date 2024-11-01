import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './AdminHeader.module.scss';
import AccountAvatar from '~/components/AccountAvatar';
import logo from '~/assets/imgs/VEdu.png';

const AdminHeader = () => {
    return (
        <div className={clsx(styles['header'])}>
            <Link to="/">
                <img width={50} height={50} src={logo} alt="VEdu" />
            </Link>
            <h4 className={clsx(styles['fz-32'])}>Admin Management</h4>
            <AccountAvatar className={clsx(styles['user-action'])} />
        </div>
    );
};

export default AdminHeader;
