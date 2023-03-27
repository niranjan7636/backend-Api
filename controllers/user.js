const { User } = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendCookie } = require("../utils/features");
const { errorHandler } = require("../middlewares/error");

const register = async(req,res)=>{
try {
  
  const {username , email , password} = req.body;

  let user = await User.findOne({email});

  if(user) return next(new errorHandler("User Already Exits" , 400))


  sendCookie(user,res,"Registered Successfully" , 201)


user =   await User.create({
      username,
      email,
      password,
  })


} catch (error) {
  next(error)
}


   

   


}




const login = async(req,res,next)=>{
    
try {
  const{email , password} = req.body;
  const user = await User.findOne({email}).select("+password");

  if(!user) return next(new errorHandler("Invalid Login Details" , 400))

  const isMatch = await bcrypt.compare(password , user.password)


  if(!isMatch) return next(new errorHandler("Invalid Login Details" , 400));

  sendCookie(user,res,`Welcome Back ${user.username}` )


} catch (error) {
  next(error)
}


   

}




const logout = async (req, res) => {

try {
  res.status(200).cookie("token" , "",{expires : new Date(Date.now()),
    sameSite : process.env.NODE_ENV === "development"? "lax" : "none",
    secure : process.env.NODE_ENV === "development"? false : true,
  }).json({
    success: true,
    user : req.user,
  
  });


} catch (error) {
  next(error)
  
}



   
  };
  
  







const getUsers = async (req, res) => {
    const {email} = req.user
  const users = await User.find({email}).select({password : false});

  res.status(200).json({
    success: true,
    users,
  });
};











const getUserDetails =  (req, res) => {


    res.status(200).json({
      success: true,
      user : req.user ,
    });

 
};

module.exports = { getUsers, getUserDetails, logout, register,login,};
