const {
  User,
  GlobalHabit,
  UserGlobalHabit,
  GlobalCompletedHabit,
  sequelize,
  Mastery,
  UserAchievement,
} = require("../../db/models");
const { Op } = require("sequelize");

async function completeGlobalHabit(req, res) {
  const { globalHabitId } = req.body;
  const userId = req.userId;

  try {
    const userGlobalHabit = await UserGlobalHabit.findOne({
      where: {
        userId,
        globalHabitId,
      },
      include: [{ model: GlobalHabit }],
    });

    if (!userGlobalHabit) {
      return res
        .status(404)
        .json({ message: "Global habit not found for this user" });
    }

    // Check if already completed today
    const result = canCompleted(userGlobalHabit.lastCompletion);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    // Calculate new streak
    const newHabitData = calculateStreak(userGlobalHabit);

    // Check for achievement
    const masteries = await Mastery.findAll({
      order: [["streak_target", "DESC"]],
    });
    const achievementData = checkAchievement(masteries, newHabitData.streak);

    // Update DB and add XP in a transaction
    const user = await User.findOne({
      where: { id: userId },
    });

    let newAchievement = null;

    await sequelize.transaction(async (t) => {
      // Update global habit progress
      await UserGlobalHabit.update(newHabitData, {
        where: { id: userGlobalHabit.id },
        transaction: t,
      });

      // Add XP to user
      await User.update(
        { xp: user.xp + 20 },
        {
          where: { id: userId },
          transaction: t,
        }
      );

      // Create achievement if milestone reached
      if (achievementData) {
        newAchievement = await UserAchievement.create(
          {
            userId,
            globalHabitId,
            ...achievementData,
          },
          { transaction: t }
        );
      }

      // Record completion
      await GlobalCompletedHabit.create(
        {
          userId,
          globalHabitId,
        },
        { transaction: t }
      );
    });

    return res.status(200).json({
      message: "Successfully completed global habit",
      streak: newHabitData.streak,
      max_streak: newHabitData.max_streak,
      achievement: newAchievement || {},
    });
  } catch (error) {
    console.error("Error completing global habit:", error);
    return res.status(500).json({ message: "Error completing global habit" });
  }
}

// Get global habit statistics for comparison between users
async function getGlobalHabitStats(req, res) {
  try {
    // Get all global habits
    const globalHabits = await GlobalHabit.findAll({
      attributes: ["id", "name"],
    });

    // Get statistics for each global habit
    const stats = await Promise.all(
      globalHabits.map(async (habit) => {
        // Get average streak across all users for this habit
        const avgStats = await UserGlobalHabit.findOne({
          attributes: [
            [sequelize.fn("AVG", sequelize.col("streak")), "avgStreak"],
            [sequelize.fn("AVG", sequelize.col("max_streak")), "avgMaxStreak"],
            [sequelize.fn("COUNT", sequelize.col("userId")), "userCount"],
          ],
          where: {
            globalHabitId: habit.id,
            streak: { [Op.gt]: 0 }, // Only count users who have completed the habit at least once
          },
          raw: true,
        });

        // Get current user's stats
        const userStreak = await UserGlobalHabit.findOne({
          where: {
            userId: req.userId,
            globalHabitId: habit.id,
          },
          attributes: ["streak", "max_streak"],
          raw: true,
        });

        // Calculate top percentile (users with higher streaks)
        const usersWithHigherStreak = await UserGlobalHabit.count({
          where: {
            globalHabitId: habit.id,
            streak: { [Op.gt]: userStreak?.streak || 0 },
          },
        });

        const totalUsers = await UserGlobalHabit.count({
          where: {
            globalHabitId: habit.id,
            streak: { [Op.gt]: 0 }, // Only count users who have completed the habit at least once
          },
        });

        // Calculate percentile (lower is better - means fewer people have higher streaks than you)
        const percentile =
          totalUsers > 0
            ? Math.round((usersWithHigherStreak / totalUsers) * 100)
            : 0;

        return {
          id: habit.id,
          name: habit.name,
          avgStreak: parseFloat(avgStats.avgStreak || 0).toFixed(1),
          avgMaxStreak: parseFloat(avgStats.avgMaxStreak || 0).toFixed(1),
          userCount: parseInt(avgStats.userCount || 0),
          userStreak: userStreak?.streak || 0,
          userMaxStreak: userStreak?.max_streak || 0,
          percentile: 100 - percentile, // Convert to "better than X%" format
        };
      })
    );

    return res.status(200).json({
      globalHabitStats: stats,
    });
  } catch (error) {
    console.error("Error fetching global habit stats:", error);
    return res
      .status(500)
      .json({ message: "Error fetching global habit statistics" });
  }
}

// Helper functions
function canCompleted(lastCompletion) {
  if (!lastCompletion) return { success: true };

  const currentDate = new Date();
  const lastCompletionDate = new Date(lastCompletion);

  // Check if same day
  if (currentDate.toDateString() === lastCompletionDate.toDateString()) {
    return { success: false, message: "Can be completed only once a day" };
  }

  return { success: true };
}

function calculateStreak(userGlobalHabit) {
  let { streak, max_streak, lastCompletion } = userGlobalHabit;
  const globalHabit = userGlobalHabit.GlobalHabit;
  const { everyday, days } = globalHabit;

  const currentDate = new Date();

  if (!lastCompletion) {
    // First completion
    return {
      streak: 1,
      max_streak: 1,
      lastCompletion: new Date(),
    };
  }

  const lastCompletionDate = new Date(lastCompletion);
  const oneDayMs = 86400000; // 24 hours in milliseconds
  const difference = currentDate - lastCompletionDate;

  if (everyday) {
    if (difference >= oneDayMs * 2) {
      streak = 1; // Reset streak if more than 2 days gap
    } else {
      streak += 1;
      max_streak = Math.max(max_streak, streak);
    }
  } else {
    // For non-everyday habits
    const lastCompletionDay = lastCompletionDate.getDay();
    const currentDay = currentDate.getDay();

    const daysBetween = [];
    let i = (lastCompletionDay + 1) % 7;

    while (i !== currentDay) {
      daysBetween.push(i);
      i = (i + 1) % 7;
    }

    if (days.some((d) => daysBetween.includes(d))) {
      streak = 1; // Break streak if any required day was skipped
    } else {
      streak += 1;
      max_streak = Math.max(max_streak, streak);
    }
  }

  return {
    streak,
    max_streak,
    lastCompletion: new Date(),
  };
}

function checkAchievement(masteries, streak) {
  const result = masteries.find((m) => m.streak_target === streak);
  if (result) {
    return { masteryId: result.id };
  }
}

module.exports = { completeGlobalHabit, getGlobalHabitStats };
