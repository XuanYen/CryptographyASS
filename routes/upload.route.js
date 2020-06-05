var express = require('express');
var router = express.Router();
var multer  = require('multer');
var controller=require('../controllers/upload.controller')
var upload = multer({ dest: './public/uploads/' });
router.get('/',controller.index);
router.post('/',upload.array('file',2),controller.encrypt)
module.exports = router