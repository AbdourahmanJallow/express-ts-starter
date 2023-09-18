const customLogger = (req, res, next) => {
    console.log(`${req.hostname}\t ${req.method}\t ${req.url}`);
    next();
};

module.exports = customLogger;
