import { Tab, Nav } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './AdminPage.module.scss';
import ManageUser from './ManageUser';
import ManageBook from './ManageBook';
import ManageAuthor from './ManageAuthor';
import Statistic from './Statistic';
import ManageGenre from './ManageGenre';
import ManageOrder from './ManageOrder';
import { useState } from 'react';

const AdminPage = () => {
    const [spinning, setSpinning] = useState(false);

    return (
        <div className={clsx(styles['header-wrapper'])}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="manage-user">
                <Nav variant="pills" className="mb-3 d-flex justify-content-center ">
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="manage-user">
                            Management User
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="manage-book">
                            Management Book
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="manage-author">
                            Management Author
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="manage-genre">
                            Management Genre
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="manage-order">
                            Management Order
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ fontSize: '2rem' }} eventKey="statistic">
                            Statistic
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="manage-user">
                        <ManageUser setSpinning={setSpinning} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="manage-book">
                        <ManageBook setSpinning={setSpinning} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="manage-author">
                        <ManageAuthor setSpinning={setSpinning} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="manage-genre">
                        <ManageGenre setSpinning={setSpinning} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="manage-order">
                        <ManageOrder setSpinning={setSpinning} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="statistic">
                        <Statistic setSpinning={setSpinning} />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default AdminPage;
