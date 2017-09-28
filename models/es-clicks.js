const logger    = require('tracer').console();
const es = require('../es-connection');
const util = require('../utils/util');
const indexName = "clicks";
module.exports.indexName = indexName;
const indexType = "homes";
const schema = {
    index: indexName,
    type: indexType,
    body: {
        properties: {
            date:{type: "float","index" : "not_analyzed"},
            unixtime:{type: "long","index" : "not_analyzed"},
            jumlah_click:{type: "long","index" : "not_analyzed"},
            url:{type: "string","index" : "not_analyzed"},
            partner:{type: "string","index" : "not_analyzed"}
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

module.exports.fetchAll = function(country,callback){
    var par = {
        index: indexName+'_'+country,
        type: indexType,
        body: {
            "query": { "match_all": {} }
        },
        from:0,
        size:100
    }
    es.search(par,callback);
}
