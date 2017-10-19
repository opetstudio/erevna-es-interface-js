var express = require('express');
var router = express.Router();
const _controllers_clicks = require('../controllers/clicksController');

router.get(['/'], [], function(req, res, next){
  res.json({status:true,appname:'erevna-es-interface-js'});
});

module.exports = router;
