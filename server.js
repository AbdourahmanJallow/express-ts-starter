require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8700;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const customLogger = require('./middleware/logger');

app.use(customLogger); // CUSTOM MIDDLEWARE LOGGER

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false })); // MIDDLEWARE  FOR URL ENCODED  FORM DATA

app.use(express.json()); // MIDDLEWARE FOR BUILT-IN JSON

app.use(cookieParser()); // MIDDLEWARE FOR COOKIES

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
