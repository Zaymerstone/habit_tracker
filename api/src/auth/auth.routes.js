const express = require("express");

const { register, login } = require("./auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/checkUser", ); эндпоит на чек юзера

module.exports = { authRouter: router };
