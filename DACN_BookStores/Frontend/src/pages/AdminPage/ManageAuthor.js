import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Modal, Pagination, Form, Col, Row } from 'react-bootstrap';
import {
    createAuthorService,
    deleteAuthorService,
    getAuthorPagingService,
    updateAuthorService,
} from '~/services/authorService';
import styles from './AdminPage.module.scss';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLoading } from '~/redux/slices/loadingSlide';
import customToastify from '~/utils/customToastify';
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ManageAuthor = () => {
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 10;

    const fetchGetAuthors = async () => {
        try {
            const res = await getAuthorPagingService({ pageNumber: currentPage, pageSize: pageSize });
            setTotalPage(res?.data?.totalPage);
            setAuthors(
                res?.data?.datas?.map((author) => ({
                    id: author?.id,
                    name: author?.fullName,
                })),
            );
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    useEffect(() => {
        fetchGetAuthors();
    }, [currentPage]);

    const handleChangePage = (i) => {
        setCurrentPage(i);
    };

    // Add author
    const [showModalAddAuthor, setShowModalAddAuthor] = useState(false);
    const handleCloseModalAddAuthor = () => setShowModalAddAuthor(false);
    const handleShowModalAddAuthor = () => setShowModalAddAuthor(true);

    // Update author
    const [showModalUpdateAuthor, setShowModalUpdateAuthor] = useState(false);
    const handleCloseModalUpdateAuthor = () => setShowModalUpdateAuthor(false);
    const handleShowModalUpdateAuthor = (id, name) => {
        setAuthorUpdateInfo({
            id,
            fullName: name,
        });
        setShowModalUpdateAuthor(true);
    };

    const [authorUpdateInfo, setAuthorUpdateInfo] = useState({
        id: '',
        fullName: '',
    });

    const handleSubmitUpdateAuthor = async () => {
        try {
            setSpinning(true);
            await updateAuthorService(authorUpdateInfo);
            fetchGetAuthors();
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModalUpdateAuthor();
            setSpinning(false);
        }
    };

    // Delete author
    const [showModalDeleteAuthor, setShowModalDeleteAuthor] = useState(false);
    const [authorInfoDelete, setAuthorInfoDelete] = useState({
        id: '',
        name: '',
    });
    const handleShowModalDeleteAuthor = (authorId, authorName) => {
        setShowModalDeleteAuthor(true);
        setAuthorInfoDelete({
            id: authorId,
            name: authorName,
        });
    };
    const handleCloseModalDeleteAuthor = () => setShowModalDeleteAuthor(false);
    const handleDeleteAuthor = async () => {
        dispatch(setLoading(true));
        try {
            await deleteAuthorService(authorInfoDelete?.id);
            customToastify.success('Xóa thành công!');
            fetchGetAuthors();
        } catch (error) {
            console.log(error);
            customToastify.success('Xóa thất bại!');
        } finally {
            setShowModalDeleteAuthor(false);
            dispatch(setLoading(false));
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.2,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'name',
            headerName: 'Tên tác giả',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'actions',
            headerName: '',
            flex: 0.2,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <>
                    <Button
                        variant="text"
                        color="warning"
                        style={{ marginRight: 8 }}
                        onClick={() => handleShowModalUpdateAuthor(params.row.id, params.row.name)}
                    >
                        <EditOutlinedIcon />
                    </Button>
                    <Button
                        variant="text"
                        color="error"
                        onClick={() => handleShowModalDeleteAuthor(params.row.id, params.row.name)}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </Button>
                </>
            ),
            sortable: false,
        },
    ];

    return (
        <div id="manage-authors">
            <div className="text-end">
                <button className="btn btn-primary fz-16 mb-3" onClick={handleShowModalAddAuthor}>
                    Thêm tác giả
                </button>
            </div>

            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={authors.map((author) => ({ id: author.id, name: author.name }))}
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

            <Pagination className="d-flex justify-content-center">
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

            <Dialog
                open={showModalAddAuthor}
                onClose={handleCloseModalAddAuthor}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        dispatch(setLoading(true));
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const authorname = formJson.authorname;

                        try {
                            await createAuthorService({
                                fullName: authorname,
                            });

                            customToastify.success('Thêm mới tác giả thành công!');
                        } catch {
                            customToastify.success('Thêm mới tác giả thất bại!');
                            console.error('Có lỗi xảy ra');
                        } finally {
                            dispatch(setLoading(false));
                            handleCloseModalAddAuthor();
                        }
                    },
                }}
            >
                <DialogTitle>Thêm mới tác giả</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="authorname"
                        name="authorname"
                        label="Tác giả"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className="text-danger"
                        color="danger"
                        variant="outlined"
                        onClick={handleCloseModalAddAuthor}
                    >
                        Hủy
                    </Button>
                    <Button className="text-primary" color="primary" variant="outlined" type="submit">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showModalUpdateAuthor}
                onClose={handleCloseModalUpdateAuthor}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        dispatch(setLoading(true));

                        try {
                            await updateAuthorService(authorUpdateInfo);
                            customToastify.success('Cập nhật tác giả thành công!');
                            fetchGetAuthors();
                        } catch (error) {
                            customToastify.error('Cập nhật tác giả thất bại!');
                            console.error('Có lỗi xảy ra:', error);
                        } finally {
                            dispatch(setLoading(false));
                            handleCloseModalUpdateAuthor();
                        }
                    },
                }}
            >
                <DialogTitle>Cập nhật tác giả</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="authorname"
                        name="authorname"
                        label="Tên tác giả"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={authorUpdateInfo?.fullName}
                        onChange={(e) =>
                            setAuthorUpdateInfo({
                                ...authorUpdateInfo,
                                fullName: e.target.value,
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className="text-danger"
                        color="danger"
                        variant="outlined"
                        onClick={handleCloseModalUpdateAuthor}
                    >
                        Hủy
                    </Button>
                    <Button className="text-primary" color="primary" variant="outlined" type="submit">
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showModalDeleteAuthor}
                onClose={handleCloseModalDeleteAuthor}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Xóa tác giả?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc muốn xoá tác giả {authorInfoDelete?.name}.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModalDeleteAuthor}>Hủy</Button>
                    <Button onClick={handleDeleteAuthor} autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageAuthor;
