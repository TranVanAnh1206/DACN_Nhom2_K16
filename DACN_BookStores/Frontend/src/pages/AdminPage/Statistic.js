import { useState, useEffect } from 'react';
import { Form, Table, Row, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { getStatistic } from '~/services/statisticService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './AdminPage.module.scss';
import dayjs from 'dayjs';
import {
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Paper,
    TableHead,
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { formatPrice } from '~/utils/commonUtils';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DatePicker from 'react-datepicker';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Statistic = () => {
    // eslint-disable-next-line no-unused-vars
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
            <div className="my-3">
                <h3>Báo cáo</h3>
                <hr />
            </div>

            <Grid container spacing={3} alignItems="center mt-3">
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel id="filter-type-label">Lọc theo</InputLabel>
                        <Select
                            labelId="filter-type-label"
                            value={filterType}
                            onChange={handleFilterTypeChange}
                            label="Lọc theo"
                        >
                            <MenuItem value="DAY">Theo ngày</MenuItem>
                            <MenuItem value="MONTH">Theo tháng</MenuItem>
                            <MenuItem value="YEAR">Theo năm</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {filterType === 'DAY' && (
                    <Grid item xs={12} md={12}>
                        <Grid item xs={6} md={6}>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                                    <DatePicker
                                        label="Controlled picker"
                                        value={startDate}
                                        maxDate={new Date()}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider> */}
                            {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs(new Date())} /> */}
                            <Typography>Ngày bắt đầu</Typography>
                            <DatePicker
                                selected={startDate}
                                maxDate={new Date()}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                            />
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <Typography>Ngày kết thúc</Typography>
                            <DatePicker
                                selected={endDate}
                                maxDate={new Date()}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                            />
                        </Grid>
                    </Grid>
                )}
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        {filterType === 'DAY' && 'Ngày'}
                                        {filterType === 'MONTH' && 'Tháng'}
                                        {filterType === 'YEAR' && 'Năm'}
                                    </div>
                                    <div>
                                        <IconButton
                                            onClick={() => handleChangeSortType('ASC')}
                                            color={sortType === 'ASC' ? 'primary' : 'default'}
                                        >
                                            <ArrowUpward />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleChangeSortType('DESC')}
                                            color={sortType === 'DESC' ? 'primary' : 'default'}
                                        >
                                            <ArrowDownward />
                                        </IconButton>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell align="center">Số lượng sách bán</TableCell>
                            <TableCell align="center">Doanh thu (VND)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statistics.length > 0 ? (
                            statistics.map((stat, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{stat.date}</TableCell>
                                    <TableCell align="center">{stat.numberOfBooksSold} quyển sách</TableCell>
                                    <TableCell align="center">{formatPrice(stat.revenue, 'VND')}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Không có thống kê vào ngày này
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Statistic;
