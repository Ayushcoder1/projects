const express = require('express');

const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const passKey = require('../config.js').JWT_SECRET_KEY;
const  { validator } = require("../middleware");


router.post('/signup',validator, async function(req, res){
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    const check1 = await User.findOne({username : username});
    const check2 = await User.findOne({name : name});
    if(check1 || check2){
        return res.status(403).json({msg : "User already exists!"});
    }
    const user = new User({
        name : name,
        username : username,
        password : password
    });

    user.save();
    var token = jwt.sign({username: username}, passKey);
    return res.status(200).json({token : token});
});

router.post('/login', async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const check1 = await User.findOne({username : username, password : password});
    const check2 = await User.findOne({name : username, password : password});
    if(!(check1 || check2)){
        return res.status(403).json({msg : "Wrong Username of Password!"});
    }
    const fin = check1 == null ? check2 : check1;

    var token = jwt.sign({username: fin.username}, passKey);
    return res.status(200).json({token : token});
});

module.exports = router;