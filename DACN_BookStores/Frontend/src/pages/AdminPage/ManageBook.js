import { Modal, Button, Row, Col, Form, Pagination } from 'react-bootstrap';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';
import { createBookService, deleteBookService, getBookPagingService, updateBookService } from '~/services/bookService';
import { getAllGenresService } from '~/services/genreService';
import { getAllAuthorsService } from '~/services/authorService';
import clsx from 'clsx';
import styles from './AdminPage.module.scss';
import moment from 'moment';
import customToastify from '~/utils/customToastify';
import axios from 'axios';
import bookImageDefault from '~/assets/imgs/book-default.jpg';
import { formatPrice } from '~/utils/commonUtils';
import StarRateIcon from '@mui/icons-material/StarRate';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Box,
    Autocomplete,
    FormHelperText,
    Select,
} from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { getAllPublisherService } from '~/services/publisherService';
import { setLoading } from '~/redux/slices/loadingSlide';

const CustomModal = ({ action, showModal, handleCloseModal, data, fetchGetBookPaging }) => {
    const dispatch = useDispatch();
    const [genres, setGenres] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [bookGenge, setBookGenre] = useState();
    const [authors, setAuthors] = useState([]);

    const formRef = useRef(null);
    const animatedComponents = makeAnimated();

    const [validated, setValidated] = useState(false);
    const [fileUpload, setFileUpload] = useState(null);
    const [bookInfo, setBookInfo] = useState({
        name: '',
        genres: '1',
        price: '',
        authors: [],
        description: '',
        publicationDate: new Date(),
        totalPageNumber: '',
        remaining: '',
        image: null,
        PublisherId: 1,
    });

    useEffect(() => {
        const fetchGetGenres = async () => {
            try {
                const res = await getAllGenresService();
                if (res.data) {
                    setGenres(
                        res.data?.map((genre) => ({
                            value: genre?.id,
                            label: genre?.name,
                        })),
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchGetPublisher = async () => {
            try {
                const res = await getAllPublisherService();
                if (res.data) {
                    setPublishers(
                        res.data?.map((publisher) => ({
                            value: publisher?.id,
                            label: publisher?.name,
                        })),
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchGetAuthors = async () => {
            try {
                const res = await getAllAuthorsService();
                if (res.data) {
                    setAuthors(
                        res.data?.map((author) => ({
                            value: author?.id,
                            label: author?.fullName,
                        })),
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGetAuthors();
        fetchGetPublisher();
        fetchGetGenres();
    }, []);

    useEffect(() => {
        if (action === 'update-book') {
            setBookInfo({
                name: data?.name,
                genres: data?.genres,
                price: data?.price,
                authors: data?.authors?.map((author) => ({
                    value: author?.id,
                    label: author?.fullName,
                })),
                publisherId: data?.publisherId,
                description: data?.description,
                publicationDate: data?.publicationDate,
                totalPageNumber: data?.totalPageNumber,
                remaining: data?.remaining,
                image: data?.image,
            });
        }
    }, [action, data]);

    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        setBookInfo({
            ...bookInfo,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileUpload(file);
            const reader = new FileReader();

            reader.onloadend = () => {
                setBookInfo({
                    ...bookInfo,
                    image: reader.result,
                });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleChangeGenge = (e) => {
        setBookGenre(e.target.value);
    };

    const handleSubmit = async () => {
        dispatch(setLoading(true));
        try {
            const form = formRef.current;
            if (form.checkValidity() === false) {
                setValidated(true);
            } else {
                let imgUrl;

                if (fileUpload) {
                    let formData = new FormData();

                    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_KEY);
                    formData.append('file', fileUpload);
                    formData.append('public_id', `file_${Date.now()}`);
                    formData.append('timestamp', (Date.now() / 1000) | 0);
                    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                    const res = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);
                    imgUrl = res.data?.secure_url;

                    setBookInfo({
                        ...bookInfo,
                        image: imgUrl,
                    });
                }
                if (action === 'update-book') {
                    await updateBookService({
                        id: data?.id,
                        title: bookInfo?.name,
                        description: bookInfo?.description,
                        image: fileUpload ? imgUrl : bookInfo?.image,
                        price: Number(bookInfo?.price),
                        totalPageNumber: Number(bookInfo?.totalPageNumber),
                        bookGroupId: Number(bookInfo?.genres),
                        publishedAt: bookInfo?.publicationDate,
                        publisherId: bookInfo.publisherId,
                        authorId: bookInfo?.authors?.map((author) => author?.value),
                    });
                    customToastify.success('Cập nhật thành công!');
                } else if (action === 'create-book') {
                    await createBookService({
                        title: bookInfo?.name,
                        description: bookInfo?.description,
                        image: imgUrl,
                        price: Number(bookInfo?.price),
                        totalPageNumber: Number(bookInfo?.totalPageNumber),
                        bookGroupId: Number(bookInfo?.genres),
                        publishedAt: bookInfo?.publicationDate,
                        publisherId: bookInfo.publisherId,
                        authorId: bookInfo?.authors?.map((author) => author?.value),
                    });

                    customToastify.success('Thêm mới thành công!');
                }

                fetchGetBookPaging();
            }
        } catch (error) {
            customToastify.error('Thêm mới thất bại!');
            console.log(error);
        } finally {
            handleCloseModal();
            dispatch(setLoading(false));
        }
    };

    return (
        <Dialog open={showModal} onClose={handleCloseModal} fullWidth maxWidth="md">
            <DialogTitle>
                <Typography variant="h5" textAlign="center">
                    {action === 'create-book' ? 'Thêm sách' : 'Sửa sách'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box component="form" noValidate>
                    <Form ref={formRef} noValidate validated={validated}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Tên sách"
                                name="name"
                                value={bookInfo.name}
                                onChange={handleChangeForm}
                                required
                                inputProps={{ minLength: 3 }}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={authors}
                                getOptionLabel={(option) => option?.label}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField {...params} label="Chọn tác giả" placeholder="Tác giả" />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-helper-label">Thể loại</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                name="genres"
                                id="demo-simple-select-helper"
                                value={bookInfo.genres}
                                label="Thể loại"
                                onChange={handleChangeForm}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {genres.map((e, i) => (
                                    <MenuItem key={`genre-${i}`} value={e.value}>
                                        <em>{e.label}</em>
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* <FormHelperText>With label + helper text</FormHelperText> */}
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-helper-label">Nhà xuất bản</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="publisherId"
                                value={bookInfo.publisherId}
                                label="Nhà xuất bản"
                                onChange={handleChangeForm}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {publishers.map((e, i) => (
                                    <MenuItem key={`genre-${i}`} value={e.value}>
                                        <em>{e.label}</em>
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* <FormHelperText>With label + helper text</FormHelperText> */}
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Giá"
                                name="price"
                                type="number"
                                value={bookInfo.price}
                                onChange={handleChangeForm}
                                required
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Mô tả"
                                name="description"
                                multiline
                                rows={3}
                                value={bookInfo.description}
                                onChange={handleChangeForm}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <Typography variant="body1">Ngày xuất bản</Typography>
                            <DatePicker
                                fullWidth
                                selected={bookInfo.publicationDate}
                                onChange={(date) =>
                                    handleChangeForm({
                                        target: { name: 'publicationDate', value: date },
                                    })
                                }
                                dateFormat="dd/MM/yyyy"
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Tổng số trang"
                                name="totalPageNumber"
                                type="number"
                                value={bookInfo.totalPageNumber}
                                onChange={handleChangeForm}
                                required
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <Typography variant="body1">Ảnh bìa</Typography>
                            <TextField type="file" name="image" onChange={handleFileChange} />
                            {bookInfo?.image && (
                                <Box mt={2} textAlign="center">
                                    <img
                                        src={bookInfo.image}
                                        alt="Uploaded Preview"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </Box>
                            )}
                        </FormControl>
                    </Form>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button className="text-danger" onClick={handleCloseModal} color="danger" variant="outlined">
                    Đóng
                </Button>
                <Button className="text-primary" onClick={handleSubmit} color="primary" variant="contained">
                    Lưu thay đổi
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ManageBook = () => {
    const dispatch = useDispatch();

    const [bookList, setBookList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 5;
    const [filterByName, setFilterByName] = useState('');

    const fetchGetBookPaging = async () => {
        try {
            const res = await getBookPagingService({
                pageNumber: currentPage,
                pageSize: pageSize,
                sortBy: 'publishedAt',
                filter: filterByName,
            });
            setTotalPage(res.data?.totalPage);
            setBookList(
                res?.data?.datas?.map((book) => {
                    return {
                        id: book?.id,
                        name: book?.title,
                        genres: book?.bookGroupId,
                        genresName: book?.bookGroupName,
                        price: book?.price,
                        description: book?.description,
                        publicationDate: book?.publishedAt,
                        totalPageNumber: book?.totalPageNumber,
                        rated: book?.rate,
                        remaining: book?.remaining,
                        image: book?.image,
                        authors: book?.author,
                    };
                }),
            );
        } catch (error) {
            console.log(error);
        } finally {
            //
        }
    };

    useEffect(() => {
        fetchGetBookPaging();
    }, [currentPage]);

    const handleChangePage = (i) => {
        setCurrentPage(i);
    };

    // Create book
    const [showModalAddBook, setShowModalAddBook] = useState(false);
    const handleCloseModalAddBook = () => {
        setShowModalAddBook(false);
    };
    const handleShowModalAddBook = () => setShowModalAddBook(true);

    // Update book
    const [currentBookUpdate, setCurrentBookUpdate] = useState(null);
    const [showModalUpdateBook, setShowModalUpdateBook] = useState(false);
    const handleCloseModalUpdateBook = () => {
        setShowModalUpdateBook(false);
    };
    const handleShowModalUpdateBook = (bookId) => {
        setCurrentBookUpdate(bookList.find((x) => x?.id === bookId));
        setShowModalUpdateBook(true);
    };

    // Delete book
    const [showModalDeleteBook, setShowModalDeleteBook] = useState(false);
    const [bookInfoDelete, setBookInfoDelete] = useState({
        id: '',
        name: '',
    });
    const handleShowModalDeleteBook = (bookId, bookName) => {
        setShowModalDeleteBook(true);
        setBookInfoDelete({
            id: bookId,
            name: bookName,
        });
    };
    const handleCloseModalDeleteBook = () => setShowModalDeleteBook(false);
    const handleDeleteBook = async (bookId) => {
        try {
            await deleteBookService(bookId);
            fetchGetBookPaging();
            customToastify.success('Xoá sách thành công');
        } catch (error) {
            console.log(error);
        } finally {
            setShowModalDeleteBook(false);
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            fetchGetBookPaging();
        }
    };

    return (
        <div id="manage-books">
            <div>
                <h3 className="my-3">Quản lý sách</h3>
                <hr />
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2 gap-2">
                <div>
                    <input
                        className="fz-16 form-control"
                        placeholder="Tìm kiếm theo tên sách"
                        onChange={(e) => setFilterByName(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>
                <button className="btn btn-primary fz-16" onClick={handleShowModalAddBook}>
                    Thêm sách
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center text-nowrap">Thông tin sách</th>
                            <th className="text-center text-nowrap">Mô tả</th>
                            <th className="text-center text-nowrap">Ngày xuất bản</th>
                            <th className="text-center text-nowrap">Tác giả</th>
                            <th className="text-center text-nowrap"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList?.map((book) => {
                            return (
                                <tr key={`book-${book?.id}`}>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <div className="img-item text-center">
                                                <img
                                                    src={book?.image || bookImageDefault}
                                                    alt="The Great Gatsby"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = bookImageDefault;
                                                    }}
                                                />
                                            </div>
                                            <div className="info">
                                                <div className="name fw-bold text-nowrap mx-auto">{book?.name}</div>
                                                <div className="text-secondary">{book?.genresName}</div>
                                                <div className="price text-danger fw-bold">
                                                    {formatPrice(book?.price, 'VND')}{' '}
                                                </div>
                                                <div>
                                                    {book?.rated} <StarRateIcon className="text-warning" />
                                                </div>
                                                <div>
                                                    Tổng số trang:{' '}
                                                    <span className="fw-bold">{book?.totalPageNumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="desc">{book?.description}</div>
                                    </td>
                                    <td className="text-center">
                                        {moment(book?.publicationDate).format('DD/MM/YYYY')}
                                    </td>

                                    <td className="text-center">
                                        {book?.authors?.map((author) => author?.fullName).join(', ')}
                                    </td>
                                    <td className="text-center text-nowrap">
                                        <Button
                                            className="fz-16 me-3"
                                            variant="warning"
                                            onClick={() => handleShowModalUpdateBook(book?.id)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            className="fz-16 "
                                            variant="danger"
                                            onClick={() => handleShowModalDeleteBook(book?.id, book?.name)}
                                        >
                                            Xoá
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
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
            {showModalAddBook && (
                <CustomModal
                    action="create-book"
                    showModal={showModalAddBook}
                    handleCloseModal={handleCloseModalAddBook}
                    fetchGetBookPaging={fetchGetBookPaging}
                />
            )}
            {showModalUpdateBook && (
                <CustomModal
                    action="update-book"
                    showModal={showModalUpdateBook}
                    handleCloseModal={handleCloseModalUpdateBook}
                    fetchGetBookPaging={fetchGetBookPaging}
                    data={currentBookUpdate}
                />
            )}
            <Modal show={showModalDeleteBook} onHide={handleCloseModalDeleteBook}>
                <Modal.Header className="fz-16" closeButton>
                    <Modal.Title style={{ fontSize: '2.6rem' }}>Xoá sác</Modal.Title>
                </Modal.Header>
                <Modal.Body className="fz-16">Bạn có chắc muốn xoá sách {bookInfoDelete?.name}</Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalDeleteBook}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={() => handleDeleteBook(bookInfoDelete?.id)}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageBook;
