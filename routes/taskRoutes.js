const express = require("express");
const router = express.Router();
const { Task } = require("../models/task");
const {
  newTask,
  getMyTask,
  updateTask,
  deleteTask
} = require("../controllers/task");
const {isAuth} = require("../middlewares/auth")


router.post("/new" ,isAuth ,  newTask)
router.get("/my" ,isAuth ,  getMyTask)

router.route("/:id").put(isAuth , updateTask).delete( isAuth,deleteTask)









module.exports = router;
