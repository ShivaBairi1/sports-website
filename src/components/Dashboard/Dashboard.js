import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file

const Dashboard = ({ handlePlayerFormSubmit }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

    

        fetchUser();
    }, [navigate]);

    return (
        <div className="dashboard">
            <h1>Welcome to Your Dashboard</h1>
            {user && (
                <div className="user-details">
                    <h2>{user.name}</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}
            <nav>
                <ul>
                    <li><Link to="/dashboard/playerform">Players Form</Link></li>
                    {/* <li><Link to="/dashboard/achievements">Achievements</Link></li> */}
                    <li><Link to="/dashboard/gallery">Gallery</Link></li>
                    <li><Link to="/dashboard/news">News</Link></li>
                    <li><Link to="/dashboard/events">Events</Link></li>
                    <li><Link to="/dashboard/physical-director-form">Physical Director Form</Link></li>
                    <li><Link to="/dashboard/sport-form">Sport Form</Link></li>
                </ul>
            </nav>
            <section>
                <Outlet context={{ handlePlayerFormSubmit }} />
            </section>
        </div>
    );
};

export default Dashboard;
