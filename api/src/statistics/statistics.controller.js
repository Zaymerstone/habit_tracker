const {
  CompletedHabit,
} = require("../../db/models");

async function getPersonalCompletionData(req, res) {
  try {
    const userId = req.userId;

    const habitId = req.habitId;

    const habitCompletions = await CompletedHabit.findAll({
      where: { userId: userId, habitId: habitId },
    });

    return res.status(200).json(habitCompletions);
  } catch (error) {
    console.error("Error getting habit completions", error);
    return res.status(500).json({ message: "Error getting habit completions" });
  }
}

module.exports = {
  getPersonalCompletionData
};
