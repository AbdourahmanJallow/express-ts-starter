const express = require('express');
const router = express.Router();
const handleUserRefreshToken = require('../controllers/refreshController');

router.post('/', handleUserRefreshToken);

module.exports = router;
