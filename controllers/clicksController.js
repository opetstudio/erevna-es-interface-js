const _logger    = require('tracer').console();
const model_clicks = require('../models/es-clicks');

module.exports['sumClicksByPartner'] = function(req, res, next) {
  var opt = {
    country: req.query.country || 'id',
    partner: req.query.partner,
    interval: req.query.interval || 'week',
  }
  var out = function(status, e, result){
    res.json({
      status: status,
      error: e,
      result: result
    });
  }
  if(!opt.partner) return out(false, 'partner is null', null);

  model_clicks.sumClicksByPartner(opt, function(e,resultSearch){
      out(false,e,resultSearch);
  });
}
module.exports['fetchAll'] = function(req, res, next) {
  var out = function(status, e, resultSearch){
    res.json(resultSearch);
  }
  model_clicks.fetchAll(req.query.country || 'id', function(e,resultSearch){
      out(false,e,resultSearch);
  });
}
module.exports['indexing'] = function(req, res, next) {
  var out = function(status, error, response){
    res.json({status:status, error: error, response: response});
  }
  if(!(req.body && req.body.dataIndex)) return out(false, 'null dataIndex', null);

  model_clicks.indexing(req.body.dataIndex, req.query.country || 'id', function(error,response){
    if(error) return out(false,error,response);
    out(true,error,response);
  });
}
