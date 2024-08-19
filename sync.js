const sequelize = require('./config');
const { Player, Achievement, Sport, User, PlayerSports, Event, Gallery, News } = require('./models/index');

// Sync all defined models to the DB
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Unable to create tables:', error);
    });

module.exports = { Player, Achievement, Sport, User, PlayerSports, Event, Gallery, News };
