require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8700;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const customLogger = require('./middleware/logger');
const errorLogger = require('./middleware/errorLogger');
const connectMongoDB = require('./config/dbConnection');
const mongoose = require('mongoose');
const verifyAccess = require('./middleware/verifyJwtAccess');

connectMongoDB();

app.use(customLogger); // CUSTOM MIDDLEWARE LOGGER

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false })); // MIDDLEWARE  FOR URL ENCODED FORM DATA

app.use(express.json()); // MIDDLEWARE FOR BUILT-IN JSON

app.use(cookieParser()); // MIDDLEWARE FOR COOKIES

// Routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// Protected Routes
app.use(verifyAccess);
app.use('/employees', require('./routes/api/employees'));

app.use(errorLogger); //Custom error logger

mongoose.connection.once('open', () => {
    console.log('MongoDB connected succesfully');
    app.listen(PORT, () =>
        console.log(`Server listening for requests on port ${PORT}`)
    );
});
