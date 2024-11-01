import { Modal, Button, Row, Col, Form, Pagination } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
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

const CustomModal = ({ action, showModal, handleCloseModal, data, fetchGetBookPaging, setSpinning }) => {
    const [genres, setGenres] = useState([]);
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

        fetchGetGenres();
    }, []);

    const [authors, setAuthors] = useState([]);
    useEffect(() => {
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
    }, []);

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
    });

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

    const handleSubmit = async () => {
        try {
            const form = formRef.current;
            if (form.checkValidity() === false) {
                setValidated(true);
            } else {
                let imgUrl;
                setSpinning(true);

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
                        authorId: bookInfo?.authors?.map((author) => author?.value),
                    });
                } else if (action === 'create-book') {
                    await createBookService({
                        title: bookInfo?.name,
                        description: bookInfo?.description,
                        image: imgUrl,
                        price: Number(bookInfo?.price),
                        totalPageNumber: Number(bookInfo?.totalPageNumber),
                        bookGroupId: Number(bookInfo?.genres),
                        publishedAt: bookInfo?.publicationDate,
                        authorId: bookInfo?.authors?.map((author) => author?.value),
                    });
                }
                fetchGetBookPaging();
            }
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModal();
            setSpinning(false);
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header style={{ fontSize: '1.6rem' }} closeButton>
                <Modal.Title style={{ fontSize: '2.6rem' }}>
                    {action === 'create-book' ? 'Thêm sách' : 'Sửa sách'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef} noValidate validated={validated}>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Tên sách
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                name="name"
                                value={bookInfo.name}
                                onChange={handleChangeForm}
                                minLength={3}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Tác giả
                        </Form.Label>
                        <Col sm="10" className="fz-16">
                            <Select
                                value={bookInfo?.authors}
                                components={animatedComponents}
                                options={authors}
                                isMulti={true}
                                closeMenuOnSelect={false}
                                required
                                onChange={(e) =>
                                    handleChangeForm({
                                        target: {
                                            name: 'authors',
                                            value: e.map((item) => ({
                                                value: item.value,
                                                label: item.label,
                                            })),
                                        },
                                    })
                                }
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Thể loại
                        </Form.Label>
                        <Col sm="10" className="fz-16">
                            <Form.Select name="genres" value={`${bookInfo?.genres}`} onChange={handleChangeForm}>
                                {genres.map((genre) => {
                                    return (
                                        <option value={genre?.value} key={`genre-${genre?.value}`}>
                                            {genre?.label}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Giá
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                name="price"
                                type="number"
                                value={bookInfo.price}
                                onChange={handleChangeForm}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 ">
                        <Form.Label column sm="2">
                            Mô tả
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={bookInfo.description}
                                onChange={handleChangeForm}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Ngày xuất bản
                        </Form.Label>
                        <Col sm="10">
                            <DatePicker
                                className="fz-16"
                                dateFormat="dd/MM/yyyy"
                                selected={bookInfo.publicationDate}
                                onChange={(date) =>
                                    handleChangeForm({
                                        target: {
                                            name: 'publicationDate',
                                            value: date,
                                        },
                                    })
                                }
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column sm="2">
                            Tổng số trang
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                name="totalPageNumber"
                                value={bookInfo.totalPageNumber}
                                onChange={handleChangeForm}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Ảnh bìa
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="file" name="image" onChange={handleFileChange} />
                            {bookInfo?.image && (
                                <div>
                                    <img
                                        src={bookInfo?.image}
                                        alt="Uploaded Preview"
                                        style={{
                                            width: '39rem',
                                            height: 'auto',
                                            marginTop: '1.6rem',
                                        }}
                                    />
                                </div>
                            )}
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="fz-16" variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button className="fz-16" variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const ManageBook = ({ setSpinning }) => {
    const [loading, setLoading] = useState(false);

    const [bookList, setBookList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 5;
    const [filterByName, setFilterByName] = useState('');

    const fetchGetBookPaging = async () => {
        try {
            setLoading(true);
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
            setLoading(false);
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
            setSpinning(true);
            await deleteBookService(bookId);
            fetchGetBookPaging();
            customToastify.success('Xoá sách thành công');
        } catch (error) {
            console.log(error);
        } finally {
            setShowModalDeleteBook(false);
            setSpinning(false);
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            fetchGetBookPaging();
        }
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <div style={{ width: '30%' }}>
                    <input
                        className="fz-16 form-control"
                        placeholder="Tìm kiếm theo tên sách"
                        onChange={(e) => setFilterByName(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>
                <button className="btn btn-primary fz-16 mb-3" onClick={handleShowModalAddBook}>
                    Thêm sách
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Genres</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Publication Date</th>
                        <th>Total Page Number</th>
                        <th>Rated</th>
                        <th>Authors</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookList?.map((book) => {
                        return (
                            <tr key={`book-${book?.id}`}>
                                <td>{book?.name}</td>
                                <td>{book?.genresName}</td>
                                <td>{book?.price}</td>
                                <td>{book?.description}</td>
                                <td>{moment(book?.publicationDate).format('DD/MM/YYYY')}</td>
                                <td>{book?.totalPageNumber}</td>
                                <td>{book?.rated}</td>
                                <td>{book?.authors?.map((author) => author?.fullName).join(', ')}</td>
                                <td>
                                    <img
                                        src={book?.image || bookImageDefault}
                                        alt="The Great Gatsby"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = bookImageDefault;
                                        }}
                                    />
                                </td>
                                <td>
                                    <Button
                                        className="fz-16 me-3"
                                        variant="warning"
                                        onClick={() => handleShowModalUpdateBook(book?.id)}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        className="fz-16 mt-3"
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
                    setSpinning={setSpinning}
                />
            )}
            {showModalUpdateBook && (
                <CustomModal
                    action="update-book"
                    showModal={showModalUpdateBook}
                    handleCloseModal={handleCloseModalUpdateBook}
                    fetchGetBookPaging={fetchGetBookPaging}
                    data={currentBookUpdate}
                    setSpinning={setSpinning}
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
        </>
    );
};

export default ManageBook;
