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
module.exports.indexing = function(data, country, callback){
  // date:{type: "float","index" : "not_analyzed"},
  // unixtime:{type: "long","index" : "not_analyzed"},
  // jumlah_click:{type: "long","index" : "not_analyzed"},
  // url:{type: "string","index" : "not_analyzed"},
  // partner:{type: "string","index" : "not_analyzed"}
  es.index({
    index: indexName+'_'+country,
    type: indexType,
    // id: '1',
    body: data
  }, function (error, response) {
      callback(error, response);
  });
}

function getAggsTotalClickByPartner(){
  return {
    "group_by_partner": {
      "terms": {
        "field": "partner"
      },
      "aggs": {
        "total_clicks": {
          "sum": {
            "field": "jumlah_click"
          }
        },
        // "total_cost": {
        //   "sum": {
        //     "field": "StandardCost"
        //   }
        // }
      }
    }
  }
}
function getAggs(interval){
  return {
    "clicks_per_interval" : {
        "date_histogram" : {
            "field" : "unixtime",
            "interval" : interval
        },
        "aggs": {
            "clicks": {
                "sum": {
                    "field": "jumlah_click"
                }
            }
        }
    }
  }
}

module.exports.sumClicksByPartner = function(opt, callback){
    logger.info('sumClicksByPartner invoked opt=', opt);
    var country = opt.country;
    var partner = opt.partner;
    var interval = opt.interval;
    var starttime = opt.starttime;
    var endtime = opt.endtime;

    // var now = new Date();
    // var start_date = new Date().getTime();
    //
    // start_date.setDate(now.getDate() - 7);
    //
    // var end_date = new Date().getTime();
    // var oneWeekAgo = new Date();


    var par = {
        index: indexName+'_'+country,
        type: indexType,
        body: {
          // "query": { "match_all": {} },
          "query": {
            "bool": {
              "filter":[
                   {"term":{"partner":partner}},
                   {"range":{"unixtime":{"gte":starttime,"lte":endtime}}},
               ]
            }
          },
          // "query": {
          //   "filtered": {
          //     "filter": {
          //       "bool": {
          //         "must": [{
          //           "term": {
          //             "partner": partner
          //           }
          //         }]
          //       }
          //     }
          //   }
          // },
          "aggs": getAggs(interval) //interval= week, month, year
        }
        // from:0,
        // size:100
    }
    es.search(par, function(e,o){
      callback(e,o);
    });
}
module.exports.sumTotalClicksByPartner = function(opt, callback){
    logger.info('sumClicksByPartner invoked opt=', opt);
    var country = opt.country;
    var partner = opt.partner;
    var interval = opt.interval;
    var par = {
        index: indexName+'_'+country,
        type: indexType,
        body: {
          // "query": { "match_all": {} },
          "query": {
            "bool": {
              "filter":{
                   "term":{"partner":partner}
               }
            }
          },
          // "query": {
          //   "filtered": {
          //     "filter": {
          //       "bool": {
          //         "must": [{
          //           "term": {
          //             "partner": partner
          //           }
          //         }]
          //       }
          //     }
          //   }
          // },
          "aggs": getAggsTotalClickByPartner()
        }
        // from:0,
        // size:100
    }
    es.search(par, function(e,o){
      callback(e,o);
    });
}
module.exports.fetchAllByPartner = function(opt, callback){
    logger.info('fetchAllByPartner invoked opt='+opt);
    var country = opt.country;
    var partner = opt.partner;
    var par = {
        index: indexName+'_'+country,
        // index: 'clicks_id',
        type: indexType,
        // type: ' homes',
        body: {
          "query": {
            "bool": {
              "filter":{
                 "term":{"partner":partner}
               }
            }
          }
        }
        // from:0,
        // size:100
    }
    es.search(par, function(e,o){
      callback(e,o);
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
