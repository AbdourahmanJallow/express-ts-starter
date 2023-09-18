const User = require('../models/User');
const bcrypt = require('bcrypt');
const isValidEmail = require('./isValidEmail');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req?.body;

    if (!email || !password)
        return res
            .status(400) //bad request
            .json({ message: 'Email and password must be provided' });

    if (!isValidEmail(email))
        return res.status(406).json({ message: 'Enter a valid email address' }); //not acceptable

    try {
        const user = await User.findOne({ email }).exec();
        if (!user) return res.sendStatus(401); //Unauthorized

        const matchedUser = await bcrypt.compare(password, user.password);
        if (matchedUser) {
            const userRoles = Object.values(user.roles);
            // Create JWT and Refresh token
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        email: user.email,
                        roles: userRoles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '180s' }
            );

            const refreshToken = jwt.sign(
                {
                    UserInfo: {
                        email: user.email,
                        roles: userRoles
                    }
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
