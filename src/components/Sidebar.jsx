import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const [activePath, setActivePath] = useState('/');
    const location = useLocation();

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const handleNavClick = (path) => {
        setActivePath(path);
    };

    return (
        <div className="position-fixed top-0 side-header"
            style={{
                width: 301,
                boxShadow: "0px 0px 0px #f0f0f0, 0px 0px 29px #ebebeb",
                height: "100vh"
            }}
        >
            <Link to='/'
                className="align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
                <span className="fs-2">Pagar</span>
            </Link>
            <ul className="mt-5 p-2 flex-column mb-auto nav-list">
                <li className="nav-item pb-3">
                    <Link to='/'
                        className={`nav-link p-2 ${activePath === '/' ? 'active' : ''}`}
                        onClick={() => handleNavClick('/')}
                        style={{ borderRadius: 20 }}
                        aria-current="page"
                    >
                        <ion-icon className="fs-4" name="beer" />
                        <span> Dashboard </span>
                    </Link>
                </li>
                <li className="pb-3">
                    <Link to='/employe'
                        className={`nav-link p-2 ${activePath === '/employe' ? 'active' : ''}`}
                        onClick={() => handleNavClick('/employe')}
                        style={{ borderRadius: 20 }}
                    >
                        <ion-icon className="fs-4" name="beer" />
                        <span> Employee</span>
                    </Link>
                </li>
                <li className="pb-3">
                    <Link to='/items'
                        className={`nav-link p-2 ${activePath === '/items' ? 'active' : ''}`}
                        onClick={() => handleNavClick('/items')}
                        style={{ borderRadius: 20 }}
                    >
                        <ion-icon className="fs-4" name="beer" />
                        <span>Items</span>
                    </Link>
                </li>
                <li className="pb-3">
                    <Link to='/attendance'
                        className={`nav-link p-2 ${activePath === '/attendance' ? 'active' : ''}`}
                        onClick={() => handleNavClick('/attendance')}
                        style={{ borderRadius: 20 }}
                    >
                        <ion-icon className="fs-4" name="beer" />
                        <span>Attendance</span>
                    </Link>
                </li>
                <hr />
                <li className="pb-3">
                    <Link to='/profile'
                        className={`nav-link p-2 ${activePath === '/profile' ? 'active' : ''}`}
                        onClick={() => handleNavClick('/profile')}
                        style={{ borderRadius: 20 }}
                    >
                        <ion-icon className="fs-4" name="beer" />
                        <span>Profile</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
