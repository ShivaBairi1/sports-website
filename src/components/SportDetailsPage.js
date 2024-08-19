import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SportPage.css'; // For custom styles if needed

const SportsInfrastructure = () => {
    const [sports, setSports] = useState([]);

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/sports');
                setSports(response.data);
            } catch (error) {
                console.error('Error fetching sports data:', error);
            }
        };

        fetchSports();
    }, []);

    return (
        <div className="sports-infrastructure">
            <h1>Sports Infrastructure</h1>
            <div className="sports-list">
                {sports.map(sport => (
                    <Link 
                        key={sport.sport_id} 
                        to={`/sports/${sport.sport_id}`} 
                        className="sport-item"
                    >
                        <h2>{sport.name}</h2>
                        {sport.image_url && <img src={sport.image_url} alt={sport.name} />}
                        <p>{sport.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SportsInfrastructure;