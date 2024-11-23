import clsx from 'clsx';
import styles from './Group.module.scss';
import Book from '../Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Group = ({ title, data = [] }) => {
    return (
        <>
            <div className={clsx('section')}>
                <div className={clsx(styles['title-wrap'])}>
                    <h3 className={clsx(styles['title'])}>{title}</h3>

                    <Link style={{ color: '#333' }} to={'/search'}>
                        Xem thêm <FontAwesomeIcon icon={faForward} />
                    </Link>
                </div>

                <div className={clsx(styles['body-wrap'])}>
                    <div className={clsx(styles['group-book'])}>
                        <div className="row">
                            {data.map((book, index) => {
                                return (
                                    <div key={book.id} className="col-2">
                                        <Book
                                            bookId={book.id}
                                            img={book.image}
                                            name={book.title}
                                            nameAuthor={''}
                                            price={book.price}
                                            rated={book.rate}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Group;
