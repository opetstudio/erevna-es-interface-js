const _logger    = require('tracer').console();
var _config = require('./config');
var elasticsearch = require('elasticsearch');
_logger.info('es-connection.js invoked');

//elasticsearch connection
var elasticClient = new elasticsearch.Client({host: _config.elasticsearch.host,log: _config.elasticsearch.log, requestTimeout: _config.elasticsearch.requestTimeout});
//Send a HEAD request to /?hello=elasticsearch and allow up to 1 second for it to complete.
elasticClient.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: Infinity,
  // undocumented params are appended to the query string
  hello: "elasticsearch!"
},function (error) {
  if (error) {
    _logger.error('elasticsearch cluster is down!');
  } else {
    _logger.info('All is well');
  }
});
module.exports = elasticClient;
