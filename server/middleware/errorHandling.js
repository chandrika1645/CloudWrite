

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);  

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'An unexpected error occurred',
    });
};

module.exports = errorMiddleware;