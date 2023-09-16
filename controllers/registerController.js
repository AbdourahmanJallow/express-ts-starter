const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, email, password } = req?.body;

    if (!username || !email || !password)
        return res.status(400).json({
            message: 'username, email and password are required'
        });

    if (!isValidEmail(email))
        return res
            .status(400)
            .json({ message: 'Please enter a valid email address' });

    // Check for duplicate
    const duplicate = await User.findOne({ username }).exec();

    if (duplicate)
        return res
            .status(409)
            .json({ message: `Username ${username} already exists` });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            username,
            email,
            password: hashedPassword
        }); //create and store new user

        console.log(result);
        res.status(201).json({ success: `New user ${username} created` });
    } catch (err) {
        console.log(err);
    }
};

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
};

module.exports = handleNewUser;
