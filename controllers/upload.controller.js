const db=require('../db');
const fs = require('fs');
var shortid=require('shortid');
const CryptoJS  = require('crypto-js');

module.exports.index=(req,res)=>{
    res.render('upload/index')
};

module.exports.encrypt=(req,res)=>{
    var mimetype=req.files[0].mimetype;
    var name=req.files[0].originalname;
    if(mimetype.indexOf("image/")!=-1){
        var message = fs.readFileSync(req.files[0].path).toString("base64");
    }
    else if(mimetype=="application/pdf"){
        var message = fs.readFileSync(req.files[0].path).toString("base64");
    }
    else if(mimetype.indexOf("text/")!=-1){
        var message = fs.readFileSync(req.files[0].path,"utf8")
    }
    else if(mimetype.indexOf("audio/")!=-1){
        var message = fs.readFileSync(req.files[0].path).toString("base64");
    }
    else if(mimetype.indexOf("video/")!=-1){
        var message = fs.readFileSync(req.files[0].path).toString("base64");
    }
    else{
        var error=["This file is not supported"];
        res.render('upload/index',{error: error})
    }
    var key= fs.readFileSync(req.files[1].path,"utf8");
    var temp=message.toString("utf8");
    var cipher = CryptoJS.AES.encrypt(temp,key).toString();
    var hashkey= CryptoJS.MD5(key);
    fs.writeFileSync(req.files[0].path,cipher);
    var hashmsg= CryptoJS.MD5(message);
    var hashcipher=CryptoJS.MD5(cipher);
    let encryptedfile={
        id: shortid.generate(),
        name: name,
        cipher: req.files[0].path.slice(15),
        mimetype: mimetype,
        hashmsg: hashmsg,
        hashkey: hashkey,
        hashdecrypted: ""
    }
    db.get('encryptedfiles').push(encryptedfile).write(); 
    res.redirect('/view')
}