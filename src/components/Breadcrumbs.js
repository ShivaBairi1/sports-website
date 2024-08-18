import React from 'react';
import { Link } from 'react-router-dom';
// import './Breadcrumbs.css';

const Breadcrumbs = ({ crumbs }) => {
    return (
        <nav className="breadcrumb">
            <ul>
                {crumbs.map((crumb, index) => (
                    <li key={index}>
                        {index < crumbs.length - 1 ? (
                            <Link to={crumb.path}>{crumb.label}</Link>
                        ) : (
                            <span>{crumb.label}</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
