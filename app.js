const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev')); // middleware
app.use(express.json()); // middleware
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// TOUR
app.use('/api/v1/tours', tourRouter);

// USER
app.use('/api/v1/users', userRouter);

module.exports = app;
