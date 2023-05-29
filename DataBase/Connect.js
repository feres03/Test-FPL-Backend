const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/TESTFPL').then(() => (console.log('Connected to database'))).catch((error) => (console.log(error)))
mongoose.Promise = global.Promise;