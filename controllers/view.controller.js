const db=require('../db');
const fs = require('fs');
const CryptoJS  = require('crypto-js');

module.exports.index=(req,res)=>{
    var files=db.get("encryptedfiles").value();
    res.render('view/index',{files: files})
};