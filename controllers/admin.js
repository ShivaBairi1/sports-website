// controllers/admin.js

const performAdminAction = (req, res) => {
    // Example admin action logic
    res.status(200).json({ message: 'Admin action performed successfully.' });
};

module.exports = {
    performAdminAction,
};
