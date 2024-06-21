const express = require('express');
const router = express.Router();


//Below are Chained middlewares

//Middleware to retrieve IP address
router.get('/whoami', (req, res, next) => {

    //initializing request object to hold retrieved values from get method
    req.headerData = {};
    
    //Middle Retrieving ip address and attach it to initialised req above
    if (!req.ip){
        return res.json({error: 'Invalid request'})
    } else {
        req.headerData.ip = req.ip; 
        next();
    }

    //Middle Retrieving language from request 
}, (req, res, next) => {
   const lang = req.acceptsLanguages(['fr', 'en']);
  
    if (!lang){
        return res.json({error: 'Invalid request'})
    } else {
        req.headerData.language= lang;
        next();
    }

    //Middle Retrieving software from request object
}, (req, res, next) => {
   const software = req.get('User-Agent');

    if(!software){
        return res.json({error: 'Invalid request'});
    } else {
        req.headerData.software= software;
        next();
    }

    //Middleware to send response after retrieval of ip address, language and software
} , (req, res) => {
    const { ip, language, software } = req.headerData;
    res.json({'ipaddress': ip, 'language': language, 'software': software});
});
    





module.exports = router;