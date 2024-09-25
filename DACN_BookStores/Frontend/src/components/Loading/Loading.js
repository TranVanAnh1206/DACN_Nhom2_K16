import { Spinner } from 'react-bootstrap';
import './Loading.scss';
import { useSelector } from 'react-redux';

const Loading = () => {
    const loading = useSelector((state) => state.loading);

    return (
        <>
            {loading.isLoading ? (
                <div className={`loading`}>
                    <Spinner animation="border" />
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default Loading;
