const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Player = require('./player');
const PlayerSports = require('./playerSports'); 
const Sport = sequelize.define('Sport', {
    sport_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: { // Add this field
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'sport', // Ensure this is 'sports'
    timestamps: true,
    underscored: true
});
// Sport.belongsToMany(Player, { through: PlayerSports, foreignKey: 'sport_id' });
module.exports = Sport;
