const User = require('../models/User');
const bcrypt = require('bcrypt');
const isValidEmail = require('./isValidEmail');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res
            .status(400)
            .json({ message: 'Email and password must be privided' });

    if (!isValidEmail(email))
        return res.status(400).json({ message: 'Enter a valid email' });

    try {
        const user = await User.findOne({ email: email }).exec();
        if (!user) return res.status(401);

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // const userRoles = Object.values(user.roles);
            // Create JWT and Refresh token
            const accessToken = jwt.sign(
                {
                    username: user.username
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '180s' }
            );
            const refreshToken = jwt.sign(
                {
                    username: user.username
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // save refresh token with current user
            user.refreshToken = refreshToken;
            const result = await user.save();
            console.log(result);

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({ accessToken });
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = handleLogin;
