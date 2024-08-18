const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Sport = require('./sport');
const PhysicalDirector = require('./physicalDirector');

const SportPhysicalDirector = sequelize.define('SportPhysicalDirector', {
    sport_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'sports', // Ensure this matches the table name in the migration file
            key: 'sport_id'
        },
        allowNull: false
    },
    physical_director_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'physical_directors', // Ensure this matches the table name in the migration file
            key: 'id'
        },
        allowNull: false
    }
}, {
    tableName: 'sport_physical_directors',
    timestamps: false
});

// Define the associations
Sport.belongsToMany(PhysicalDirector, { through: SportPhysicalDirector, foreignKey: 'sport_id' });
PhysicalDirector.belongsToMany(Sport, { through: SportPhysicalDirector, foreignKey: 'physical_director_id' });

module.exports = SportPhysicalDirector;
