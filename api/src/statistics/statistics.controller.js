const { CompletedHabit, Habit } = require("../../db/models");
const { Op } = require("sequelize");
const { format } = require("date-fns"); 

async function getPersonalCompletionData(req, res) {
  try {
    const userId = req.userId;
    const { habitId } = req.query;
    const currentDate = new Date();

    // Get the first day of the current and two previous months
    const firstDayCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const firstDayPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const firstDayTwoMonthsAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 2,
      1
    );

    // Get the last day of the previous two months
    const lastDayPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    const lastDayTwoMonthsAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0
    );

    // Get the habit details
    const habit = await Habit.findOne({
      where: { id: parseInt(habitId), userId },
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const { days, everyday } = habit;

    // Fetch completed records within the last three months
    const habitCompletions = await CompletedHabit.findAll({
      where: {
        userId,
        habitId,
        createdAt: {
          [Op.between]: [firstDayTwoMonthsAgo, currentDate], // Last two months + current month
        },
      },
    });

    // Helper function to calculate planned completions
    function calculatePlannedCompletions(startDate, endDate) {
      let count = 0;
      let current = new Date(startDate);

      while (current <= endDate) {
        if (everyday || days.includes(current.getDay())) {
          count++;
        }
        current.setDate(current.getDate() + 1);
      }

      return count;
    }

    function getMonthYearString(date) {
      return date.toLocaleString("en-US", { month: "long", year: "numeric" });
    }

    // Organize data into months
    const data = [
      {
        month: getMonthYearString(firstDayTwoMonthsAgo),
        actualCompletions: habitCompletions.filter(
          (h) =>
            new Date(h.createdAt) >= firstDayTwoMonthsAgo &&
            new Date(h.createdAt) <= lastDayTwoMonthsAgo
        ).length,
        plannedCompletions: calculatePlannedCompletions(
          firstDayTwoMonthsAgo,
          lastDayTwoMonthsAgo
        ),
      },
      {
        month: getMonthYearString(firstDayPrevMonth),
        actualCompletions: habitCompletions.filter(
          (h) =>
            new Date(h.createdAt) >= firstDayPrevMonth &&
            new Date(h.createdAt) <= lastDayPrevMonth
        ).length,
        plannedCompletions: calculatePlannedCompletions(
          firstDayPrevMonth,
          lastDayPrevMonth
        ),
      },
      {
        month: getMonthYearString(firstDayCurrentMonth),
        actualCompletions: habitCompletions.filter(
          (h) => new Date(h.createdAt) >= firstDayCurrentMonth
        ).length,
        plannedCompletions: calculatePlannedCompletions(
          firstDayCurrentMonth,
          currentDate
        ),
      },
    ];

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting habit completions", error);
    return res.status(500).json({ message: "Error getting habit completions" });
  }
}

async function getUserActivity(req, res) {
  try {
    const { period } = req.query;

    if (!["year", "month", "week", "day"].includes(period)) {
      return res.status(400).json({ message: "Invalid period type" });
    }

    let startDate;
    let breakpoints = [];
    let dateFormat;

    if (period === "year") {
      // Start date is exactly 365 days ago
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 365);
      dateFormat = "d MMM";
      // Breakpoints: First day of each month for the last 12 months
      for (let i = 11; i >= 0; i--) {
        let month = new Date();
        month.setMonth(month.getMonth() - i);
        month.setDate(1);
        month.setHours(0, 0, 0, 0);
        breakpoints.push(month);
      }
    } else if (period === "month") {
      // Start date is exactly 30 days ago
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      dateFormat = "d MMM";

      // Breakpoints: Every 5th day in the last 30 days
      for (let i = 30; i >= 0; i -= 5) {
        let day = new Date();
        day.setDate(day.getDate() - i);
        day.setHours(0, 0, 0, 0);
        breakpoints.push(day);
      }
    } else if (period === "week") {
      // Start date is exactly 7 days ago
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      dateFormat = "d MMM";

      // Breakpoints: Each day for the last 7 days
      for (let i = 7; i >= 0; i--) {
        let day = new Date();
        day.setDate(day.getDate() - i);
        day.setHours(0, 0, 0, 0);
        breakpoints.push(day);
      }
    } else if (period === "day") {
      // Start date is the beginning of the previous day
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      dateFormat = "h:mm a";

      // Breakpoints: 00:00, 06:00, 12:00, 18:00
      breakpoints = [
        new Date(startDate),
        new Date(startDate.setHours(6)),
        new Date(startDate.setHours(12)),
        new Date(startDate.setHours(18)),
      ];
    }

    // Fetch completed habits within the selected time frame
    const completions = await CompletedHabit.findAll({
      where: { createdAt: { [Op.gte]: startDate } },
      attributes: ["userId", "createdAt"],
    });

    // Process the data
    const activityData = breakpoints.map((point, index) => {
      const nextPoint = breakpoints[index + 1] || new Date();
      const userHabitCounts = new Map(); // Stores habit count per user

      completions.forEach(({ userId, createdAt }) => {
        const date = new Date(createdAt);
        if (date >= point && date < nextPoint) {
          userHabitCounts.set(userId, (userHabitCounts.get(userId) || 0) + 1);
        }
      });

      const activeUsers = userHabitCounts.size;
      const totalHabitsCompleted = [...userHabitCounts.values()].reduce((sum, count) => sum + count, 0);
      const avgHabitsPerUser = activeUsers > 0 ? totalHabitsCompleted / activeUsers : 0;

      return {
        datetime: format(point, dateFormat),
        activeUsers,
        avgHabitsPerUser: parseFloat(avgHabitsPerUser.toFixed(2)), // Round to 2 decimal places
      };
    });

    return res.status(200).json(activityData);
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return res.status(500).json({ message: "Error fetching user activity" });
  }
}

module.exports = {
  getPersonalCompletionData,
  getUserActivity
};
