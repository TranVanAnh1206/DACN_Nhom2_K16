import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Button, Modal, Pagination, Form, Col, Row } from 'react-bootstrap';
import styles from './AdminPage.module.scss';
import { adminChangeStatusOfOrderService, adminGetAllOrdersService } from '~/services/orderService';
import bookImageDefault from '~/assets/imgs/book-default.jpg';
import moment from 'moment';

const ManageOrder = ({ setSpinning }) => {
    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 5;

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
        try {
            setSpinning(true);
            await adminChangeStatusOfOrderService({ orderId: orderUpdateInfo?.id, status: orderUpdateInfo?.status });
            fetchGetOrders();
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseModalUpdateOrder();
            setSpinning(false);
        }
    };

    return (
        <>
            <div className="w-100 d-flex justify-content-center">
                <table className="w-100">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Total Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Books</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => {
                            const obj = {
                                0: 'Đã huỷ',
                                1: 'Đã thanh toán',
                                2: 'Chưa thanh toán',
                                3: 'Đã giao hàng',
                                4: 'Đang xử lý',
                            };
                            return (
                                <tr key={`order-${order?.id}`}>
                                    <td>{order?.userEmail}</td>
                                    <td>{order?.userAddress}</td>
                                    <td>{order?.totalAmount}</td>
                                    <td>{moment(order?.date).format('DD/MM/YYYY')}</td>
                                    <td>{obj[order?.status]}</td>
                                    <td>
                                        <div className="d-flex flex-column align-items-center flex-wrap">
                                            {order?.orderItems?.map((book) => {
                                                return (
                                                    <img
                                                        className={clsx(styles['book-image'])}
                                                        key={`book-${book?.bookId}`}
                                                        src={book?.bookImage}
                                                        alt={book?.bookName}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = bookImageDefault;
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </td>
                                    <td>
                                        <Button
                                            className="fz-16 me-3"
                                            variant="warning"
                                            onClick={() => handleShowModalUpdateOrder(order?.id, order?.status)}
                                        >
                                            Sửa trạng thái
                                        </Button>
                                        {/* <Button
                                                className="fz-16"
                                                variant="danger"
                                                onClick={() => handleShowModalDeleteOrder(order?.id, order?.name)}
                                            >
                                                Huỷ đơn
                                            </Button> */}
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

            <Modal show={showModalUpdateOrder} onHide={handleCloseModalUpdateOrder}>
                <Modal.Header>
                    <Modal.Title>Sửa trạng thái</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Trạng thái
                            </Form.Label>
                            <Col sm="10">
                                <Form.Select
                                    value={orderUpdateInfo?.status}
                                    onChange={(e) =>
                                        setOrderUpdateInfo({
                                            ...orderUpdateInfo,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    <option value={0}>Đã huỷ</option>
                                    <option value={1}>Đã thanh toán</option>
                                    <option value={2}>Chưa thanh toán</option>
                                    <option value={3}>Đã giao hàng</option>
                                    <option value={4}>Đang xử lý</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="fz-16" variant="warning" onClick={handleCloseModalUpdateOrder}>
                        Huỷ
                    </Button>
                    <Button className="fz-16" variant="danger" onClick={handleSubmitUpdateOrder}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManageOrder;
