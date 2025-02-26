const express = require("express");

const { getPersonalCompletionData } = require("./statistics.controller");
const { authToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/get_personal_completion_data", authToken, getPersonalCompletionData);


module.exports = { statisticsRouter: router };
