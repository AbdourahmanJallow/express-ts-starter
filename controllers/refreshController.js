const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleUserRefreshToken = async (req, res) => {
    // grab refreshToken from request cookies
    const cookies = req?.cookies;

    if (!cookies?.jwt) return res.sendStatus(401); //Unauthorized
    const refreshToken = cookies?.jwt;

    //find user with refreshToken
    try {
        const user = await User.findOne({ refreshToken }).exec();
        if (!user) return res.sendStatus(403); //forbidden

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, data) => {
                const userRoles = Object.values(user.roles);
                if (err || data.UserInfo.email !== user.email)
                    return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            email: data.UserInfo.email,
                            roles: userRoles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '180s' }
                );
                res.json({ accessToken });
            }
        );
    } catch (err) {
        console.log(err);
    }
};

module.exports = handleUserRefreshToken;
