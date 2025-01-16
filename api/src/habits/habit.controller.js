const { Habit, UserAchievement, sequelize } = require("../../db/models");

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

async function createHabit(req, res) {
  const { name, days, everyday } = req.body;

  try {
    const userId = req.userId;

    const newHabit = await Habit.create({
      name,
      max_streak: 0,
      streak: 0,
      days,
      everyday,
      userId,
    });

    return res.status(201).json({
      message: "Successful habit creation",
      habit: {
        id: newHabit.id,
        name: newHabit.name,
        days: newHabit.days,
        everyday: newHabit.everyday,
        userId: newHabit.userId,
      },
    });
  } catch (error) {
    console.error("Error creating habbit", error);
    return res.status(500).json({ message: "Error creating habbit" });
  }
}

async function updateHabit(req, res) {
  const { name, days, everyday, id } = req.body;

  try {
    const oldHabit = await Habit.findOne({
      where: { id },
    });

    if (!oldHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const result = await Habit.update(
      {
        name,
        days,
        everyday,
      },
      { where: { id } }
    );
    console.log(result);

    return res.status(201).json({
      message: "Successfully updated habit",
      habit: {
        id,
        name,
        days,
        everyday,
      },
    });
  } catch (error) {
    console.error("Error updating habbit", error);
    return res.status(500).json({ message: "Error updating habbit" });
  }
}

async function deleteHabit(req, res) {
  const { id } = req.body;
  console.log(id)

  try {
    const oldHabit = await Habit.findOne({
      where: { id },
    });

    if (!oldHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    await sequelize.transaction(async (t) => {
      await UserAchievement.destroy({ where: { habitId: id } }, { transaction: t });
      await Habit.destroy({ where: { id } }, { transaction: t });
    });

    return res.status(201).json({
      message: "Successfully deleted habit and it's achievements",
      habit: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting habbit", error);
    return res.status(500).json({ message: "Error deleting habbit" });
  }
}

module.exports = { getHabits, createHabit, updateHabit, deleteHabit };
