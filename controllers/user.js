// controllers/user.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req, res) => {
    const { username, email, password ,role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    try {
        const user = await User.create({ username, email, password: hashedPassword,role });
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ where: { email } });

      if (!user || !await bcrypt.compare(password, user.password)) {
          return res.status(400).send({ error: 'Invalid login credentials.' });
      }

      const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.send({ user, token });
  } catch (error) {
      res.status(500).send(error);
  }
};



module.exports = { registerUser, loginUser };
