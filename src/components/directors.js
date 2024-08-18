import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs'; // Adjust the import path as needed
import './directors.css'; // Ensure this path is correct

const Directors = () => {
    const [directors, setDirectors] = useState([]);
    const breadcrumbs = [
        // { path: '/', label: 'Home' },
        // { path: '/directors', label: 'Physical Directors' }
    ];

    // Fetch physical directors from the API
    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/physical_director'); // Adjust the URL as needed
                const data = await response.json();
                setDirectors(data);
            } catch (error) {
                console.error('Error fetching physical directors:', error);
            }
        };

        fetchDirectors();
    }, []);

    return (
        <div className="home">
            <Breadcrumbs crumbs={breadcrumbs} />
            <div className="container">

                <section id="directors" className="directors">
                    <h2>Physical Directors</h2>
                    <div className="directors-list">
                        {directors.length > 0 ? (
                            directors.map(director => (
                                <Link to={`/directors/${director.id}`} key={director.id} className="director-profile">
                                    <img 
                                        src={director.image || 'https://via.placeholder.com/150'} 
                                        alt={director.name} 
                                        className="director-image"
                                    />
                                    <h3>{director.name}</h3>
                                    <p>{director.info}</p>
                                </Link>
                            ))
                        ) : (
                            <p>No physical directors found.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Directors;
