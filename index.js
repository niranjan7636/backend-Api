const {server} = require("./server");
const {connectDb} = require("./db/dbconncet");
const port = process.env.PORT || 3000;


connectDb();



server.listen(port , ()=>{
    
    console.log(`Server is Working on port : ${process.env.PORT} In ${process.env.NODE_ENV}`)
})


