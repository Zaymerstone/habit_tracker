const {
  User,
  Habit,
  UserAchievement,
  CompletedHabit,
  Mastery,
  sequelize,
} = require("../../db/models");

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
  console.log(id);

  try {
    const oldHabit = await Habit.findOne({
      where: { id },
    });

    if (!oldHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    await sequelize.transaction(async (t) => {
      await CompletedHabit.destroy(
        { where: { habitId: id } },
        { transaction: t }
      );
      await UserAchievement.destroy(
        { where: { habitId: id } },
        { transaction: t }
      );
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

async function completeHabit(req, res) {
  const { id } = req.body;
  const userId = req.userId;

  try {
    const targetHabit = await Habit.findOne({
      where: { id },
    });

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!targetHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const result = canCompleted(targetHabit.lastCompletion);
    console.log(result);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    const newHabitData = calculateStreak(targetHabit);

    const masteries = await Mastery.findAll({
      order: [["streak_target", "DESC"]],
    });
    const achievementData = checkAchievement(
      masteries,
      newHabitData.streak
    );

    // console.log("New habit data: ", newHabitData);
    let newAchievement;
    await sequelize.transaction(async (t) => {
      await Habit.update(newHabitData, { where: { id } });

      await User.update({ xp: user.xp + 20 }, { where: { id: userId } });

      if (achievementData) {
        newAchievement = await UserAchievement.create({
          userId,
          habitId: id,
          ...achievementData,
        });
      }

      await CompletedHabit.create({
        userId,
        habitId: id
      });
    });

    return res.status(201).json({
      message: "Successfully completed habit",
      achievement: {
        ...newAchievement,
      },
    });
  } catch (error) {
    console.error("Error deleting habbit", error);
    return res.status(500).json({ message: "Error deleting habbit" });
  }
}

//Habit controller util functions
function canCompleted(lastCompletion) {
  const currentDate = new Date();

  const difference = currentDate - lastCompletion;

  console.log("Last completion: ", lastCompletion);
  console.log("Current date: ", currentDate);
  console.log("The date difference: ", difference);

  if (difference < 86400000) {
    return { success: false, message: "Can be completed only once a day" };
  }

  return { success: true };
}

function calculateStreak(habit) {
  let { streak, max_streak, lastCompletion, everyday, days } = habit;
  const currentDate = new Date();
  
  if (!lastCompletion) {
    // No previous completion means no streak
    return { streak: 1, max_streak: 1, lastCompletion: new Date()};
  }

  const difference = currentDate - lastCompletion;
  const oneDayMs = 86400000; // 24 hours in milliseconds

  if (everyday) {
    if (difference >= oneDayMs * 2) {
      streak = 0; // Reset streak if more than 2 days gap
    } else {
      streak += 1;
      max_streak = Math.max(max_streak, streak);
    }
  } else {
    const lastCompletionDay = lastCompletion.getDay(); // 0 (Sunday) - 6 (Saturday)
    const currentDay = currentDate.getDay(); 

    const daysBetween = [];
    let i = (lastCompletionDay + 1) % 7;
    
    // Collect all days between lastCompletion and today
    while (i !== currentDay) {
      daysBetween.push(i);
      i = (i + 1) % 7;
    }

    // Check if any missing days were supposed to be done
    if (days.some((d) => daysBetween.includes(d))) {
      streak = 0; // Break streak if any required day was skipped
    } else {
      const weekDifference = Math.floor(difference / (7 * oneDayMs));
      if (weekDifference > 0) {
        streak = 0; // More than a week passed, reset streak
      } else {
        streak += 1;
        max_streak = Math.max(max_streak, streak);
      }
    }
  }

  return { streak, max_streak, lastCompletion: new Date() };
}


function checkAchievement(masteries, streak) {
  const result = masteries.find((m) => m.streak_target === streak);
  if (result) {
    return { masteryId: result.id };
  }
}

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
};
