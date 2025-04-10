import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { MenuItem, Select, FormControl, InputLabel, Box, CircularProgress, Tabs, Tab, Typography } from "@mui/material";
import { fetchPersonalStatistics } from "../../../../entitites/statistics/models/statistics.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { GlobalHabitData } from "../../../../entitites/user/models/user.slice";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define types
interface Habit {
    id: number;
    name: string;
}

type HabitCompletedChartProps = {
    habits: Habit[]
};

const HabitCompletedChart = ({ habits }: HabitCompletedChartProps) => {
    const dispatch = useAppDispatch();
    const statistics = useAppSelector((state) => state.statistics);
    const globalHabits = useAppSelector((state) => state.user.globalHabits);
    const [selectedHabit, setSelectedHabit] = useState<number | "">("");
    const [loading, setLoading] = useState<boolean>(false);
    const [tabValue, setTabValue] = useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setSelectedHabit("");
    };

    const handleHabitChange = (event: any) => {
        setSelectedHabit(event.target.value);
    };

    useEffect(() => {
        setLoading(true);
        if (selectedHabit) {
            dispatch(fetchPersonalStatistics({
                habitId: Number(selectedHabit),
                isGlobal: tabValue === 1
            }));
        }
        setLoading(false);
    }, [selectedHabit, tabValue, dispatch]);

    // Prepare chart data
    const chartData = {
        labels: statistics.statistics.map((s) => s.month),
        datasets: [
            {
                label: "Actual Completions",
                data: statistics ? statistics.statistics.map((s) => s.actualCompletions) : [],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
                label: "Planned Completions",
                data: statistics ? statistics.statistics.map((s) => s.plannedCompletions) : [],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
        ],
    };

    return (
        <Box sx={{ width: 600, height: 450, margin: "auto", textAlign: "center", boxShadow: 3, backgroundColor: "white", padding: 2, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>Habit Completion Statistics</Typography>

            {/* Tab Selection */}
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                sx={{ mb: 2 }}
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="Personal Habits" />
                <Tab label="Global Habits" />
            </Tabs>

            {/* Habit Selector */}
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Habit</InputLabel>
                <Select value={selectedHabit} onChange={handleHabitChange}>
                    {tabValue === 0 ? (
                        // Personal habits
                        habits.map((habit) => (
                            <MenuItem key={habit.id} value={habit.id}>
                                {habit.name}
                            </MenuItem>
                        ))
                    ) : (
                        // Global habits
                        globalHabits.map((habit: GlobalHabitData) => (
                            <MenuItem key={habit.id} value={habit.id}>
                                {habit.name}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>

            {/* Chart container with fixed height */}
            <Box sx={{ height: 280 }}>
                {loading ? (
                    <CircularProgress />
                ) : statistics.statistics && statistics.statistics.length > 0 ? (
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: { display: true, text: "Habit Completion Stats (Last 3 Months)" },
                                legend: { position: "bottom" },
                            },
                        }}
                    />
                ) : (
                    <Typography>Select a habit to view stats</Typography>
                )}
            </Box>
        </Box>
    );
};

export default HabitCompletedChart;
