// DirectorProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import './Directorprofile.css'; // Ensure this path is correct

const DirectorProfile = () => {
    const { id } = useParams();
    const [director, setDirector] = useState(null);

    const breadcrumbs = [
        { path: '/', label: 'Home' },
        { path: `/directors/${id}`, label: 'Director Profile' }
    ];

    useEffect(() => {
        const fetchDirector = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/physical_director/${id}`);
                const data = await response.json();
                setDirector(data);
            } catch (error) {
                console.error('Error fetching director details:', error);
            }
        };

        fetchDirector();
    }, [id]);

    return (
        <div className="director-profile-page">
            <Breadcrumbs crumbs={breadcrumbs} />
            {director ? (
                <div className="director-details">
                    <img 
                        src={director.image || 'https://via.placeholder.com/150'} 
                        alt={director.name} 
                        className="director-profile-image"
                    />
                    <h1>{director.name}</h1>
                    <p>{director.info}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DirectorProfile;