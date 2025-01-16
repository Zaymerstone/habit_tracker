const express = require("express");

const { getHabits, createHabit, updateHabit, deleteHabit } = require("./habit.controller");
const { authToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/get", authToken, getHabits);
router.post("/create", authToken, createHabit);
router.post("/update", authToken, updateHabit);
router.delete("/delete", authToken, deleteHabit);

module.exports = { habitRouter: router };
