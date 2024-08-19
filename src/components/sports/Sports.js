import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sports.css'; // Make sure to create this CSS file

const Sports = () => {
    const [sports, setSports] = useState([]);

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/sports');
                const data = await response.json();
                setSports(data);
            } catch (error) {
                console.error('Error fetching sports data:', error);
            }
        };

        fetchSports();
    }, []);

    return (
        <section id="sports" className="sports-offered">
            <h2>Sports Offered</h2>
            <div className="sports-list">
                {sports.map(sport => (
                    <Link 
                        key={sport.sport_id} 
                        to={`/sports/${sport.sport_id}`} 
                        className="sport-item"
                    >
                        <img 
                            src={sport.image_url} 
                            alt={sport.name} 
                            className="sport-image" 
                        />
                        <h3>{sport.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Sports;
