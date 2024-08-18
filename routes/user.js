const express = require('express');
const { registerUser, loginUser } = require('../controllers/user');
const router = express.Router();
const { isAdmin,auth } = require('../middleware/auth'); // Adjust path as per your file structure
const User=require("../models/user");

// Example route requiring admin privileges
// POST /api/gallery/admin - Create a new gallery item with admin access

router.post('/signup', registerUser);
router.post('/login', loginUser);
// router.post('/signup', registerUser, (req, res) => {
//     // Logic for handling admin-only functionality
//     res.status(200).json({ message: 'signup action performed successfully.' });
// });

router.post('/logout', (req, res) => {
    // Invalidate token on client-side
    res.json({ message: 'Logged out' });
});
router.post('/admin', isAdmin, (req, res) => {
    // Logic for handling admin-only functionality
    res.status(200).json({ message: 'Admin action performed successfully.' });
});


// router.post('/signup', registerUser);
router.post('/admin/login',isAdmin,loginUser);
// router.post('/login',loginUser);
// router.get('/me', auth, async (req, res) => {
//     try {
//         const user = await User.findByPk(req.user.user_id);
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });


router.get('/dashboard', auth, (req, res) => {
    // Only authenticated users can access this route
    res.send('Welcome to the dashboard!');
});


// Get all users
router.get('/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
    }
  });
  
  // Get user by ID
  router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch user' });
    }
  });
  

module.exports = router;
