const express = require("express");

const { getPersonalCompletionData, getUserActivity } = require("./statistics.controller");
const { authToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/get_personal_completion_data", authToken, getPersonalCompletionData);
router.get("/get_user_activity_data", authToken, getUserActivity);


module.exports = { statisticsRouter: router };
