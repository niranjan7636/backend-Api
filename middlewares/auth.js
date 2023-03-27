const jwt = require('jsonwebtoken');
const { User } = require("../models/user");

const isAuth = async(req,res,next)=>{

    const {token} = req.cookies;
    if(!token) return res.status(404).json({
        "success" : false,
        "message" : "Login First"
    })

    const data =  jwt.verify(token , process.env.KEY);

    req.user = await User.findById(data._id).select({password : false});
    next();

}


module.exports = {isAuth}