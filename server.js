// Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Config
const config = require('./config');

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Set port
const port = process.env.PORT || '1337';
app.set('port', port);

// Routes
require('./routes')(app, config);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
