// seed.js
const { User, Sport, Player } = require('./models');

const seedDatabase = async () => {
    try {
        // Create Sport
        const sport = await Sport.create({ sport_name: 'Basketball' });

        // Create User
        const user = await User.create({
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password'
        });

        // Create Player
        await Player.create({
            user_id: user.user_id,
            sport_id: sport.sport_id,
            firstname: 'John',
            lastname: 'Doe',
            age: 25,
            gender: 'male',
            mobile: '1234567890',
            profile_picture: null
        });

        console.log('Database seeded');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();
