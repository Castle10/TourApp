const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};
app.use((req, res, next) => {
    //console.log('Welcome to the middleware');
    next();
});

// route mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;