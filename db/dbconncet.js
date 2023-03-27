const mongoose = require("mongoose");



const connectDb = async()=>{
   try {
    
    const dataBase = await mongoose.connect(process.env.CONECTION_STRING, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    console.log("Database Connected",  dataBase.connection.host , dataBase.connection.name)



   } catch (error) {
        console.log(error)
        process.exit(1);



   }
   
   

}

module.exports = {connectDb}




