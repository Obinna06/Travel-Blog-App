const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {
    register: async (req, res) => {
        try {
            const { username, password, email, address } = req.body;
            
            if (!username || !password || !email) {
                return res.status(400).json({ message: 'Username, password and email are required' });
            }

            if (password.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await User.create({ username, password: hashedPassword, email, address });
            
            res.status(201).json({ message: 'User created successfully', userId });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Username or email already exists' });
            }
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findByUsername(username);
            
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ 
                token, 
                user: { 
                    id: user.id, 
                    username: user.username, 
                    email: user.email 
                } 
            });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    }
};

module.exports = authController;