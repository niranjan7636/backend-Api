const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema =  mongoose.Schema({
    username : {
        type : String ,
        required : true,
        
    },
    email : {
        type : String,
        unique : true,
        required : true,

       
    },
    password : {
        type : String,
        Select : false,
        required : true,

        
    },
}, {timestamps: true})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    try {
        const hashedPassword  = await bcrypt.hash(this.password,5)
        this.password = hashedPassword;
        next()

    } catch (error) {
        next(err);
        console.log(error)
    }

})




const User = mongoose.model("User" , userSchema)


module.exports = {User }















