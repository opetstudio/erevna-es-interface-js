'use strict';
require('./bootstrap');
const express = require('express');
const bodyParser = require('body-parser');
const erevna = require('erevna-services');

// Constants
// const PORT = 8081;
// const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const model_clicks = require('./models/es-clicks');
app.use(['/'], require('./routes/indexRoute'));
app.use(['/clicks'], require('./routes/clicksRoute'));
app.use(['/dictionaryPropertycategory'], require('./routes/dictionaryPropertycategoryRoute'));
app.use(['/dictionaryLocation'], require('./routes/dictionaryLocationRoute'));
app.use(['/locations'], require('./routes/locationsRoute'));

module.exports = app;

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);
