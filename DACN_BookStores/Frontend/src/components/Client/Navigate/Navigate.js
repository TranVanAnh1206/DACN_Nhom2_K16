import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { clientNavigations } from '~/navigates';

const Navigate = () => {
    return (
        <>
            <div className="">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {clientNavigations?.map((nav, index) => {
                                    return (
                                        <li key={`navigate-${index}`} className="nav-item">
                                            <NavLink className="nav-link" aria-current="page" to={nav.path}>
                                                {nav.name}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navigate;
