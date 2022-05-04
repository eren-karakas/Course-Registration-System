const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');
const pageRoutes = require('./routes/pageRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;
const server = '127.0.0.1';

// CONNECT DATABASE
mongoose.connect('mongodb://localhost/rcs-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// VIEW ENGINE
app.set('view engine', 'ejs')

// GLOBAL VARIABLE
global.userIN = null;

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: 'MySecretKey',
  resave: false,
  saveUninitialized: true,
}));

// ROUTES
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})
app.use('/', pageRoutes);
app.use('/users', userRoutes)


app.listen(port, server, () => {
    console.log(`Server active ! http://${server}:${port}`);
})


