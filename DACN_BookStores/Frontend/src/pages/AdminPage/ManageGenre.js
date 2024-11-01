import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Button, Modal, Pagination, Form, Col, Row } from 'react-bootstrap';
import {
    createGenreService,
    deleteGenreService,
    getGenrePagingService,
    updateGenreService,
} from '~/services/genreService';
import styles from './AdminPage.module.scss';

const ManageGenre = ({ setSpinning }) => {
    const [loading, setLoading] = useState(false);

    const [genres, setGenres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 10;

    const fetchGetGenres = async () => {
        try {
            setLoading(true);
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
            setLoading(false);
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

    const [genreAddInfo, setGenreAddInfo] = useState({
        name: '',
    });

    const handleSubmitAddGenre = async () => {
        try {
            setSpinning(true);
            await createGenreService(genreAddInfo);
            fetchGetGenres();
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModalAddGenre();
            setSpinning(false);
        }
    };

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
            setSpinning(true);

            await updateGenreService(genreUpdateInfo);
            fetchGetGenres();
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModalUpdateGenre();
            setSpinning(false);
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
            setSpinning(true);

            await deleteGenreService(genreInfoDelete?.id);
            fetchGetGenres();
        } catch (error) {
            console.log(error);
        } finally {
            setShowModalDeleteGenre(false);
            setSpinning(false);
        }
    };

    return (
        <>
            <div>
                <button className="btn btn-primary fz-16 mb-3 float-end" onClick={handleShowModalAddGenre}>
                    Thêm thể loại
                </button>
            </div>
            <div className="w-100 d-flex justify-content-center">
                <table className="w-100">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres?.map((genre) => {
                            return (
                                <tr key={`genre-${genre?.id}`}>
                                    <td>{genre?.name}</td>
                                    <td>
                                        <Button
                                            className="fz-16 me-3"
                                            variant="warning"
                                            onClick={() => handleShowModalUpdateGenre(genre?.id, genre?.name)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            className="fz-16"
                                            variant="danger"
                                            onClick={() => handleShowModalDeleteGenre(genre?.id, genre?.name)}
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
            <Modal show={showModalAddGenre} onHide={handleCloseModalAddGenre}>
                <Modal.Header>
                    <Modal.Title>Thêm thể loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">
                                Tên
                            </Form.Label>
                            <Col sm="11">
                                <Form.Control
                                    value={genreAddInfo?.name}
                                    onChange={(e) =>
                                        setGenreAddInfo({
                                            ...genreAddInfo,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalAddGenre}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={handleSubmitAddGenre}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalUpdateGenre} onHide={handleCloseModalUpdateGenre}>
                <Modal.Header>
                    <Modal.Title>Sửa thể loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="1">
                                Tên
                            </Form.Label>
                            <Col sm="11">
                                <Form.Control
                                    value={genreUpdateInfo?.name}
                                    onChange={(e) =>
                                        setGenreUpdateInfo({
                                            ...genreUpdateInfo,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalUpdateGenre}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={handleSubmitUpdateGenre}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
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
        </>
    );
};

export default ManageGenre;
