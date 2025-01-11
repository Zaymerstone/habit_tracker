import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { AchievementData, HabitData } from "../../../../entitites/user/models/user.slice";
import Bronze from "../../../assets/bronze.png";
import Silver from "../../../assets/silver.png";
import Gold from "../../../assets/gold.png";

interface HabitProps {
    habit: HabitData
    achievements: AchievementData[]
}

const masteryImages = [Bronze, Silver, Gold]

function Habit({ habit, achievements }: HabitProps) {
    const habitMasteries = achievements.filter(a => a.Habit.id === habit.id).sort((a, b) => a.Mastery.streak_target - b.Mastery.streak_target)
    return (
        <Card sx={{ boxShadow: 2, padding: 2 }}>
            <CardContent>
                <Box display="flex"
                    alignItems="center" gap="1rem" marginBottom="1rem">
                    <Typography variant="h4">{habit.name}</Typography>
                    {habitMasteries.map((m, i) => (
                        <img width={40} height={40} src={masteryImages[m.Mastery.id - 1]} key={i} />
                    ))}
                </Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Current streak is <Typography component="span" fontWeight="600" fontSize="1.2rem">{habit.streak}</Typography>
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
    )
}

export default Habit