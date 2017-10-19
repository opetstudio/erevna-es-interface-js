const _logger    = require('tracer').console();
const model_locations = require('../models/es-locations');
//
// module.exports['fetchAllByPartner'] = function(req, res, next) {
//   var opt = {
//     country: req.query.country || 'id',
//     partner: req.query.partner,
//   }
//   var out = function(status, e, result){
//     res.json({
//       status: status,
//       error: e,
//       result: result
//     });
//   }
//   if(!opt.partner) return out(false, 'partner is null', null);
//
//   model_clicks.fetchAllByPartner(opt, function(e,resultSearch){
//       out(false,e,resultSearch);
//   });
// }
// module.exports['sumTotalClicksByPartner'] = function(req, res, next) {
//   var opt = {
//     country: req.query.country || 'id',
//     partner: req.query.partner,
//     interval: req.query.interval || 'week',
//   }
//   var out = function(status, e, result){
//     res.json({
//       status: status,
//       error: e,
//       result: result
//     });
//   }
//   if(!opt.partner) return out(false, 'partner is null', null);
//
//   model_clicks.sumTotalClicksByPartner(opt, function(e,resultSearch){
//       out(false,e,resultSearch);
//   });
// }
// module.exports['sumClicksByPartner'] = function(req, res, next) {
//   var opt = {
//     country: req.query.country || 'id',
//     partner: req.query.partner,
//     interval: req.query.interval || 'week',
//     starttime: req.query.starttime || 0,
//     endtime: req.query.endtime || 0,
//   }
//   var out = function(status, e, result){
//     res.json({
//       status: status,
//       error: e,
//       result: result
//     });
//   }
//   if(!opt.partner) return out(false, 'partner is null', null);
//
//   model_clicks.sumClicksByPartner(opt, function(e,resultSearch){
//       out(false,e,resultSearch);
//   });
// }
// module.exports['fetchAll'] = function(req, res, next) {
//   var out = function(status, e, resultSearch){
//     res.json(resultSearch);
//   }
//   model_clicks.fetchAll(req.query.country || 'id', function(e,resultSearch){
//       out(false,e,resultSearch);
//   });
// }

module.exports['indexing'] = function(req, res, next) {
  const createdon = new Date().getTime();
  const dataIndex = {
    createdon: createdon,
    modifiedon: createdon,
    id: req.body.id,
    country: req.body.country,
    name: req.body.name,
    keyrow: req.body.keyrow,
    level: req.body.level,
    level1: req.body.level1,
    level2: req.body.level2,
    level3: req.body.level3,
    level4: req.body.level4,
    latlon: {lat:req.body.lat,lon:req.body.lon}
  }

  var out = function(status, error, response){
    res.json({status:status, error: error, response: response});
  }
  // if(!(req.body && req.body.dataIndex)) return out(false, 'null dataIndex', null);

  model_locations.indexing({data:dataIndex, country:dataIndex.country || 'id', id:dataIndex.id}, function(error,response){
    if(error) return out(false,error,response);
    out(true,error,response);
  });
}


module.exports['initMapping'] = function(req, res, next) {
  const country = req.query.country;
  const model = model_locations;
  var indexName = model.schema.index + '_'+country;
  var out = function(status,e,msg){
    res.json({status:status,e:e,msg:msg});
  }
  model.indexExists(indexName).then(function (exists) {
    if (exists) return _logger.info('Index is exists');
    else{
       _logger.info('belum ada index '+indexName+' then create index');
       return model.initIndex(indexName).then(function(response){
          _logger.info('success initIndex '+indexName+'');
       });
    }
  },function(e){
      // _logger.info('error1: ',e);
      out(false,e,e);
  }).then(function (resp) {
      // _logger.info('init mapping '+indexName);
  //    return;
      return model.initMapping(indexName).then(function(response){
//            _logger.info('response: ',response);
          _logger.info('success initMapping '+indexName+'');
          out(true,null,'success initMapping '+indexName+'');
      },function(error){
          // console.trace(error);
          out(false,error,error);
      });
  //  return model_es_frase.initIndex(indexName).then(model_es_frase.initMapping(indexName)).then(function () {
  //    _logger.info('success create index and initMapping');
  //  });
  },function(e){
      // _logger.info('error2: ',e);
      out(false,e,e);
  });
}
module.exports['fetchOneById'] = function(req, res, next) {
  const country = req.params.country;
  const id = req.params.id;
  var out = function(status,e,resultSearch){
    res.json({status:status,e:e,resultSearch:resultSearch});
  }
  model_locations.fetchOneById({country:country,id:id}, function(e,o){
    if(e) return out(false,e,o);
    else return out(true,e,o);
  });
}
