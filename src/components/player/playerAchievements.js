import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Achievements.css';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/achievements');
                setAchievements(response.data);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };

        fetchAchievements();
    }, []);

    return (
        <div className="achievements-list">
            <h1>Achievements</h1>
            <ul>
                {achievements.map(achievement => (
                    <li key={achievement.id}>
                        <h2>{achievement.title}</h2>
                        <p>{achievement.description}</p>
                        <p><strong>Sport:</strong> {achievement.sport}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Achievements;