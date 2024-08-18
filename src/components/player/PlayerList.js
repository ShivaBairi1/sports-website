import React from 'react';
import { Link } from 'react-router-dom';
import defaultProfilePic from '../../uploads/download.png'; // Default profile picture

const PlayersList = ({ players, onPlayerClick }) => {
    return (
        <ul className="players-list">
            {players.map(player => (
                <li key={player.player_id} className="player-item" onClick={() => onPlayerClick(player)}>
                    <img 
                        src={player.profile_picture ? `http://localhost:3000${player.profile_picture}` : defaultProfilePic} 
                        alt={`${player.firstname} ${player.lastname}`} 
                        className="player-profile-pic"
                    />
                    <span>
                        {player.firstname} {player.lastname}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default PlayersList;
