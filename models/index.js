const Player = require('./player');
const Sport = require('./sport');
const User = require('./user');
const PlayerSports = require('./PlayerSports');
const Event = require('./event');
const Gallery = require('./gallery');
const News = require('./news');
const Achievement = require('./achievement');

// Define associations
Sport.belongsToMany(Player, { through: PlayerSports, foreignKey: 'sport_id' });
Player.belongsToMany(Sport, { through: PlayerSports, foreignKey: 'player_id' });
User.hasOne(Player, { foreignKey: 'user_id' });
Player.belongsTo(User, { foreignKey: 'user_id' });

Sport.hasMany(Achievement, { foreignKey: 'sport_id' });
Achievement.belongsTo(Sport, { foreignKey: 'sport_id' });
Player.hasMany(Achievement, { foreignKey: 'player_id' });
Achievement.belongsTo(Player, { foreignKey: 'player_id' });

Sport.hasMany(Event, { foreignKey: 'sport_id' });
Event.belongsTo(Sport, { foreignKey: 'sport_id' });

Sport.hasMany(Gallery, { foreignKey: 'sport_id' });
Gallery.belongsTo(Sport, { foreignKey: 'sport_id' });

Sport.hasMany(News, { foreignKey: 'sport_id' });
News.belongsTo(Sport, { foreignKey: 'sport_id' });

module.exports = { Player, Achievement, Sport, User, PlayerSports, Event, Gallery, News };
