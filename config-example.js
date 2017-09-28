const _logger    = require('tracer').console();
_logger.info("config invoked. environment="+process.env.NODE_ENV);

if(process.env.NODE_ENV=='development'){
    exports.port = 3001;
    exports.prefixhost = 'dev';
    exports.database = {
      mongodb:{
          'host':'localhost',
          'port':'27017',
          'database':'databasename',
          'username':'',
          'password':'',
          'uri': 'mongodb://localhost:27017/databasename'
      }
    };
    exports.elasticsearch = {
        'host':'localhost:9200',
        'log':'info',
        'requestTimeout':120000
    };
    exports.api_rayasem_webapp = {
            'protocol':'https',
            'host':'localhost',
            'port':'3000',
            'token':'xxxxxxxxxx',
        };
}
if(process.env.NODE_ENV=='staging'){
    exports.port = 3001;
    exports.prefixhost = 'beta';
    exports.database = {
      mongodb:{
          'host':'localhost',
          'port':'27017',
          'database':'databasename',
          'username':'',
          'password':'',
          'uri': 'mongodb://localhost:27017/databasename'
      }
    };
    exports.elasticsearch = {
        'host':'45.xx.xx.xxx:9200',
        'log':'info',
        'requestTimeout':120000
    };
    exports.api_rayasem_webapp = {
        'protocol':'https',
        'host':'localhost',
        'port':'3000',
        'token':'xxxxxxxxxx',
    };
}
if(process.env.NODE_ENV=='production'){
    exports.port = 3001;
    exports.prefixhost = 'www';
    exports.database = {
      mongodb:{
          'host':'localhost',
          'port':'27017',
          'database':'databasename',
          'username':'',
          'password':'',
          'uri': 'mongodb://localhost:27017/databasename'
      }
    };
    exports.elasticsearch = {
        'host':'45.xx.xx.xxx:9200',
        'log':'info',
        'requestTimeout':120000
    };
    exports.api_rayasem_webapp = {
        'protocol':'https',
        'host':'localhost',
        'port':'3000',
        'token':'xxxxxxxxxx',
    };
}


if(process.env.NODE_ENV=='development-docker'){
    exports.port = 3001;
    exports.prefixhost = 'dev';
    exports.database = {
      mongodb:{
          'host':'localhost',
          'port':'27017',
          'database':'databasename',
          'username':'',
          'password':'',
          'uri': 'mongodb://mongo/databasename'
      }
    };
    exports.elasticsearch = {
        'host':'localhost:9200',
        'log':'info',
        'requestTimeout':120000
    };
    exports.api_rayasem_webapp = {
            'protocol':'https',
            'host':'localhost',
            'port':'3000',
            'token':'xxxxxxxxxx',
        };
}
if(process.env.NODE_ENV=='staging-docker'){
    exports.port = 3001;
    exports.prefixhost = 'beta';
    exports.database = {
      mongodb:{
          'host':'localhost',
          'port':'27017',
          'database':'databasename',
          'username':'',
          'password':'',
          'uri': 'mongodb://mongo/databasename'
      }
    };
    exports.elasticsearch = {
        'host':'45.xx.xx.xxx:9200',
        'log':'info',
        'requestTimeout':120000
    };
    exports.api_rayasem_webapp = {
        'protocol':'https',
        'host':'localhost',
        'port':'3000',
        'token':'xxxxxxxxxx',
    };
}
if(process.env.NODE_ENV=='production-docker'){
    exports.port = 3001;
    exports.prefixhost = 'www';
    exports.database = {
      mongodb:{
          'host':'localhost',
          'port':'27017',
          'database':'databasename',
          'username':'',
          'password':'',
          'uri': 'mongodb://mongo/databasename'
      }
    };
    exports.elasticsearch = {
        'host':'45.xx.xx.xxx:9200',
        'log':'info',
        'requestTimeout':120000
    };
    exports.api_rayasem_webapp = {
        'protocol':'https',
        'host':'localhost',
        'port':'3000',
        'token':'xxxxxxxxxx',
    };
}
