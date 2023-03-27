
const jwt = require('jsonwebtoken');

const sendCookie = (user , res,message,statusCode=200)=>{
    let token = null;
    token = jwt.sign({_id: user._id}, process.env.KEY);

    res.status(statusCode).cookie("token" , token , {
        httpOnly : true,
        maxAge : 15*60*1000,
        sameSite : process.env.NODE_ENV === "development"? "lax" : "none",
        secure : process.env.NODE_ENV === "development"? false : true,

    } ).json({
        "success" : true,
        message,
    })
}

module.exports = {sendCookie}