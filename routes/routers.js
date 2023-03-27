const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const {
  getUsers,
  getUserDetails,
   logout,
  register,
  login,
} = require("../controllers/user");
const {isAuth} = require("../middlewares/auth")




router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);




router.get("/all",isAuth, getUsers);


router.get("/me",isAuth,getUserDetails);
router.get("/all",isAuth, getUsers);


module.exports = { router };
