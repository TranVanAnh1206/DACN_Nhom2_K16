import clsx from 'clsx';
import styles from './Group.module.scss';
import Book from '../Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';

const Group = ({ title, data = [] }) => {
    return (
        <>
            <div className={clsx('section')}>
                <div className={clsx(styles['title-wrap'])}>
                    <h3 className={clsx(styles['title'])}>{title}</h3>

                    <p>
                        Xem thêm <FontAwesomeIcon icon={faForward} />
                    </p>
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
