var express = require('express');
var router = express.Router();
const _controllers_clicks = require('../controllers/clicksController');

router.get(['/sumClicksByPartner'], [], _controllers_clicks['sumClicksByPartner']);
router.get(['/fetchAll'], [], _controllers_clicks['fetchAll']);
router.all(['/indexing'], [], _controllers_clicks['indexing']);

module.exports = router;
