import clsx from 'clsx';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import slider3 from '../../../public/assets/images/sliders/slider3-compressed.jpg';
import slider4 from '../../../public/assets/images/sliders/slider4-compressed.jpg';
import tu_sach from '../../../public/assets/images/tu_sach_khoa_hoc.png';
import { getBookPagingService } from '~/services/bookService';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/redux/slices/loadingSlide';
import Group from '~/components/Group';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { connect } from 'formik';
import { getAllGenresService } from '~/services/genreService';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const [bestSeller, setBestSeller] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchBestSeller = async () => {
            dispatch(setLoading(true));

            const res = await getBookPagingService({ pageNumber: 1, pageSize: 6, sortBy: 'rate' });

            if (res && res.data?.datas) {
                console.log(res);

                dispatch(setLoading(false));
                setBestSeller(res.data.datas);
            }
        };

        const fetchAllGendesService = async () => {
            dispatch(setLoading(true));

            try {
                const res = await getAllGenresService();

                setGenres(res?.data);
            } catch (err) {
                console.error(err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchAllGendesService();
        fetchBestSeller();
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 400,
        autoplaySpeed: 2000,
        cssEase: 'linear',
    };

    return (
        <div className={clsx('container', styles['section'])}>
            <Row>
                <Col md={4}>
                    <div>
                        <div className={clsx(styles['category-wrap'])}>
                            <h3 className={clsx(styles['category-title'])}>Thể loại</h3>

                            {genres?.map((item, index) => {
                                return (
                                    <Link
                                        to={`/search?genres=${item.name}`}
                                        className={clsx(styles['category-item'], 'text-black')}
                                        key={`genre-${item.id}`}
                                    >
                                        <p>{item.name}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </Col>

                <Col md={8}>
                    <div>
                        <div className={clsx('container')}>
                            <div className={clsx('slider-container')}>
                                <div className={clsx(styles['slider'])}>
                                    <Slider {...settings}>
                                        <div>
                                            <div className={clsx(styles['slider-item-wrap'])}>
                                                <div>
                                                    <img src={slider3} alt="slider 3" />
                                                </div>

                                                <div className={clsx(styles['slider-item--desc'])}>
                                                    <h1>A game of throne</h1>
                                                    <h1>-20%</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div className={clsx(styles['slider-item-wrap'])}>
                                                    <div>
                                                        <img src={slider4} alt="slider 4" />
                                                    </div>

                                                    <div className={clsx(styles['slider-item--desc'])}>
                                                        <h1>Wake the fuck up</h1>
                                                        <h1>-20%</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="d-flex justify-content-between"></div>

            <div>
                <Group title={'Sách mới'} data={bestSeller} />
            </div>

            <div className="section">
                <div className={clsx(styles['poster'])}>
                    <img src={tu_sach} />
                </div>
            </div>

            <div>
                <Group title={'Bán chạy nhất'} data={bestSeller} />
            </div>
        </div>
    );
};

export default Home;
