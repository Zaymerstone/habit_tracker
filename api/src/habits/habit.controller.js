const { Habit } = require("../../db/models");

async function getHabits(req, res) {
  try {
    const userId = req.userId;

    const userHabits = await Habit.findAll({
      where: { userId: userId },
    });

    return res.status(200).json(userHabits);
  } catch (error) {
    console.error("Error getting habits", error);
    return res.status(500).json({ message: "Error getting habits" });
  }
}

module.exports = { getHabits };
