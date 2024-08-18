const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const PlayerSports = sequelize.define('PlayerSports', {
    player_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Player',
            key: 'player_id'
        }
    },
    sport_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Sport',
            key: 'sport_id'
        }
    }
}, {
    timestamps: false
});

module.exports = PlayerSports;
