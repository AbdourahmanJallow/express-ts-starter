const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username must be provided']
    },
    email: {
        type: String,
        required: [true, 'Email must be provided'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password must be provided'],
        minLength: 8
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);
