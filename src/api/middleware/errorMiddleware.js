const handleCastErrorDB = err => {
    err.message = `Invalid ${err.path}: ${err.value}.`;
    err.statusCode = 400;
    return err;
}

const handleValidationErrorDB = err => {
    err.message = `Invalid input data. ${err.errors.email.message}`;
    err.statusCode = 400;
    return err;
}

const handleDuplicateFieldDB = err => {
    err.message = `Duplicate field value: ${Object.keys(err.keyValue)[0]}. Please use another value!`;
    err.statusCode = 400;
    return err;
}

const handleJWTError = err => {
    err.message = `Invalid token. Please log in again!`;
    err.statusCode = 400;
    return err;
}

const handleJWTExpiresError = err => {
    err.message = `Your token has expired! Please log in again`;
    err.statusCode = 400;
    return err;
}

const errorHandler = (err, req, res, next) => {
    // console.log(1, err);
    // console.log(2, JSON.parse(JSON.stringify(err)));

    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError(err);
    if (err.name === 'TokenExpiredError') err = handleJWTExpiresError(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'error',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
}

module.exports = errorHandler;
