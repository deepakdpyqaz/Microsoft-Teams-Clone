const User = require("../models/user");
const  authorize = async (req,res,next)=>{
    let token = req.headers['authorization'];
    if(!token)
    {
        return res.status(401).json({"message":"Unauthorized access"});
    }
    else{
        let user = await User.findOne({token});
        if(!user)
        {
            return res.status(401).json({"message":"Unauthorized access"});
        }
        else{
            req.user = user;
            next();
        }
    }
}

const wsAuthorize = async (socket,next)=>{
    const token = socket.handshake.auth.token;
    if(!token){
        const err = new Error("not authorized");
        err.data = { content: "Login to continue" }; 
        next(err);
    }
    let user = await User.findOne({token});
    if(!user)
    {
        const err = new Error("not authorized");
        err.data = { content: "Login Expired" }; 
        next(err);
    }
    next();
}
const getCurrentUser = async(token)=>{
    let user = await User.findOne({token});
    return user;
}
module.exports = {authorize,wsAuthorize,getCurrentUser};