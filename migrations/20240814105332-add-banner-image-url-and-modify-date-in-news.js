module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add banner_image_url column
    await queryInterface.addColumn('News', 'banner_image_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Modify date column to have a default value of the current timestamp
    await queryInterface.changeColumn('News', 'date', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove banner_image_url column
    await queryInterface.removeColumn('News', 'banner_image_url');

    // Revert date column changes
    await queryInterface.changeColumn('News', 'date', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};
