const express = require('express');

const router = express.Router();
const { client } = require("../db");
const jwt = require("jsonwebtoken");
const passKey = require('../config.js').JWT_SECRET_KEY;
const  { validator } = require("../middleware");


router.post('/signup',validator, async function(req, res){
    const username = req.body.name;
    const email = req.body.username;
    const password = req.body.password;


    // const check1 = await User.findOne({username : username});
    // const check2 = await User.findOne({name : name});
    // if(check1 || check2){
    //     return res.status(403).json({msg : "User already exists!"});
    // }
    // const user = new User({
    //     name : name,
    //     username : username,
    //     password : password
    // });

    // user.save();
    // await client.connect();
    const lookup = await client.query(`
        SELECT * FROM users WHERE username = $1 OR email = $2;
    `, [username, email])
    if(lookup.row_length > 0){
        return res.sendStatus(409);
    }
    await client.query(`
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3);
    `, [username, email, password]);
    var token = jwt.sign({username: email}, passKey);
    return res.status(200).json({token : token});
});

router.post('/login', async function(req, res){
    const email = req.body.username;
    const password = req.body.password;
    // const check1 = await User.findOne({username : username, password : password});
    // const check2 = await User.findOne({name : username, password : password});
    // if(!(check1 || check2)){
    //     return res.status(403).json({msg : "Wrong Username of Password!"});
    // }
    // const fin = check1 == null ? check2 : check1;

    // client.connect();
    const lookup = await client.query(`
        SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2;
    `, [email, password])
    // client.end();
    if(lookup.row_length == 0){
        return res.sendStatus(409);
    }

    var token = jwt.sign({username: lookup.rows[0].email}, passKey);
    return res.status(200).json({token : token});
});

module.exports = router;