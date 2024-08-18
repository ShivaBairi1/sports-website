const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const PhysicalDirector = sequelize.define('PhysicalDirector', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    info: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'physical_directors', // Ensure this is 'physical_directors'
    timestamps: false
});

module.exports = PhysicalDirector;
