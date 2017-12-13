// Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Set port
const port = process.env.PORT || '1337';
app.set('port', port);

// Routes
require('./routes')(app);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
