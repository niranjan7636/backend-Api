require("dotenv").config();
const express = require("express");
const { router } = require("./routes/routers");
const taskRouter = require("./routes/taskRoutes");
const cors = require("cors")

const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middlewares/error");

const server = express();
server.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET","POST","PUT" , "DELETE"],
    credentials : true,
}))
server.use(express.json());
server.use(cookieParser());

server.use("/api/v1/users" , router)
server.use("/api/v1/task" , taskRouter)
server.use(errorMiddleware)

module.exports = {server}
