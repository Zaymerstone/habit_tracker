import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { AchievementData } from "../../../../entitites/user/models/user.slice";
import Bronze from "../../../../assets/bronze.png"
import Silver from "../../../../assets/silver.png"
import Gold from "../../../../assets/gold.png"
import { HabitData } from "../../../../entitites/habit/models/habit.slice";
import { formatDate, getDayNameByIndex } from "../../../../utils";

interface HabitProps {
    habit: HabitData
    achievements: AchievementData[]
    editHandler: (habit: HabitData) => void
    deleteHandler: (id: number) => void
    completeHandler: (id: number) => void
}

const masteryImages = [Bronze, Silver, Gold]
console.log(masteryImages)

function Habit({ habit, achievements, editHandler, deleteHandler, completeHandler }: HabitProps) {
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
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Days habit should be done: <Typography component="span" fontWeight="600" fontSize="1.2rem">{habit.everyday ? "Daily" : `${habit.days.map(d => getDayNameByIndex(d)).join(", ")}`}</Typography>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Last completion date: <Typography component="span" fontWeight="600" fontSize="1.2rem">{habit.lastCompletion ? formatDate(habit.lastCompletion) : "Not completed yet"}</Typography>
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" color="info" size="small" onClick={() => editHandler(habit)}>
                        Edit
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => deleteHandler(habit.id)}>
                        Delete
                    </Button>
                    <Button variant="contained" color="primary" size="small" onClick={() => completeHandler(habit.id)}>
                        Complete
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default Habit