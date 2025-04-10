import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
    Chip
} from "@mui/material";
import { AchievementData, GlobalHabitData } from "../../../../entitites/user/models/user.slice";
import Bronze from "../../../../assets/bronze.png"
import Silver from "../../../../assets/silver.png"
import Gold from "../../../../assets/gold.png"
import Platinum from "../../../../assets/platinum.png"
import Diamond from "../../../../assets/diamond.png"
import Master from "../../../../assets/master.png"
import { HabitData } from "../../../../entitites/habit/models/habit.slice";
import { formatDate, getDayNameByIndex } from "../../../../utils";

interface HabitProps {
    habit: HabitData | GlobalHabitData
    achievements?: AchievementData[]
    editHandler?: (habit: HabitData) => void
    deleteHandler?: (id: number) => void
    completeHandler: (id: number) => void
    isGlobal?: boolean
}

const masteryImages = [Bronze, Silver, Gold, Platinum, Diamond, Master]

function Habit({ habit, achievements = [], editHandler, deleteHandler, completeHandler, isGlobal = false }: HabitProps) {
    // Filter achievements for this habit
    const habitMasteries = achievements.filter(a => {
        if (isGlobal) {
            // For global habits, check if the achievement has a GlobalHabit that matches this habit's id
            return a.GlobalHabit && a.GlobalHabit.id === habit.id;
        } else {
            // For regular habits, check if the achievement has a Habit that matches this habit's id
            return a.Habit && a.Habit.id === habit.id;
        }
    }).sort((a, b) => a.Mastery.streak_target - b.Mastery.streak_target);

    // Check if habit is completed today
    const isCompletedToday = (): boolean => {
        if (!habit.lastCompletion) return false;

        const today = new Date().toDateString();
        const lastCompletion = new Date(habit.lastCompletion).toDateString();

        return today === lastCompletion;
    };

    // Format days array to day names
    const formatDays = (days: number[]): string => {
        if (!days || days.length === 0) return "No days selected";
        return days.map(day => getDayNameByIndex(day)).join(", ");
    };

    return (
        <Card sx={{ boxShadow: 2, padding: 2 }}>
            <CardContent>
                <Box display="flex"
                    alignItems="center" gap="1rem" marginBottom="1rem">
                    <Typography variant="h4">{habit.name}</Typography>
                    {isGlobal && (
                        <Chip
                            label="Global"
                            color="primary"
                            size="small"
                            sx={{ ml: 1 }}
                        />
                    )}
                    {isCompletedToday() && (
                        <Chip
                            label="Completed Today"
                            color="success"
                            size="small"
                            sx={{ ml: 1 }}
                        />
                    )}
                    {habitMasteries.map((m, i) => (
                        <img width={40} height={40} src={masteryImages[m.Mastery.id - 1]} key={i} />
                    ))}
                </Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Current streak is <Typography component="span" fontWeight="600" fontSize="1.2rem">{habit.streak}</Typography>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Max streak is <Typography component="span" fontWeight="600" fontSize="1.2rem">{habit.max_streak}</Typography>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Days habit should be done: <Typography component="span" fontWeight="600" fontSize="1.2rem">{habit.everyday ? "Daily" : formatDays(habit.days)}</Typography>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Last completion date: <Typography component="span" fontWeight="600" fontSize="1.2rem">{habit.lastCompletion ? formatDate(habit.lastCompletion) : "Not completed yet"}</Typography>
                </Typography>
                <Stack direction="row" spacing={1}>
                    {!isGlobal && editHandler && (
                        <Button
                            variant="outlined"
                            color="info"
                            size="small"
                            onClick={() => editHandler(habit as HabitData)}
                        >
                            Edit
                        </Button>
                    )}
                    {!isGlobal && deleteHandler && (
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => deleteHandler(habit.id)}
                        >
                            Delete
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={isCompletedToday()}
                        onClick={() => completeHandler(habit.id)}
                    >
                        {isCompletedToday() ? "Completed" : "Complete"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default Habit