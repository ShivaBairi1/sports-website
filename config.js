const Sequelize = require('sequelize');
require('dotenv').config();
// const User = require('./models/user');
// const Player = require('./models/player');
// const Sport = require('./models/sport');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    jwtSecret: process.env.JWT_SECRET,
});
// Define relationships if any
// Player.belongsTo(User, { foreignKey: 'user_id' });
// Player.belongsTo(Sport, { foreignKey: 'sport_id' });

const syncDatabase = async () => {
    try {
      await sequelize.sync({ alter: false });
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Unable to sync the database:', error);
    }
  };
  
  syncDatabase();
  

module.exports = sequelize;
