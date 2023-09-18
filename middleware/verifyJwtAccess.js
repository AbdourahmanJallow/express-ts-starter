const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    const authHeaders = req.headers.authorization || req.headers.Authorization;
    if (!authHeaders?.startsWith('Bearer ')) return res.sendStatus(401);
    console.log('inside verifyAccess');
    console.log(req.headers);
    const token = authHeaders.split(' ')[1];

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) return res.sendStatus(403);
            req.email = data?.UserInfo?.email;
            req.roles = data?.UserInfo?.roles;

            next();
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = verifyAccess;
