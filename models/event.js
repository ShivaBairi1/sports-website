const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Event = sequelize.define('Event', {
    event_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    sport_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sport',
            key: 'sport_id'
        }
    },
    banner_image_url: DataTypes.STRING, // Add this if banner_image_url is used
    admin_id: DataTypes.INTEGER, // Add this if admin_id is used
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Event;
