const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Sport = require('./sport');

const News = sequelize.define('News', {
    news_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Ensures the date is set to now by default
    },
    sport_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sport',
            key: 'sport_id'
        }
    },
    banner_image_url: DataTypes.STRING,
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define association with Sport model
// News.belongsTo(Sport, { foreignKey: 'sport_id' });

module.exports = News;
