require('express-async-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const requestInfo = require('./src/api/middleware/requestInfo')
const errorHandler = require('./src/api/middleware/errorMiddleware');
const userRoute = require('./src/api/routes/userRoute');

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestInfo);

// Routes Middleware
app.use('/api/users', userRoute);

// Routes
app.get('/', (req, res) => {
    res.send('Home Page');
});

// Error Middleware
app.use(errorHandler);

module.exports = app;
