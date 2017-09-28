'use strict';

const express = require('express');
const erevna = require('erevna-services');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

require('./bootstrap');

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
