import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Button, Modal, Pagination, Form, Col, Row } from 'react-bootstrap';
import {
    createAuthorService,
    deleteAuthorService,
    getAuthorPagingService,
    updateAuthorService,
} from '~/services/authorService';
import styles from './AdminPage.module.scss';

const ManageAuthor = ({ setSpinning }) => {
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);

    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 10;

    const fetchGetAuthors = async () => {
        try {
            setLoading(true);
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
            setLoading(false);
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

    const [authorAddInfo, setAuthorAddInfo] = useState({
        fullName: '',
    });

    const handleSubmitAddAuthor = async () => {
        try {
            setSpinning(true);
            await createAuthorService(authorAddInfo);
            fetchGetAuthors();
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModalAddAuthor();
            setSpinning(false);
        }
    };

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
        try {
            setSpinning(true);
            await deleteAuthorService(authorInfoDelete?.id);
            fetchGetAuthors();
        } catch (error) {
            console.log(error);
        } finally {
            setShowModalDeleteAuthor(false);
            setSpinning(false);
        }
    };

    return (
        <div id="manage-authors">
            <div className='text-end'>
                <button className="btn btn-primary fz-16 mb-3" onClick={handleShowModalAddAuthor}>
                    Thêm tác giả
                </button>
            </div>
            <div className="table-responsive d-flex justify-content-center">
                <table className="table w-100 table-bordered">
                    <thead>
                        <tr>
                            <th className='text-center'>Tên tác giả</th>
                            <th className='text-center'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors?.map((author) => {
                            return (
                                <tr key={`author-${author?.id}`}>
                                    <td>{author?.name}</td>
                                    <td className='text-center'>
                                        <Button
                                            className="fz-16 me-3"
                                            variant="warning"
                                            onClick={() => handleShowModalUpdateAuthor(author?.id, author?.name)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            className="fz-16"
                                            variant="danger"
                                            onClick={() => handleShowModalDeleteAuthor(author?.id, author?.name)}
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
            <Modal show={showModalAddAuthor} onHide={handleCloseModalAddAuthor}>
                <Modal.Header>
                    <Modal.Title>Thêm tác giả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">
                                Tên
                            </Form.Label>
                            <Col sm="11">
                                <Form.Control
                                    value={authorAddInfo?.fullName}
                                    onChange={(e) =>
                                        setAuthorAddInfo({
                                            ...authorAddInfo,
                                            fullName: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalAddAuthor}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={handleSubmitAddAuthor}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalUpdateAuthor} onHide={handleCloseModalUpdateAuthor}>
                <Modal.Header>
                    <Modal.Title>Sửa tác giả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">
                                Tên
                            </Form.Label>
                            <Col sm="11">
                                <Form.Control
                                    value={authorUpdateInfo?.fullName}
                                    onChange={(e) =>
                                        setAuthorUpdateInfo({
                                            ...authorUpdateInfo,
                                            fullName: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalUpdateAuthor}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={handleSubmitUpdateAuthor}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalDeleteAuthor} onHide={handleCloseModalDeleteAuthor}>
                <Modal.Header>
                    <Modal.Title>Xoá tác giả</Modal.Title>
                </Modal.Header>
                <Modal.Body className="fz-16">Bạn có chắc muốn xoá tác giả {authorInfoDelete?.name}</Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalDeleteAuthor}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={handleDeleteAuthor}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageAuthor;
