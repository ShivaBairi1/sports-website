import React from 'react';
// import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2>Quick Links</h2>
            <ul>
                <li><a href="/#about">About Us</a></li>
                <li><a href="/#directors">PhysicalDirector</a></li>
                <li><a href="/#events">Recent Events</a></li>
                <li><a href="/#gallery">Gallery</a></li>
                <li><a href="/#sports">Sports Offered</a></li>
                <li><a href="/#achievements">Achievements</a></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
