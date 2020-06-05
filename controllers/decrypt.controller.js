const db=require('../db');
const fs = require('fs');
const CryptoJS  = require('crypto-js');

module.exports.index=(req,res)=>{
    res.render('decrypt/index')
};

module.exports.decrypt=(req,res)=>{
    var cipher = fs.readFileSync(req.files[0].path).toString();
    var key= fs.readFileSync(req.files[1].path,"utf8");
    var decrypted = CryptoJS.AES.decrypt(cipher, key);
    var temp2 = decrypted.toString(CryptoJS.enc.Utf8)
    var originalText = temp2.toString("base64");
    let buff = new Buffer(originalText, 'base64');
    fs.writeFileSync('new.png', buff);
    /*var decrypted  = CryptoJS.AES.decrypt(cipher, key);
    var originalText = decrypted.toString(CryptoJS.enc.Utf8);
    var hashdecrypted=CryptoJS.MD5(originalText);
    var file=db.get("encryptedfiles").find({cipher: req.files[0].originalname});
    console.log(file.value())
    file.set({hashdecrypted: hashdecrypted}).write();*/
    res.redirect('/view');
    /*var hashkey= CryptoJS.MD5(key);
    var kt=true;
    if(hashkey.sigBytes==file.hashkey.sigBytes){
        var wordsdr=hashkey.words;
        var wordsen=file.hashkey.words;
        for(var i=0;i<wordsdr.length;i++){
            if(wordsdr[i]!==wordsen[i]){
                kt=false;
                break;
                
            }
        }
    }
    else{
        kt=false;
    }
    if(kt==false){
        var error=["Failed key"]
        res.render('view/detail',{error: error, file: file})
    };
    if(file.mimetype.indexOf("image/")!=-1){
        var decrypted = CryptoJS.AES.decrypt(file.cipher, key);
        var temp2 = decrypted.toString(CryptoJS.enc.Utf8)
        var originalText = temp2.toString("base64");
        let buff = new Buffer(originalText, 'base64');
        fs.writeFileSync('new.png', buff);
        res.render('view/content')
    };*/
    /*if(file.mimetype.indexOf("text/")!==-1){
        var decrypted  = CryptoJS.AES.decrypt(cipher, key);
        var originalText = decrypted.toString(CryptoJS.enc.Utf8);
        console.log(originalText)
        res.render('view/content',{content: originalText})
    }*/
    /*var decrypted = CryptoJS.AES.decrypt(cipher, key);
    var temp2 = decrypted.toString(CryptoJS.enc.Utf8)
    var originalText = temp2.toString("base64")
    var hash2 = CryptoJS.MD5(originalText);
    console.log(hash1);
    console.log(hash2);
    let buff = new Buffer(originalText, 'base64');
    fs.writeFileSync('new.png', buff);*/
    
}
