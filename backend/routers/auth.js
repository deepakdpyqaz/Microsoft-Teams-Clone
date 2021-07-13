const express = require("express");
const router = express.Router();
const User = require("../models/user");
const randomGenerator = require("../helpers/randomGenerator");
router.get("/",(req,res)=>{
    res.status(401).json({"message":"Use post methods only"})
})
router.post("/login",async (req,res) =>{
    const email = req.body['email'];
    const password = req.body['password'];
    if(email && password)
    {
        try{
            const user = await User.findOne({email,password});
            if(!user){
                res.status(400).json({"message":"Either email or password is incorrect"});
                return;
            }
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).json({"message":err});
        }
    }
    else{
        res.send(400).message({"message":"Either email or password is missing"});
    }
})
router.post("/signup",async (req,res)=>{
    const email = req.body['email'];
    const password = req.body['password'];
    const name = req.body['name'];
    if(email&&password&&name)
    {
        try{
            let user = new User({email,password,token:randomGenerator(10),name});
            await user.save();
            res.status(201).json({"message":"User created successfully"});
        }
        catch(err){
            res.status(401).json({"message":"Username already exists"});
        }
    }
    else{
        res.status(400).json({"message":"Either email or password is missing"});
    }
})
router.post("/jwt",async (req,res)=>{
    const token = req.body.token;
    if(!token)
    {
        return res.status(400).json({"message":"Token not provided"});
    };
    const user = await User.findOne({token});
    if(!user)
    {
        return res.status(401).json({"message":"Unauthorized"});
    }
    return res.status(200).json(user);

})
module.exports = router;