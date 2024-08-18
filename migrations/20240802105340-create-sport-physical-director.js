'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('sport_physical_directors', {
            sport_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'sport',
                    key: 'sport_id'
                },
                allowNull: false
            },
            physical_director_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'physical_directors',
                    key: 'id'
                },
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('sport_physical_directors');
    }
};
