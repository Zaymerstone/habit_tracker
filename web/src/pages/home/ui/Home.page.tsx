// import { increment } from "../../../entitites/user/models/user.slice";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Example icon

export default function HomePage() {
  // const dispatch = useAppDispatch();
  // const value = useAppSelector((state) => state.counter.value);
  // const [number, setNumber] = useState<number>(0);
  // console.log(number);
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        padding: 2,
        gap: 2,
        backgroundColor: "#f5f5f5",
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
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: 3,
          minWidth: 0, // Prevent horizontal scroll
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Your Habits
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5].map((habit) => (
            <Grid item xs={12} key={habit}>
              <Card sx={{ boxShadow: 2, padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">Name of Habit</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    This is the description of habit.
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Level: 1
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Days for the next mastery:
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" color="primary" size="small">
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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
        {[1, 2, 3].map((mastery) => (
          <Card
            key={mastery}
            sx={{
              boxShadow: 3,
              padding: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              height: 120,
            }}
          >
            <Avatar sx={{ backgroundColor: "#1976d2", width: 50, height: 50 }}>
              <AccessTimeIcon fontSize="small" sx={{ color: "#ffffff" }} />
            </Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Here will be the name of the mastery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Here will be name of habit
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Here will be the date acquired
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
