const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employee = new Schema({
    firstName: String,
    lastName: String,
    email: String
});

module.exports = mongoose.model('Employee', employee);
