// import { increment } from "../../../entitites/user/models/user.slice";

import {
  Box,
  Typography,
} from "@mui/material";
import theme from "../../../styles/theme";
import { useAppSelector } from "../../../app/shared/hooks/redux";
import Habit from "../../../app/shared/components/habit/habit.component";
import Achievement from "../../../app/shared/components/achievement/achievement.component";

export default function HomePage() {
  // const dispatch = useAppDispatch();
  // const value = useAppSelector((state) => state.counter.value);
  // const [number, setNumber] = useState<number>(0);
  // console.log(number);
  const habits = useAppSelector((state) => state.user.habits);
  const achievements = useAppSelector((state) => state.user.achievements);
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
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
          maxHeight: "100vh",
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
        <Box>
          {habits.map((habit) => (
            <Habit habit={habit} achievements={achievements} key={habit.id} />
          ))}
        </Box>
      </Box>

      {/* Right Side - Mastery Section */}
      <Box
        sx={{
          flex: 1, // 25% width
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0, // Prevent horizontal scroll
        }}
      >
        {achievements.map((achievement, i) => (
          <Achievement achievement={achievement} key={i}/>
        ))}
      </Box>
    </Box>
  );
}
