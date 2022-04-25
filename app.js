const express = require('express');
const ejs = require('ejs');

const pageRoutes = require('./routes/pageRoutes');

const app = express();
const port = 3000;
const server = '127.0.0.1';

// CONNECT DATABASE

// VIEW ENGINE
app.set('view engine', 'ejs')

// MIDDLEWARE
app.use(express.static('public'));

// GLOBAL VARIABLE

// ROUTES
app.use('/', pageRoutes);


app.listen(port, server, () => {
    console.log(`Server active ! http://${server}:${port}`);
})


