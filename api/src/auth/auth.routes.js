const express = require("express");

const { register, login, checkUser } = require("./auth.controller");
const { authToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", authToken, checkUser); // check user ручка // (path, middleware, checkuser)

module.exports = { authRouter: router };
