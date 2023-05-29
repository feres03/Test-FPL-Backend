const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const passport = require('passport')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const app = express();

require('./DataBase/Connect')
require('./Passport/Bearer')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyparser.json())
app.use(require('express-session')({ secret: process.env.JWTSECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./Routes/adminAPi'));
app.use('/api', passport.authenticate('bearer', { session: false }), require('./Routes/employeeAPi'));
app.use('/api', passport.authenticate('bearer', { session: false }), require('./Routes/missionAPi'));



app.listen(port, console.log('App running on port ' + port)
)