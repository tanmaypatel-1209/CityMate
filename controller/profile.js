const express = require('express');
const User = require('../Entity/user');
const { encrypt, decrypt } = require('../services/encode');
const app = express.Router();

// Render profile view page
app.get('/', (req, res) => {
    return res.render('profile.ejs');
});

// Fetch current user data API
app.get('/data', async (req, res) => {
    try {
        const email = decrypt(req.cookies.email);
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        return res.json({
            success: true,
            user: {
                username: user.username,
                email: user.email,
                city: user.city || '',
                state: user.state || '',
                role: user.role || 'User'
            }
        });
    } catch (err) {
        console.error('Error fetching profile data:', err);
        return res.status(500).json({ success: false, error: 'Failed to load profile data' });
    }
});

// Update profile details API
app.post('/update', async (req, res) => {
    try {
        const currentEmail = decrypt(req.cookies.email);
        const currentUser = await User.findOne({ email: currentEmail });

        if (!currentUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const { username, email, city, state, newPassword } = req.body;

        // Check if new email belongs to another existing user
        if (email && email.toLowerCase() !== currentEmail.toLowerCase()) {
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.json({ success: false, error: 'Email address is already in use by another account' });
            }
            currentUser.email = email.toLowerCase();
        }

        if (username) {
            currentUser.username = username.trim();
        }
        if (city !== undefined) {
            currentUser.city = city.trim();
        }
        if (state !== undefined) {
            currentUser.state = state.trim();
        }
        if (newPassword && newPassword.trim() !== '') {
            currentUser.password = newPassword.trim();
        }

        await currentUser.save();

        // Update active cookies if email, city, or state changed
        res.cookie('email', encrypt(currentUser.email), {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        res.cookie('city', currentUser.city || '', {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        res.cookie('state', currentUser.state || '', {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.json({
            success: true,
            message: 'Profile updated successfully!',
            user: {
                username: currentUser.username,
                email: currentUser.email,
                city: currentUser.city,
                state: currentUser.state,
                role: currentUser.role
            }
        });
    } catch (err) {
        console.error('Error updating profile:', err);
        return res.status(500).json({ success: false, error: 'Internal server error while updating profile' });
    }
});

module.exports = app;
