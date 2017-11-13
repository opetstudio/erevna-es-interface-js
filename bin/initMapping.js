const _logger    = require('tracer').console();
var arg = process.argv;
var model = arg[2];
var country = arg[3];

_logger.info('arg',arg);

function main(){
    const model_es_frase = require('../models/'+model);
    var indexName = model_es_frase.schema.index + '_'+country;
    model_es_frase.indexExists(indexName).then(function (exists) {
      if (exists) return _logger.info('Index is exists');
      else{
         _logger.info('belum ada index '+indexName+' then create index');
         return model_es_frase.initIndex(indexName).then(function(response){
            _logger.info('success initIndex '+indexName+'');
         });
      }
    },function(e){
        _logger.info('error1: ',e);
    }).then(function (resp) {
        _logger.info('init mapping '+indexName);
    //    return;
        return model_es_frase.initMapping(indexName).then(function(response){
//            _logger.info('response: ',response);
            _logger.info('success initMapping '+indexName+'');
        },function(error){
            console.trace(error);
        });
    //  return model_es_frase.initIndex(indexName).then(model_es_frase.initMapping(indexName)).then(function () {
    //    _logger.info('success create index and initMapping');
    //  });
    },function(e){
        _logger.info('error2: ',e);
    });
}

if(model && country){
    main();
}else{
    _logger.info('invalid arg');
}
