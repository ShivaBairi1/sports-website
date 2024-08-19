const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Sport = require('./sport');
const PlayerSports = require('./playerSports');
const Player = sequelize.define('Player', {
    player_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    university_hall_ticket_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sport_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true // Assuming user_id is optional. Set to false if it is required.
    }
}, {
    tableName: 'Player',
    timestamps: true,
    underscored: true
});
// Player.belongsToMany(Sport, { through: PlayerSports, foreignKey: 'player_id' });
// Sport.belongsToMany(Player, { through: PlayerSports, foreignKey: 'sport_id' });
module.exports = Player;
