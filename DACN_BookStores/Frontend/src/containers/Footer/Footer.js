import clsx from 'clsx';
import { Link } from 'react-router-dom';
import logo from '~/assets/imgs/logo-nhasachtritue.png';
import footerBct from '~/assets/imgs/footerBct.png';
import facebook from '~/assets/imgs/facebook-social.png';
import shopee from '~/assets/imgs/shopee-social.png';
import tiktok from '~/assets/imgs/tiktok.png';
import styles from './Footer.module.scss';
import { faLocationDot, faPhoneVolume, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <div className={clsx(styles['footer-wrapper'])}>
            <div className={clsx(styles['content'], 'container')}>
                <div className={clsx(styles['contact'])}>
                    <Link to="/">
                        <img width={210} height={180} src={logo} alt="logo-nhasachtritue" />
                    </Link>
                    <div className={clsx(styles['contact-info'])}>
                        <h4 className={clsx(styles['store-name'])}>Nhà sách trí tuệ</h4>
                        <div className={clsx(styles['contact-des'])}>
                            <FontAwesomeIcon className={clsx(styles['icon'])} icon={faLocationDot} />
                            <p className={clsx(styles['item'])}>Ngõ 177, Lai Xá, Kim Chung, Hoài Đức, Hà Nội</p>
                        </div>
                        <div className={clsx(styles['contact-des'])}>
                            <FontAwesomeIcon className={clsx(styles['icon'])} icon={faPhoneVolume} />
                            <p className={clsx(styles['item'])}>(+84) 0345126789</p>
                        </div>
                        <div className={clsx(styles['contact-des'])}>
                            <FontAwesomeIcon className={clsx(styles['icon'])} icon={faEnvelope} />
                            <p className={clsx(styles['item'])}>admin@example.com</p>
                        </div>
                        <div className={clsx(styles['box-bct'])}>
                            <a
                                href="http://online.gov.vn/Home/WebDetails/74816?AspxAutoDetectCookieSupport=1"
                                title="Liên kết Bộ Công Thương"
                                target="_blank"
                            >
                                <img src={footerBct} alt="Liên kết Bộ Công Thương" width="228" height="82" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles['introduce-info'])}>
                    <h4 className={clsx(styles['title'])}>VỀ CHÚNG TÔI</h4>
                    <Link to="/" className={clsx(styles['item'])}>
                        Giới thiệu
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Điều khoản sử dụng
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Tin tức
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Tuyển dụng
                    </Link>

                    <div className={clsx(styles['social'])}>
                        <h4 className={clsx(styles['title-menu'])}>KẾT NỐI VỚI CHÚNG TÔI</h4>
                        <div className={clsx(styles['social-icon'])}>
                            <Link className={clsx(styles['item'])} to="https://www.facebook.com/">
                                <img width="32" height="32" src={facebook} alt="facebook" />
                            </Link>
                            <Link className={clsx(styles['item'])} to="https://shopee.vn/">
                                <img width="32" height="32" src={shopee} alt="shopee" />
                            </Link>
                            <Link className={clsx(styles['item'])} to="https://www.tiktok.com/">
                                <img width="32" height="32" src={tiktok} alt="tiktok" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles[('support-info', 'introduce-info')])}>
                    <h4 className={clsx(styles['title'])}>Hỗ trợ khác hàng</h4>
                    <Link to="/" className={clsx(styles['item'])}>
                        Hướng dẫn mua hàng trực tuyến
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Quy định thẻ VIP
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Chính sách bảo mật
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Chính sách vận chuyển
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Chính sách đổi trả
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Hình thức thanh toán
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Chính sách bảo hành
                    </Link>
                    <Link to="/" className={clsx(styles['item'])}>
                        Câu hỏi thường gặp
                    </Link>
                </div>
            </div>
            <div className={clsx(styles['coppyright-info'])}>
                <p className={clsx(styles['coppyright'])}>© 2024 - Bản quyền thuộc về nhóm 2</p>
            </div>
        </div>
    );
};

export default Footer;
