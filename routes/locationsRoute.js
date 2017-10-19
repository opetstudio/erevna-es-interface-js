var express = require('express');
var router = express.Router();
const _controllers_locations = require('../controllers/locationsController');
// const _controllers_clicks = require('../controllers/clicksController');

// router.get(['/sumTotalClicksByPartner'], [], _controllers_clicks['sumTotalClicksByPartner']);
// router.get(['/sumClicksByPartner'], [], _controllers_clicks['sumClicksByPartner']);
// router.get(['/fetchAllByPartner'], [], _controllers_clicks['fetchAllByPartner']);
// router.get(['/fetchAll'], [], _controllers_clicks['fetchAll']);
router.all(['/indexing'], [], _controllers_locations['indexing']);
router.get(['/initMapping'], [], _controllers_locations['initMapping']);
router.get(['/fetchOneById/:country/:id'], [], _controllers_locations['fetchOneById']);
module.exports = router;
