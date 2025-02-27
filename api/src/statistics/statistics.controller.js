const { CompletedHabit, Habit } = require("../../db/models");
const { Op } = require("sequelize");

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

module.exports = {
  getPersonalCompletionData,
};
