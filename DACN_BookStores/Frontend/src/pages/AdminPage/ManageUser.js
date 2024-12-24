import { Col, Modal, Pagination, Form, Row } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { CSVLink } from 'react-csv';
import { getAllUsersService, userCreateByAdminService } from '~/services/userServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import './StyleManage.css';
import { useDispatch } from 'react-redux';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Slide,
    Stack,
    TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Breadcrumb from '~/containers/BreadCrumb';
import { setLoading } from '~/redux/slices/loadingSlide';
import customToastify from '~/utils/customToastify';
// import './StyleManage.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ManageUser = () => {
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const headersExportUser = [
        { label: 'Username', key: 'username' },
        { label: 'Email', key: 'email' },
        { label: 'Address', key: 'address' },
        { label: 'Phone number', key: 'phoneNumber' },
    ];
    const [userList, setUserList] = useState([]);
    const [currentPageUser, setCurrentPageUser] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 10;
    const [searchUserKeyword, setSearchUserKeyword] = useState('');
    const [showModalAddUser, setShowModalAddUser] = useState(false);
    const handleCloseModalAddUser = () => setShowModalAddUser(false);
    const handleShowModalAddUser = () => setShowModalAddUser(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [openDialogDetail, setOpenDialogDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const fetchGetAllUsers = async () => {
        try {
            const res = await getAllUsersService({
                pageNumber: currentPageUser,
                pageSize: pageSize,
                filter: searchUserKeyword,
            });
            setTotalPage(res?.data?.totalPage || 0);
            setUserList(
                res?.data?.datas?.map((user) => {
                    return {
                        id: user?.id,
                        username: user?.userName,
                        email: user?.email,
                        address: user?.address,
                        phoneNumber: user?.phoneNumber,
                    };
                }),
            );
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    const handleSearchUser = () => {
        fetchGetAllUsers();
    };

    useEffect(() => {
        fetchGetAllUsers();
    }, [currentPageUser]);

    const handleChangePage = (i) => {
        setCurrentPageUser(i);
    };

    const columns = [
        { field: 'id', headerName: 'Id', flex: 0.5 },
        { field: 'username', headerName: 'Họ và tên', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'address', headerName: 'Địa chỉ', flex: 1 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 1, align: 'center' },
    ];

    const rows = userList?.map((user, index) => ({
        ...user,
    }));

    const handleRowDoubleClick = (params) => {
        setSelectedRow(params.row); // Lấy dữ liệu của dòng được double click
        setOpenDialogDetail(true); // Mở modal
    };

    const handleCloseDialogDetail = () => {
        setOpenDialogDetail(false);
        setSelectedRow(null);
    };

    return (
        <div id="manage-users">
            <div className="my-3">
                <h3>Danh sách người dùng</h3>
                <hr />
            </div>

            <div className="d-flex justify-content-between flex-wrap mb-2 gap-2">
                <div className="d-flex align-items-center search-user-input flex-wrap mb-2 gap-2">
                    <div>
                        <input
                            value={searchUserKeyword}
                            type="search"
                            className="fz-16 form-control"
                            placeholder="Tìm kiếm theo email/số điện thoại"
                            onChange={(e) => setSearchUserKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearchUser();
                                }
                            }}
                        />
                    </div>
                    <Button
                        variant="primary"
                        className="fz-16"
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={handleSearchUser}
                    >
                        Tìm kiếm
                    </Button>
                </div>
                <div>
                    <button className="btn btn-primary fz-16 me-4" onClick={handleShowModalAddUser}>
                        Tạo mới
                    </button>
                    <CSVLink data={userList} headers={headersExportUser} filename="Users-Sale-Book.csv" separator=";">
                        <button className="btn btn-success fz-16">Xuất file excel</button>
                    </CSVLink>
                </div>
            </div>

            <Box sx={{ width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <DataGrid
                        columns={columns}
                        pageSize={pageSize}
                        rows={rows || []}
                        disableSelectionOnClick
                        pagination={false}
                        localeText={{
                            noRowsLabel: 'Không có người dùng nào',
                        }}
                        onRowDoubleClick={handleRowDoubleClick}
                    />
                </div>

                <Dialog open={openDialogDetail} onClose={handleCloseDialogDetail}>
                    <DialogTitle>Thông tin người dùng</DialogTitle>
                    <DialogContent>
                        {selectedRow && (
                            <>
                                <TextField
                                    margin="dense"
                                    label="Tên"
                                    type="text"
                                    fullWidth
                                    value={selectedRow.name}
                                    onChange={(e) =>
                                        setSelectedRow((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                />
                                <TextField
                                    margin="dense"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    value={selectedRow.email}
                                    onChange={(e) =>
                                        setSelectedRow((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialogDetail}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Pagination className="d-flex justify-content-center my-2">
                {Array.from({ length: totalPage }, (_, i) => (i = i + 1))?.map((i) => {
                    return (
                        <Pagination.Item
                            key={i}
                            className="page-number"
                            active={i === currentPageUser}
                            onClick={() => handleChangePage(i)}
                        >
                            {i}
                        </Pagination.Item>
                    );
                })}
            </Pagination>

            <Dialog
                open={showModalAddUser}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseModalAddUser}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    component: 'form',
                    sx: { minWidth: 400 },
                    onSubmit: async (event) => {
                        dispatch(setLoading(true));
                        event.preventDefault();

                        try {
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());

                            const email = formJson.email;
                            const username = formJson.username_add;
                            const password = formJson.password;
                            const address = formJson.address;
                            const phoneNumber = formJson.phoneNumber;
                            const role = formJson.role;

                            await userCreateByAdminService({
                                userName: username,
                                email: email,
                                password: password,
                                role: role,
                                address: address,
                                phoneNumber: phoneNumber,
                            });

                            customToastify.success('Thêm mới người dùng thành công!');
                        } catch (error) {
                            console.error(error);
                        } finally {
                            handleCloseModalAddUser();
                            fetchGetAllUsers();
                            dispatch(setLoading(false));
                        }
                    },
                }}
            >
                <DialogTitle>Thêm Người Dùng Mới</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                required
                                autoComplete="off"
                                fullWidth
                                className="mt-3"
                                id="username_add"
                                name="username_add"
                                label="Tên người dùng"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Địa chỉ Email"
                                type="email"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={(e) => e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Mật khẩu"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="address"
                                name="address"
                                label="Địa chỉ"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Số điện thoại"
                                type="tel"
                                inputProps={{ maxLength: 10 }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="role-label">Vai trò</InputLabel>
                                <Select labelId="role-label" name="role" defaultValue="User" label="Vai trò">
                                    <MenuItem value="User">Khách hàng</MenuItem>
                                    <MenuItem value="Admin">Quản trị</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ pt: 2 }}>
                    <Button variant="outlined" color="error" onClick={handleCloseModalAddUser}>
                        Hủy
                    </Button>
                    <Button type="contained" variant="contained" color="primary">
                        Thêm mới
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageUser;
