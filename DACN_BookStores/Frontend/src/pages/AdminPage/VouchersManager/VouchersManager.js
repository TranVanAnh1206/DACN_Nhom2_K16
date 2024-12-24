import { useEffect, useState } from 'react';
import { CreateVoucherService, DeleteVoucherService, getMyVoucherService } from '~/services/voucherService';
import { formatCurrency, formatDateTime, formatPrice } from '~/utils/commonUtils';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPenAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import customToastify from '~/utils/customToastify';
import { setLoading } from '~/redux/slices/loadingSlide';
import Swal from 'sweetalert2';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

function GenerateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result.toUpperCase();
}

const today = new Date();
today.setHours(0, 0, 0, 0);

var initialVoucherData = {
    code: '',
    discountAmount: 0,
    description: '',
    expirationDate: new Date().toISOString().split('T')[0],
    isActive: true,
    maxUsage: 0,
};

var validationVoucherDataSchema = Yup.object().shape({
    discountAmount: Yup.number()
        .required('Số tiền khuyến mãi là bắt buộc')
        .min(1, 'Số tiền khuyến mãi phải lớn hơn 0.'),
    expirationDate: Yup.date()
        .required('Ngày hết hạn là bắt buộc!')
        .min(today, 'Ngày hết hạn phải lớn hơn ngày hôm nay!'),
    maxUsage: Yup.number()
        .required('Số lần sử dụng tối đa là bắt buộc!')
        .min(1, 'Số lần sử dụng tối đa phải lớn hơn 0'),
});

const VouchersManager = () => {
    const dispatch = useDispatch();
    const [vouchers, setVouchers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

        initialVoucherData = {
            code: GenerateRandomString(12),
            discountAmount: 0,
            description: '',
            expirationDate: new Date().toISOString().split('T')[0],
            isActive: true,
            maxUsage: 0,
        };
    };

    const handleShow = () => {
        setShow(true);
        initialVoucherData.code = GenerateRandomString(12);
    };

    const fetchAllVoucher = async () => {
        var res = await getMyVoucherService();
        setVouchers(res.data);
    };

    useEffect(() => {
        fetchAllVoucher();
    }, []);

    const handleFrmSaveVoucherData = async (values) => {
        var res = await CreateVoucherService(values);
        dispatch(setLoading(true));

        if (res?.data === 1) {
            fetchAllVoucher();

            handleClose();

            dispatch(setLoading(false));
            customToastify.success('Tạo mới voucher thành công!');
        } else {
            dispatch(setLoading(false));
            customToastify.success('Lỗi trong khi thêm voucher!');
        }
    };

    const handleDeleteVoucher = (id) => {
        Swal.fire({
            title: 'Xóa voucher?',
            text: 'Bạn muốn xóa voucher này ngay bây giờ!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không!',
            confirmButtonText: 'Xóa!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(setLoading(true));

                var res = await DeleteVoucherService(id);

                if (res?.data === 1) {
                    fetchAllVoucher();
                    dispatch(setLoading(false));
                    customToastify.success('Xóa voucher thành công!');
                }
            }
        });
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'code',
            headerName: 'Code',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'discount',
            headerName: 'Giảm giá (vnđ)',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <>{formatCurrency(params?.row?.discount, 'VND')}</>,
        },
        {
            field: 'expDate',
            headerName: 'Ngày hết hạn',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <>{moment(params.row?.date).format('DD/MM/YYYY')}</>,
        },
        {
            field: 'useCount',
            headerName: 'Lượt sử dụng',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'used',
            headerName: 'Đã sử dụng',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        // {
        //     field: 'status',
        //     headerName: 'Trạng thái',
        //     flex: 1,
        //     headerAlign: 'center',
        //     align: 'center',
        // },
        {
            field: 'actions',
            headerName: '',
            flex: 1,
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

                    <Button variant="text" color="error" onClick={() => handleDeleteVoucher(params.row?.id)}>
                        <DeleteOutlineOutlinedIcon />
                    </Button>
                </>
            ),
            sortable: false,
        },
    ];

    return (
        <div>
            <div className="my-3">
                <h3>Danh sách mã giảm giá</h3>
                <hr />
            </div>

            <div className="d-flex justify-content-between align-content-center mb-3">
                <div>
                    <Button variant="contained" onClick={handleShow}>
                        Thêm mới
                    </Button>
                </div>
            </div>

            <Box
                sx={{
                    width: '100%',
                    overflowX: 'auto', // Thêm thanh cuộn ngang
                    '& .MuiDataGrid-root': {
                        minWidth: '1000px', // Đảm bảo chiều rộng tối thiểu để kích hoạt cuộn ngang
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                    },
                }}
            >
                <DataGrid
                    rows={vouchers.map((voucher) => ({
                        id: voucher?.id,
                        code: voucher?.code,
                        discount: voucher?.discountAmount,
                        expDate: voucher?.expirationDate,
                        useCount: voucher?.maxUsage,
                        used: voucher?.currentUsage,
                        status: voucher?.status,
                    }))}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    autoHeight
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                />
            </Box>

            {/* <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vouchers.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.field];
                                        return (
                                            <TableCell key={column.field} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo mới voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialVoucherData}
                        validationSchema={validationVoucherDataSchema}
                        onSubmit={handleFrmSaveVoucherData}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <TextField
                                    fullWidth
                                    disabled
                                    autoComplete="off"
                                    type="text"
                                    size="small"
                                    name="code"
                                    label="Mã giảm giá"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    value={values.code}
                                    onChange={handleChange}
                                    helperText={touched.code && errors.code}
                                    error={Boolean(errors.code && touched.code)}
                                    sx={{ mb: 3 }}
                                />

                                <TextField
                                    fullWidth
                                    autoComplete="off"
                                    type="text"
                                    size="small"
                                    name="discountAmount"
                                    label="Số tiền giảm giá"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    value={formatCurrency(values.discountAmount)}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\D/g, '');

                                        handleChange({
                                            target: {
                                                name: 'discountAmount',
                                                value: rawValue,
                                            },
                                        });
                                    }}
                                    helperText={touched.discountAmount && errors.discountAmount}
                                    error={Boolean(errors.discountAmount && touched.discountAmount)}
                                    sx={{ mb: 3 }}
                                />

                                <TextField
                                    fullWidth
                                    autoComplete="off"
                                    type="text"
                                    size="small"
                                    name="description"
                                    label="Mô tả"
                                    variant="outlined"
                                    multiline
                                    onBlur={handleBlur}
                                    value={values.description}
                                    onChange={handleChange}
                                    helperText={touched.description && errors.description}
                                    error={Boolean(errors.description && touched.description)}
                                    sx={{ mb: 3 }}
                                />

                                <TextField
                                    fullWidth
                                    autoComplete="off"
                                    type="date"
                                    size="small"
                                    name="expirationDate"
                                    label="Thời hạn sử dụng"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    value={values.expirationDate}
                                    onChange={handleChange}
                                    helperText={touched.expirationDate && errors.expirationDate}
                                    error={Boolean(errors.expirationDate && touched.expirationDate)}
                                    sx={{ mb: 3 }}
                                />

                                <TextField
                                    fullWidth
                                    autoComplete="off"
                                    type="number"
                                    size="small"
                                    name="maxUsage"
                                    label="Số lượng sử dụng tối đa"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    value={values.maxUsage}
                                    onChange={handleChange}
                                    helperText={touched.maxUsage && errors.maxUsage}
                                    error={Boolean(errors.maxUsage && touched.maxUsage)}
                                    sx={{ mb: 3 }}
                                />

                                <Button variant="outlined" type="submit" disabled={errors === null}>
                                    <FontAwesomeIcon icon={faFloppyDisk} className="me-2" />
                                    Lưu
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
};

export default VouchersManager;
