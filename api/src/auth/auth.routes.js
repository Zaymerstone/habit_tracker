const express = require("express");
const upload = require("../middlewares/upload.middleware")
const { register, login, checkUser, changeAvatar } = require("./auth.controller");
const { authToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", authToken, checkUser); // check user ручка // (path, middleware, checkuser)
router.post("/changeAvatar", authToken, upload.single('image'), changeAvatar); 

module.exports = { authRouter: router };
