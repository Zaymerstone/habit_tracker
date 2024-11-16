const express = require("express");

const { register, login, checkUser } = require("./auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", checkUser); // check user ручка

module.exports = { authRouter: router };
