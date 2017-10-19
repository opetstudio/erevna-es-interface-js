const logger    = require('tracer').console();
const es = require('../es-connection');
const util = require('../utils/util');
const indexName = "locations";
module.exports.indexName = indexName;
const indexType = "homes";
const schema = {
    index: indexName,
    type: indexType,
    body: {
        properties: {
            createdon:{type: "long","index" : "not_analyzed"},
            modifiedon:{type: "long","index" : "not_analyzed"},
            name:{type: "string","index" : "not_analyzed"},
            keyrow:{type: "string"},
            level:{type: "integer","index" : "not_analyzed"},
            level1:{type: "string","index" : "not_analyzed"},
            level2:{type: "string","index" : "not_analyzed"},
            level3:{type: "string","index" : "not_analyzed"},
            level4:{type: "string","index" : "not_analyzed"},
            latlon:{type:"geo_point","lat_lon": true} //dataparse.latlon = {lat:0.7893,lon:113.9213};
        }
    }
}

module.exports.schema = schema;

function getIndexName(xIndexName){
    var theIndexName = indexName;
    if(typeof(xIndexName) !== 'undefined'){
        theIndexName = xIndexName;
    }
    return theIndexName;
}

function indexExists(xIndexName) {
    var theIndexName = getIndexName(xIndexName);
    return es.indices.exists({
        index: theIndexName
    });
}
module.exports.indexExists = indexExists;

function initMapping(xIndexName) {
     var theIndexName = getIndexName(xIndexName);
     schema.index = theIndexName;
    return es.indices.putMapping(schema);
}
module.exports.initMapping = initMapping;

function initIndex(xIndexName) {
    var theIndexName = getIndexName(xIndexName);
//    console.log('initIndex property '+theIndexName+"|"+indexType);
    return es.indices.create({
        index: theIndexName
    });
}
module.exports.initIndex = initIndex;
module.exports.indexing = function(opt, callback){
  var data = opt.data;
  var country = opt.country;
  var id = opt.id;
  es.index({
    index: indexName+'_'+country,
    type: indexType,
    id: id,
    body: data
  }, function (error, response) {
      callback(error, response);
  });
}
module.exports.fetchAll = function(country, callback){
    logger.info('fetchAll invoked country='+country);
    var par = {
        index: indexName+'_'+country,
        // index: 'clicks_id',
        type: indexType,
        // type: ' homes',
        body: {
            "query": { "match_all": {} }
        }
        // from:0,
        // size:100
    }
    logger.info('fetchAll par=',par);
    es.search(par, function(e,o){
      logger.info('fetchAll invoked e=',e);
      logger.info('fetchAll invoked o=',o);
      callback(e,o);
    });
}
module.exports.fetchOneById = function(opt, callback){
    var country = opt.country;
    var id = opt.id;
    logger.info('fetchOneById invoked country='+country);
    var par = {
        index: indexName+'_'+country,
        // index: 'clicks_id',
        type: indexType,
        id: id
        // type: ' homes',
        // body: {
        //     "query": { "match_all": {} }
        // }
        // from:0,
        // size:100
    }
    logger.info('fetchOneById par=',par);
    es.get(par, function(e,o){
      logger.info('fetchOne invoked e=',e);
      logger.info('fetchOne invoked o=',o);
      callback(e,o);
    });
}
