const express = require('express');
const session = require('express-session')
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { notFound, errorHandler } = require('./http/middlewares/error-handler');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middlewares
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const database = require('./configs/database');

const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const userRoute = require('./routes/products');

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute)
app.use('/api/products', productRoute);

// Error handler middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;