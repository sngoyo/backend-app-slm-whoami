const express = require('express');
const router = express.Router();


//middleware
//Retriving IP address
//req.socket.remoteAddress
router.get('/whoami', (req, res, next) => {
    req.headerData = {};

    if (!req.ip){
        return res.json({error: 'Invalid request'})
    } else {
        req.headerData.ip = req.ip; 
        next();
    }

}, (req, res, next) => {
   const lang = req.acceptsLanguages(['fr', 'en']);
  
    if (!lang){
        return res.json({error: 'Invalid request'})
    } else {
        req.headerData.language= lang;
        next();
    }

}, (req, res, next) => {
   const software = req.get('User-Agent');
    //const software = req.headers['User-Agent'];
    if(!software){
        return res.json({error: 'Invalid request'});
    } else {
        req.headerData.software= software;
        next();
    }

} , (req, res) => {
    const { ip, language, software } = req.headerData;
    res.json({'ipaddress': ip, 'language': language, 'software': software});
});
    





module.exports = router;