// import { increment } from "../../../entitites/user/models/user.slice";

import {
  Box,
  Typography,
  Divider,
  Button
} from "@mui/material";
import theme from "../../../styles/theme";
import { useAppDispatch, useAppSelector } from "../../../app/shared/hooks/redux";
import Habit from "../../../app/shared/components/habit/habit.component";
import Achievement from "../../../app/shared/components/achievement/achievement.component";
import { useState } from "react";
import { completeHabit, completeGlobalHabit, deleteHabit, HabitData } from "../../../entitites/habit/models/habit.slice";
import HabitModal from "../../../app/shared/components/habitModal/habitModal.component";
import { checkUser } from "../../../entitites/user/models/user.slice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const habits = useAppSelector((state) => state.user.habits);
  const globalHabits = useAppSelector((state) => state.user.globalHabits);
  const achievements = useAppSelector((state) => state.user.achievements);
  const [editHabit, setEditHabit] = useState<HabitData>();

  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);


  const handleEditHabit = (habit: HabitData) => {
    setEditHabit(habit)
    handleModalOpen()
  }

  const handleDeleteHabit = async (id: number) => {
    try {
      await dispatch(deleteHabit(id)).unwrap();
      dispatch(checkUser()).unwrap();
    } catch (error) {
      console.error("Error deleting habit or checking user:", error);
    }
  };

  const handleCompleteHabit = async (id: number) => {
    try {
      await dispatch(completeHabit(id)).unwrap();
      dispatch(checkUser()).unwrap();
    } catch (error) {
      console.error("Error completing habit or checking user:", error);
    }
  };

  const handleCompleteGlobalHabit = async (id: number) => {
    try {
      await dispatch(completeGlobalHabit(id)).unwrap();
    } catch (error) {
      console.error("Error completing global habit:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "91%",
        padding: 2,
        gap: 2,
        backgroundColor: theme.palette.background.default,
        overflow: "hidden", // Prevent browser scroll
      }}
    >
      {/* Left Side - Habits Section */}
      <Box
        sx={{
          flex: 3, // 75% width
          overflowY: "auto",
          height: "85%",
          padding: 2,
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          boxShadow: 3,
          minWidth: 0, // Prevent horizontal scroll
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Your Habits
        </Typography>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
          {habits.map((habit) => (
            <Habit
              habit={habit}
              achievements={achievements}
              key={habit.id}
              editHandler={handleEditHabit}
              deleteHandler={handleDeleteHabit}
              completeHandler={handleCompleteHabit}
              isGlobal={false}
            />
          ))}
        </Box>

        {globalHabits && globalHabits.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" sx={{ mb: 3 }}>
              Global Habits
            </Typography>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}>
              {globalHabits.map((habit) => (
                <Habit
                  habit={habit}
                  achievements={achievements}
                  key={habit.id}
                  completeHandler={handleCompleteGlobalHabit}
                  isGlobal={true}
                />
              ))}
            </Box>
          </>
        )}
      </Box>

      {/* Right Side - Mastery Section */}
      <Box
        sx={{
          flex: 1, // 25% width
          display: "flex",
          height: "85%",
          flexDirection: "column",
          gap: 2,
          minWidth: 0, // Prevent horizontal scroll
        }}
      >
        {achievements.map((achievement, i) => (
          <Achievement achievement={achievement} key={i} />
        ))}
      </Box>

      <HabitModal habit={editHabit} open={open} title="Edit" onClose={handleModalClose} />
    </Box>
  );
}
