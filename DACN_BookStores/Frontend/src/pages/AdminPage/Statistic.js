import { useState, useEffect } from 'react';
import { Form, Table, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { getStatistic } from '~/services/statisticService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './AdminPage.module.scss';

const Statistic = () => {
    const [loading, setLoading] = useState(false);

    const [filterType, setFilterType] = useState('DAY');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [statistics, setStatistics] = useState([]);
    const [sortType, setSortType] = useState('DESC');

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                const res = await getStatistic({ type: filterType, sortType: sortType });
                if (filterType === 'DAY') {
                    const cloneRes = res?.data?.map((statistic) => ({
                        date: new Date(statistic?.dateTime),
                        revenue: statistic?.revenue,
                        numberOfBooksSold: statistic?.numberOfBookSold,
                    }));

                    const convertDate = (date) => {
                        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    };

                    const start = convertDate(startDate);
                    const end = convertDate(endDate);

                    setStatistics(
                        cloneRes
                            .filter((statistic) => {
                                const dateOnly = convertDate(statistic.date);
                                return dateOnly >= start && dateOnly <= end;
                            })
                            .map((i) => ({
                                ...i,
                                date: moment(i?.date).format('DD/MM/YYYY'),
                            })),
                    );
                } else if (filterType === 'MONTH') {
                    setStatistics(
                        res?.data?.map((statistic) => {
                            const d = statistic.dateTime.split('-');
                            return {
                                date: `${d[1]}/${d[0]}`,
                                revenue: statistic?.revenue,
                                numberOfBooksSold: statistic?.numberOfBookSold,
                            };
                        }),
                    );
                } else if (filterType === 'YEAR') {
                    setStatistics(
                        res?.data?.map((statistic) => {
                            return {
                                date: statistic.dateTime,
                                revenue: statistic?.revenue,
                                numberOfBooksSold: statistic?.numberOfBookSold,
                            };
                        }),
                    );
                }
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [filterType, startDate, endDate, sortType]);

    const handleFilterTypeChange = (event) => {
        const value = event.target.value;
        setFilterType(value);

        switch (value) {
            case 'day':
                setStartDate(new Date());
                setEndDate(new Date());
                break;
            case 'week':
                setStartDate(moment().startOf('week').toDate());
                setEndDate(moment().endOf('week').toDate());
                break;
            case 'month':
                setStartDate(moment().startOf('month').toDate());
                setEndDate(moment().endOf('month').toDate());
                break;
            case 'year':
                setStartDate(moment().startOf('year').toDate());
                setEndDate(moment().endOf('year').toDate());
                break;
            default:
                break;
        }
    };

    const handleChangeSortType = (type) => {
        setSortType(type);
    };

    return (
        <div>
            <h2>Thống kê</h2>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Lọc theo
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="select" value={filterType} onChange={handleFilterTypeChange}>
                            <option value="DAY">Theo ngày</option>
                            <option value="MONTH">Theo tháng</option>
                            <option value="YEAR">Theo năm</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                {filterType === 'DAY' && (
                    <>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Ngày bắt đầu
                            </Form.Label>
                            <Col sm={10}>
                                <DatePicker
                                    selected={startDate}
                                    maxDate={Date.now()}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="dd/MM/YYYY"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    showMonthDropdown
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Ngày kết thúc
                            </Form.Label>
                            <Col sm={10}>
                                <DatePicker
                                    selected={endDate}
                                    maxDate={Date.now()}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="dd/MM/YYYY"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    showMonthDropdown
                                />
                            </Col>
                        </Form.Group>
                    </>
                )}
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    {filterType === 'DAY' && 'Ngày'}
                                    {filterType === 'MONTH' && 'Tháng'}
                                    {filterType === 'YEAR' && 'Năm'}
                                </div>
                                <div>
                                    <FontAwesomeIcon
                                        className={clsx('me-3', {
                                            [[styles['sort-type-active']]]: sortType === 'ASC',
                                        })}
                                        icon={faArrowUp}
                                        onClick={() => handleChangeSortType('ASC')}
                                    />
                                    <FontAwesomeIcon
                                        className={clsx('me-3', {
                                            [[styles['sort-type-active']]]: sortType === 'DESC',
                                        })}
                                        icon={faArrowDown}
                                        onClick={() => handleChangeSortType('DESC')}
                                    />
                                </div>
                            </div>
                        </th>
                        <th>Số lượng sách bán</th>
                        <th>Doanh thu (VND)</th>
                    </tr>
                </thead>
                {statistics?.length > 0 ? (
                    <tbody>
                        {statistics.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.date}</td>
                                <td>{stat.numberOfBooksSold}</td>
                                <td>{stat.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="3">
                                <div className="fz-16 text-center" style={{ width: '100%' }}>
                                    Không có thống kê vào ngày này
                                </div>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>
        </div>
    );
};

export default Statistic;
