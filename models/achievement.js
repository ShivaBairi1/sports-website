const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Achievement = sequelize.define('Achievement', {
    achievement_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    player_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Player',
            key: 'player_id'
        }
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    sport_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Sport',
            key: 'sport_id'
        }
    }
}, {
    tableName: 'Achievements',
    timestamps: true,
    underscored: true
});

module.exports = Achievement;
