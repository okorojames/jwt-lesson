const express = require("express");
const router = express.Router();

//
const { postUser, loginUser } = require("../controllers/user_controller");
//
router.post("/create-user", postUser);
router.post("/login-user", loginUser);

//
module.exports = router;
