import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../app/shared/hooks/redux";
import { formatDate } from "../../../utils";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user);

  const habitWithHighestStreak = Math.max(...user.habits.map((h) => (h.max_streak)))
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "91%",
        backgroundColor: "#E8F9FF", // Optional background color for the page
        padding: 2,
      }}
    >
      {/* Profile Card */}
      <Card
        sx={{
          width: 400, // Set card width
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center", // Center content
        }}
      >
        <CardContent>
          {/* Profile Picture */}
          <Avatar
            alt="Profile Picture"
            src="/static/images/avatar/1.jpg" // Replace with your profile image URL
            sx={{ width: 120, height: 120, margin: "0 auto", mb: 2 }}
          />
          {/* Change Picture Button */}
          <Button variant="contained" color="primary" sx={{ mb: 3 }}>
            Change Picture
          </Button>
          {/* Stats Section */}
          <Box>
            <Typography variant="h6">Active since: {formatDate(user.createdAt)}</Typography>
            {/* <Typography variant="h6">Current Level: {user.level}</Typography> */}
            <Typography variant="h6">Habits Count: {user.habits.length}</Typography>
            <Typography variant="h6">Max Habit Streak: {habitWithHighestStreak}</Typography>
            <Typography variant="h6">Masteries achieved: {user.achievements.length}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
