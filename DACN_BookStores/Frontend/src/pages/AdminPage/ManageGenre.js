import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Modal, Pagination, Form, Col, Row } from 'react-bootstrap';
import {
    createGenreService,
    deleteGenreService,
    getGenrePagingService,
    updateGenreService,
} from '~/services/genreService';
import styles from './AdminPage.module.scss';
import { useDispatch } from 'react-redux';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { setLoading } from '~/redux/slices/loadingSlide';
import customToastify from '~/utils/customToastify';
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ManageGenre = ({ setSpinning }) => {
    const dispatch = useDispatch();
    const [genres, setGenres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 10;

    const fetchGetGenres = async () => {
        try {
            dispatch(setLoading(true));
            const res = await getGenrePagingService({ pageNumber: currentPage, pageSize: pageSize });
            setTotalPage(res?.data?.totalPage);
            setGenres(
                res?.data?.datas?.map((genre) => ({
                    id: genre?.id,
                    name: genre?.name,
                })),
            );
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchGetGenres();
    }, [currentPage]);

    const handleChangePage = (i) => {
        setCurrentPage(i);
    };

    // Add genre
    const [showModalAddGenre, setShowModalAddGenre] = useState(false);
    const handleCloseModalAddGenre = () => setShowModalAddGenre(false);
    const handleShowModalAddGenre = () => setShowModalAddGenre(true);

    // Update genre
    const [showModalUpdateGenre, setShowModalUpdateGenre] = useState(false);
    const handleCloseModalUpdateGenre = () => setShowModalUpdateGenre(false);
    const handleShowModalUpdateGenre = (id, name) => {
        setGenreUpdateInfo({
            id,
            name: name,
        });
        setShowModalUpdateGenre(true);
    };

    const [genreUpdateInfo, setGenreUpdateInfo] = useState({
        id: '',
        name: '',
    });

    const handleSubmitUpdateGenre = async () => {
        try {
            await updateGenreService(genreUpdateInfo);
            fetchGetGenres();
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModalUpdateGenre();
        }
    };

    // Delete genre
    const [showModalDeleteGenre, setShowModalDeleteGenre] = useState(false);
    const [genreInfoDelete, setGenreInfoDelete] = useState({
        id: '',
        name: '',
    });
    const handleShowModalDeleteGenre = (genreId, genreName) => {
        setShowModalDeleteGenre(true);
        setGenreInfoDelete({
            id: genreId,
            name: genreName,
        });
    };
    const handleCloseModalDeleteGenre = () => setShowModalDeleteGenre(false);
    const handleDeleteGenre = async () => {
        try {
            await deleteGenreService(genreInfoDelete?.id);
            fetchGetGenres();
        } catch (error) {
            console.log(error);
        } finally {
            setShowModalDeleteGenre(false);
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
            headerName: 'Tên thể loại',
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
                        onClick={() => handleShowModalUpdateGenre(params.row.id, params.row.name)}
                    >
                        <EditOutlinedIcon />
                    </Button>
                    <Button
                        variant="text"
                        color="error"
                        onClick={() => handleShowModalDeleteGenre(params.row.id, params.row.name)}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </Button>
                </>
            ),
            sortable: false,
        },
    ];

    return (
        <div id="manage-genres">
            <div className="text-end mb-3">
                <button className="btn btn-primary fz-16" onClick={handleShowModalAddGenre}>
                    Thêm thể loại
                </button>
            </div>

            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={genres.map((g) => ({ id: g.id, name: g.name }))}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    autoHeight
                    checkboxSelection
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                />
            </Box>

            <Pagination className="d-flex justify-content-center mt-3">
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
                open={showModalAddGenre}
                onClose={handleCloseModalAddGenre}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        dispatch(setLoading(true));
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const genrename = formJson.genrename;

                        try {
                            await createGenreService({
                                name: genrename,
                            });

                            customToastify.success('Thêm mới thể loại thành công!');
                        } catch {
                            customToastify.success('Thêm mới thể loại thất bại!');
                            console.error('Có lỗi xảy ra');
                        } finally {
                            dispatch(setLoading(false));
                            handleCloseModalAddGenre();
                        }
                    },
                }}
            >
                <DialogTitle>Thêm mới thể loại</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="genrename"
                        name="genrename"
                        label="Thể loại"
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
                        onClick={handleCloseModalAddGenre}
                    >
                        Hủy
                    </Button>
                    <Button className="text-primary" color="primary" variant="outlined" type="submit">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showModalUpdateGenre}
                onClose={handleCloseModalUpdateGenre}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        dispatch(setLoading(true));

                        try {
                            await updateGenreService(genreUpdateInfo);
                            customToastify.success('Cập nhật thể loại thành công!');
                            fetchGetGenres();
                        } catch (error) {
                            customToastify.error('Cập nhật thể loại thất bại!');
                            console.error('Có lỗi xảy ra:', error);
                        } finally {
                            dispatch(setLoading(false));
                            handleCloseModalUpdateGenre();
                        }
                    },
                }}
            >
                <DialogTitle>Cập nhật thể loại</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="genrename"
                        name="genrename"
                        label="Tên thể loại"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={genreUpdateInfo?.name}
                        onChange={(e) =>
                            setGenreUpdateInfo({
                                ...genreUpdateInfo,
                                name: e.target.value,
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        className="text-danger"
                        color="danger"
                        variant="outlined"
                        onClick={handleCloseModalUpdateGenre}
                    >
                        Hủy
                    </Button>
                    <Button className="text-primary" color="primary" variant="outlined" type="submit">
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>

            <Modal show={showModalDeleteGenre} onHide={handleCloseModalDeleteGenre}>
                <Modal.Header>
                    <Modal.Title>Xoá thể loại</Modal.Title>
                </Modal.Header>
                <Modal.Body className="fz-16">Bạn có chắc muốn xoá thể loại {genreInfoDelete?.name}</Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalDeleteGenre}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={handleDeleteGenre}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageGenre;
