var express = require('express');
var router = express.Router();
var controller=require('../controllers/view.controller')
router.get('/',controller.index);

module.exports = router