'use strict';
require('./bootstrap');
const express = require('express');
const erevna = require('erevna-services');

// Constants
// const PORT = 8081;
// const HOST = '0.0.0.0';

// App
const app = express();

const model_clicks = require('./models/es-clicks');
app.use(['/clicks'], require('./routes/clicksRoute'));
app.use(['/dictionaryPropertycategory'], require('./routes/dictionaryPropertycategoryRoute'));

module.exports = app;

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);
