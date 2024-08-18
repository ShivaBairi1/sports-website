const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Gallery = sequelize.define('Gallery', {
    gallery_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image_url: DataTypes.STRING,
    sport_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Sport',
            key: 'sport_id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    admin_id: {
        type: DataTypes.INTEGER,
        
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Gallery;
