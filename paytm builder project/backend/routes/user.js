const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const passKey = require('../config.js').JWT_SECRET_KEY;
const  { authMiddleware } = require("../middleware");

const signup_schema = zod.object({
    username : zod.string().email(),
    name : zod.string(),
    password : zod.string().min(6)
});

const login_schema = zod.object({
    username : zod.string().email(),
    password : zod.string()
});

router.post('/signup', async function(req, res){
    const check = signup_schema.safeParse(req.body);
    if(!check.success){
        return res.status(403).json({msg : "Invalid Username or Password!"});
    }
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    //check if user already exists
    const check1 = await User.findOne({username : username});
    const check2 = await User.findOne({name : name});
    if(check1 || check2){
        return res.status(403).json({msg : "User already exists!"});
    }
    const user = await User.create({
        name : name,
        username : username,
        password : password
    });

    await Account.create({
        userId : user._id,
        balance : Math.random()*10000 + 1
    })

    var token = jwt.sign({username: username}, passKey);
    return res.status(200).json({token : token});
});

router.post('/login', async function(req, res){
    const check = login_schema.safeParse(req.body);
    if(!check.success){
        return res.status(403).json({msg : "Invalid Username or Password!"});
    }
    const username = req.body.username;
    const password = req.body.password;
    const lookup = await User.findOne({username : username, password : password});
    if(!lookup){
        return res.status(403).json({msg : "Wrong Username of Password!"});
    }

    var token = jwt.sign({username: username}, passKey);
    return res.status(200).json({token : token});
});

const update_schema = zod.object({
	password: zod.string().optional(),
    name: zod.string().optional(),
})

router.put('/', authMiddleware, async (req, res) => {
    const { success } = update_schema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg : "Error while updating information"
        });
    }
    await User.updateOne({
        username : req.user
    },
    {
        $set : {
            name : req.body.name,
            password : req.body.password
        }
    });
    res.sendStatus(200);
})

router.get('/list', authMiddleware, async(req, res) => {
    const filter = req.body.filter || "";
    const users = await User.find({
        name : {
            "$regex" : filter
        }
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            name : user.name,
            _id: user._id
        }))
    });
})

module.exports = router