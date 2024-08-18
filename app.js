const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const galleryRoutes = require('./routes/gallery');
const achievementRoutes = require('./routes/achievement');
const sportRoutes = require('./routes/sport');
const newsRoutes = require('./routes/news');
const playerRoutes = require('./routes/player');
const adminRoutes = require('./routes/admin');
const path = require('path');
const sync=require('./sync')
const foundersRouter = require('./routes/physicalDirectors');
// const authMiddleware = require('./middleware/auth');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const crypto = require('crypto');

// Generate 32 bytes of random data
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);



const Sequelize = require('sequelize');
require('dotenv').config();
const User = require('./models/user');
const Player = require('./models/player');
const Sport = require('./models/sport');
// const PlayerSports=require('./models/PlayerSports');
const Achievement=require('./models/achievement');
const Index=require('./models/index');
const Gallery=require('./models/gallery')
const { isAdmin } = require('./middleware/auth');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    jwtSecret: process.env.JWT_SECRET,
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(authMiddleware);
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging HTTP requests to console during development
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/me', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/physical_director', foundersRouter);
// app.use('/api/admin', adminRoutes);
// app.use('/api/admin', userRoutes);


// Define relationships if any


// const syncDatabase = async () => {
//     try {
//       await sequelize.sync({ force: true });
//       console.log('Database & tables created!');
//     } catch (error) {
//       console.error('Unable to sync the database:', error);
//     }
//   };
  
//   syncDatabase();




const syncDatabase = async () => {
    try {
      await sequelize.sync({ alter: false });
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Unable to sync the database:', error);
    }
  };
  
  syncDatabase();

 
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
