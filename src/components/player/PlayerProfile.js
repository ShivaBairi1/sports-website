import React, { useEffect, useState } from 'react';
import axios from 'axios';
import defaultProfilePic from '../../uploads/download.png'; // Import the default profile picture

const PlayerProfile = ({ id }) => {
    const [player, setPlayer] = useState(null);
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/players/${id}`);
                setPlayer(response.data);
            } catch (error) {
                console.error('Error fetching player:', error);
            }
        };

        const fetchAchievements = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/players/${id}/achievements`);
                setAchievements(response.data);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };

        fetchPlayer();
        // fetchAchievements();
    }, [id]);

    if (!player) {
        return <div>Loading...</div>;
    }

// PlayerProfile.js
return (
    <div className="player-profile">
        <img 
            src={player.profile_picture ? `http://localhost:3000${player.profile_picture}` : defaultProfilePic} 
            alt={`${player.firstname} ${player.lastname}`} 
            className="player-profile-pic"
        />
        <h1>{player.firstname} {player.lastname}</h1>
        <p><strong>Gender:</strong> {player.gender}</p>
        <p><strong>University Hall Ticket Number:</strong> {player.university_hall_ticket_number}</p>
        <p><strong>Sports Interested:</strong> {player.Sports.map(sport => sport.name).join(', ')}</p>
        <p><strong>Mobile:</strong> {player.mobile}</p>
        <p><strong>Email:</strong> {player.email}</p>

        {/* <div className="player-achievements">
            <h2>Achievements</h2>
            {achievements.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {achievements.map(achievement => (
                            <tr key={achievement.id}>
                                <td>{achievement.title}</td>
                                <td>{achievement.description}</td>
                                <td>{new Date(achievement.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No achievements found</p>
            )}
        </div> */}
    </div>
);

};

export default PlayerProfile;