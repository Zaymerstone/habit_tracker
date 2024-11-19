import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

export default function ProfilePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5", // Optional background color for the page
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
          <Stack spacing={1}>
            <Typography variant="h6">Days Active:</Typography>
            <Typography variant="h6">Habits Count:</Typography>
            <Typography variant="h6">Best Streak:</Typography>
            <Typography variant="h6">Best Level:</Typography>
            <Typography variant="h6">Best Mastery:</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
