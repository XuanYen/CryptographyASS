var express = require('express');
var router = express.Router();
var multer  = require('multer');
var controller=require('../controllers/decrypt.controller')
var upload = multer({ dest: './public/uploads/' });
router.get('/',controller.index);
router.post('/',upload.array('file',2),controller.decrypt);
//router.post('/',upload.array('file',2),controller.postUpload)
module.exports = router