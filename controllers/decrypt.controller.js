const db=require('../db');
const fs = require('fs');
const CryptoJS  = require('crypto-js');

module.exports.index=(req,res)=>{
    res.render('decrypt/index')
};

module.exports.decrypt=(req,res)=>{
    var cipher = fs.readFileSync(req.files[0].path).toString();
    var key= fs.readFileSync(req.files[1].path,"utf8");
    var file=db.get("encryptedfiles").find({cipher: req.files[0].originalname.slice(0,-4)}).value();
    var hashkey= CryptoJS.MD5(key);
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
        var error=["Failed key. Try again"]
        res.render('decrypt/index',{error: error, file: file})
    };
    if(req.body.type=="img"){
        var decrypted = CryptoJS.AES.decrypt(cipher, key);
        var temp2 = decrypted.toString(CryptoJS.enc.Utf8);
        var originalText = temp2.toString("base64");
        var hashdecrypted=CryptoJS.MD5(originalText);
        db.get("encryptedfiles").find({cipher: req.files[0].originalname.slice(0,-4)}).assign({hashdecrypted: hashdecrypted}).write();
        let buff = new Buffer(originalText, 'base64');
        fs.writeFileSync('originalImg.png', buff);
        res.render('view/success',{src: "originalImg.png",id: file.id});
    }
    if(req.body.type=="text"){
        var decrypted  = CryptoJS.AES.decrypt(cipher, key);
        var originalText = decrypted.toString(CryptoJS.enc.Utf8);
        var hashdecrypted=CryptoJS.MD5(originalText);
        db.get("encryptedfiles").find({cipher: req.files[0].originalname.slice(0,-4)}).assign({hashdecrypted: hashdecrypted}).write();
        fs.writeFileSync('originalText.txt',originalText)
        res.render('view/success',{src: "originalText.txt",id: file.id});
    }
    if(req.body.type=="pdf"){
        var decrypted = CryptoJS.AES.decrypt(cipher, key);
        var temp2 = decrypted.toString(CryptoJS.enc.Utf8);
        var originalText = temp2.toString("base64");
        var hashdecrypted=CryptoJS.MD5(originalText);
        db.get("encryptedfiles").find({cipher: req.files[0].originalname.slice(0,-4)}).assign({hashdecrypted: hashdecrypted}).write();
        var buf = Buffer.from(originalText, 'base64');
        fs.writeFile('result_buffer.pdf', buf, error => {
        if (error) {
            throw error;
        } else {
            console.log('buffer saved!');
        }
        });
        res.render('view/success',{src: "result_buffer.pdf",id: file.id});
    }
    if(req.body.type=="audio"){
        var decrypted = CryptoJS.AES.decrypt(cipher, key);
        var temp2 = decrypted.toString(CryptoJS.enc.Utf8);
        var originalText = temp2.toString("base64");
        var hashdecrypted=CryptoJS.MD5(originalText);
        db.get("encryptedfiles").find({cipher: req.files[0].originalname.slice(0,-4)}).assign({hashdecrypted: hashdecrypted}).write();
        var buf = Buffer.from(originalText, 'base64');
        fs.writeFile('result_audio.mp3', buf, error => {
        if (error) {
            throw error;
        } else {
            console.log('buffer saved!');
        }
        });
        res.render('view/success',{src: "result_audio.mp3",id: file.id});
    }
    if(req.body.type=="video"){
        var decrypted = CryptoJS.AES.decrypt(cipher, key);
        var temp2 = decrypted.toString(CryptoJS.enc.Utf8);
        var originalText = temp2.toString("base64");
        var hashdecrypted=CryptoJS.MD5(originalText);
        db.get("encryptedfiles").find({cipher: req.files[0].originalname.slice(0,-4)}).assign({hashdecrypted: hashdecrypted}).write();
        var buf = Buffer.from(originalText, 'base64');
        fs.writeFile('result_video.wmv', buf, error => {
        if (error) {
            throw error;
        } else {
            console.log('buffer saved!');
        }
        });
        res.render('view/success',{src: "result_video.wmv",id: file.id});
    }
}
module.exports.checkHash=(req,res)=>{
    var file=db.get("encryptedfiles").find({id: req.params.id}).value();
    var hashmsg=file.hashmsg;
    var hashdecrypted=file.hashdecrypted;
    var kt=true;
    if(hashmsg.sigBytes==hashdecrypted.sigBytes){
        var wordsmsg=hashmsg.words;
        var worddec=hashdecrypted.words;
        for(var i=0;i<wordsmsg.length;i++){
            if(wordsmsg[i]!==worddec[i]){
                kt=false;
                break;           
            }
        }
    }
    else{
        kt=false;
    }
    if(kt==true){
        var label="Integrity"
    } else {
        var label="Non integrity"
    }
    res.render('view/checkhash', {label: label, wordsmsg: wordsmsg, worddec:worddec, msg:hashmsg.sigBytes, dec: hashdecrypted.sigBytes})
}