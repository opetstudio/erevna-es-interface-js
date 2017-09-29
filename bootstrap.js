const _logger    = require('tracer').console();
_logger.info('bootstrap invoked');

// var elasticsearch = require('elasticsearch');
var _config = require('./config');
// require('./mongoose-connection');


//database connectioin
//mongoose.connect(_config.database.mongodb.host+':'+_config.database.mongodb.port+'/' + _config.database.mongodb.database);
//_global.db_connection = mongoose.connection;
//mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
//mongoose.connection.once('open', function (callback) {console.log('mongoose success connect');});

//startup elasticsearch connection
require('./es-connection');
