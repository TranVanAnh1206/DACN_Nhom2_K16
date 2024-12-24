import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Modal, Pagination, Form, Col, Row } from 'react-bootstrap';
import styles from './AdminPage.module.scss';
import { adminChangeStatusOfOrderService, adminGetAllOrdersService } from '~/services/orderService';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { formatCurrency, formatPrice } from '~/utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slices/loadingSlide';
import customToastify from '~/utils/customToastify';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid } from '@mui/x-data-grid';

const ManageOrder = ({ setSpinning }) => {
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 20;

    const fetchGetOrders = async () => {
        try {
            setLoading(true);
            const res = await adminGetAllOrdersService({ pageNumber: currentPage, pageSize: pageSize });

            setTotalPage(res?.data?.totalPage);

            setOrders(
                res?.data?.datas?.map((order) => {
                    return {
                        id: order?.id,
                        userId: order?.userId,
                        userName: order?.userName,
                        userEmail: order?.userEmail,
                        userPhoneNumber: order?.userPhoneNumber,
                        userAddress: order?.userAddress,
                        totalAmount: order?.totalAmount,
                        status: order?.status,
                        voucherId: order?.voucherId,
                        voucherPercent: order?.voucherPercent,
                        date: order?.date,
                        orderItems: order?.orderItems?.map((book) => ({
                            bookId: book?.bookId,
                            bookName: book?.bookName,
                            bookImage: book?.bookImage,
                            bookPrice: book?.bookPrice,
                            quantity: book?.quantity,
                        })),
                    };
                }),
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGetOrders();
    }, [currentPage]);

    const handleChangePage = (i) => {
        setCurrentPage(i);
    };

    // Update order
    const [showModalUpdateOrder, setShowModalUpdateOrder] = useState(false);
    const handleCloseModalUpdateOrder = () => setShowModalUpdateOrder(false);
    const handleShowModalUpdateOrder = (id, status) => {
        setOrderUpdateInfo({
            id: Number(id),
            status: status,
        });
        setShowModalUpdateOrder(true);
    };

    const [orderUpdateInfo, setOrderUpdateInfo] = useState({
        id: null,
        status: '',
    });

    const handleSubmitUpdateOrder = async () => {
        dispatch(setLoading(true));
        try {
            await adminChangeStatusOfOrderService({ orderId: orderUpdateInfo?.id, status: orderUpdateInfo?.status });
            customToastify.success('Cập nhật trạng thái đơn hàng thành công!');
            fetchGetOrders();
        } catch (error) {
            console.log(error);
            customToastify.success('Cập nhật trạng thái đơn hàng thất bại');
        } finally {
            handleCloseModalUpdateOrder();
            dispatch(setLoading(false));
        }
    };

    const columns = [
        {
            field: 'orderItems',
            headerName: 'Sản phẩm',
            flex: 1.5,
            headerAlign: 'left',
            align: 'left',
            renderCell: (params) => (
                <div style={{ display: 'flex', margin: '10px', flexDirection: 'column', gap: '8px' }}>
                    {params.row.orderItems.map((item, index) => (
                        <div key={item.bookId || index} className="d-flex align-items-center gap-2">
                            <img
                                src={item.bookImage || '/default-image.jpg'}
                                alt={item.bookName}
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/default-image.jpg';
                                }}
                            />
                            <div>
                                <div
                                    style={{
                                        height: '40px',
                                        margin: '3px 9px',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    className="fw-bold"
                                >
                                    {item.bookName}
                                </div>
                                <div style={{ margin: '3px 9px' }}>{formatCurrency(item.bookPrice, 'VND')}</div>
                                <div style={{ margin: '3px 9px' }}>x {item.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        // {
        //     field: 'address',
        //     headerName: 'Địa chỉ',
        //     flex: 1,
        //     headerAlign: 'center',
        //     align: 'center',
        // },
        {
            field: 'amount',
            headerName: 'Tổng tiền',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <>{formatCurrency(params?.row?.amount, 'VND')}</>,
        },
        {
            field: 'date',
            headerName: 'Ngày',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <>{moment(params.row?.date).format('DD/MM/YYYY')}</>,
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                const obj = {
                    0: 'Đã huỷ',
                    1: 'Đã thanh toán',
                    2: 'Chưa thanh toán',
                    3: 'Đã giao hàng',
                    4: 'Đang xử lý',
                };

                return (
                    <>
                        {params?.row?.status === 0 ? (
                            <p className="text-danger">{obj[params?.row?.status]}</p>
                        ) : params?.row?.status === 3 ? (
                            <p className="text-success">{obj[params?.row?.status]}</p>
                        ) : (
                            <p>{obj[params?.row?.status]}</p>
                        )}
                    </>
                );
            },
        },
        {
            field: 'actions',
            headerName: '',
            flex: 0.4,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <Button
                        variant="text"
                        color="warning"
                        style={{ margin: 8 }}
                        onClick={() => handleShowModalUpdateOrder(params.row.id, params.row.status)}
                    >
                        <EditOutlinedIcon />
                    </Button>
                </>
            ),
            sortable: false,
        },
    ];

    return (
        <div id="manage-orders">
            <div className="my-3">
                <h3>Danh sách đơn đặt hàng</h3>
                <hr />
            </div>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={orders.map((order) => ({
                        id: order?.id,
                        email: order?.userEmail,
                        address: order?.userAddress,
                        amount: order?.totalAmount,
                        date: order?.date,
                        status: order?.status,
                        orderItems: order?.orderItems,
                    }))}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10, 20]}
                    disableSelectionOnClick
                    getRowHeight={() => 'auto'}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
                        '& .MuiDataGrid-row': { cursor: 'pointer' },
                    }}
                />
            </Box>

            <Pagination className="mt-3 d-flex justify-content-center">
                {Array.from({ length: totalPage }, (_, i) => (i = i + 1))?.map((i) => {
                    return (
                        <Pagination.Item
                            key={i}
                            className={clsx(styles['page-number'])}
                            active={i === currentPage}
                            onClick={() => handleChangePage(i)}
                        >
                            {i}
                        </Pagination.Item>
                    );
                })}
            </Pagination>

            <Dialog open={showModalUpdateOrder} onClose={handleCloseModalUpdateOrder} fullWidth maxWidth="sm">
                <DialogTitle>Cập nhật trạng thái đươn hàng</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="order-status-label">Trạng thái</InputLabel>
                        <Select
                            labelId="order-status-label"
                            id="order-status"
                            value={orderUpdateInfo?.status ?? ''}
                            onChange={(e) =>
                                setOrderUpdateInfo({
                                    ...orderUpdateInfo,
                                    status: e.target.value,
                                })
                            }
                            label="Trạng thái"
                        >
                            <MenuItem defaultChecked value={''}>
                                Chọn trạng thái cho đơn hàng
                            </MenuItem>
                            <MenuItem value={0}>Hủy đơn hàng</MenuItem>
                            <MenuItem value={3}>Đã giao hàng</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleCloseModalUpdateOrder}>
                        Huỷ
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmitUpdateOrder}>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageOrder;
