import { Link } from 'react-router-dom';

const Breadcrumb = ({ title, category, item }) => {
    return (
        <div className="card mb-3 border">
            <div className="card-body">
                <div className="fz-16">
                    <div>
                        <h2>{title}</h2>
                    </div>

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">{category}</li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {item}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
