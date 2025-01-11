const express = require("express");

const { getHabits } = require("./habit.controller");
const { authToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/habits", authToken, getHabits);
// router.post("/habits", authToken, createHabits);

module.exports = { habitRouter: router };
