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
    var message = fs.readFileSync(req.files[0].path,"utf8")
    var key= fs.readFileSync(req.files[1].path,"utf8");
    var temp=message.toString("utf8");
    var cipher = CryptoJS.AES.encrypt(temp,key).toString();
    var hashkey= CryptoJS.MD5(key);
    fs.writeFileSync(req.files[0].path,cipher);
    //fs.renameSync(req.files[0].path.slice(15), name)
    var hashmsg= CryptoJS.MD5(message);
    var hashcipher=CryptoJS.MD5(cipher);
    console.log(hashcipher);
    let encryptedfile={
        id: shortid.generate(),
        name: name,
        cipher: req.files[0].path.slice(15),
        mimetype: mimetype,
        hashmsg: hashmsg,
        hashkey: hashkey
    }
    db.get('encryptedfiles').push(encryptedfile).write(); 
    /*fs.unlinkSync(req.files[1].path);
    var decrypted = CryptoJS.AES.decrypt(cipher, key);
    var temp2 = decrypted.toString(CryptoJS.enc.Utf8)
    var originalText = temp2.toString("base64")
    let buff = Buffer.from(temp2,"utf-8","base64");
    console.log(CryptoJS.MD5(buff), buff);
    fs.writeFileSync('new.png', buff);*/
    res.redirect('/view')
}