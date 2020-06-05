const db=require('../db');
const fs = require('fs');
const CryptoJS  = require('crypto-js');

module.exports.index=(req,res)=>{
    res.render('checkhash/index');
};

