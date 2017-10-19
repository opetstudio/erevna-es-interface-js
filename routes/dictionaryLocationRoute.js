var express = require('express');
var router = express.Router();
const _controllers_dictionaryLocation = require('../controllers/dictionaryLocationController');
// const _controllers_clicks = require('../controllers/clicksController');

// router.get(['/sumTotalClicksByPartner'], [], _controllers_clicks['sumTotalClicksByPartner']);
// router.get(['/sumClicksByPartner'], [], _controllers_clicks['sumClicksByPartner']);
// router.get(['/fetchAllByPartner'], [], _controllers_clicks['fetchAllByPartner']);
// router.get(['/fetchAll'], [], _controllers_clicks['fetchAll']);
router.all(['/indexing'], [], _controllers_dictionaryLocation['indexing']);
router.get(['/initMapping'], [], _controllers_dictionaryLocation['initMapping']);
router.get(['/fetchOneById/:country/:id'], [], _controllers_dictionaryLocation['fetchOneById']);
module.exports = router;
