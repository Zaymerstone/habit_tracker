const express = require("express");
const {
  completeGlobalHabit,
  getGlobalHabitStats,
} = require("./globalHabit.controller");
const { authToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/complete", authToken, completeGlobalHabit);
router.get("/stats", authToken, getGlobalHabitStats);

module.exports = { globalHabitRouter: router };
