import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from "chart.js";
import { MenuItem, Select, FormControl, InputLabel, Box, CircularProgress } from "@mui/material";
import { fetchUserActivityStatistics } from "../../../../entitites/statistics/models/active_statistics.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const periodSelect = [
    {
        name: "year",
        title: "This year"
    },
    {
        name: "month",
        title: "This month"
    },
    {
        name: "week",
        title: "This week"
    },
    {
        name: "day",
        title: "Today"
    },
]

const HabitActiveUsersChart = () => {
    const dispatch = useAppDispatch();
    const user_activity = useAppSelector((state) => state.user_activity);
    const [selectedPeriod, setSelectedPeriod] = useState<string | "">("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleHabitChange = (event: any) => {
        setSelectedPeriod(event.target.value);
    };

    useEffect(() => {
        setLoading(true);
        if (selectedPeriod) {
            dispatch(fetchUserActivityStatistics(selectedPeriod));
        }
        setLoading(false);
    }, [selectedPeriod, dispatch]);

    // Prepare chart data
    const chartData = {
        labels: user_activity.user_activity.map(u => u.datetime),
        datasets: [
          {
            label: "Active Users",
            data: user_activity.user_activity.map(u => u.activeUsers),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(117, 209, 209, 0.6)",
            fill: true,
            tension: 0.3,
            borderWidth: 3

          },
          {
            label: "Average completed Habits",
            data: user_activity.user_activity.map(u => u.avgHabitsPerUser),
            backgroundColor: "rgba(234, 80, 113, 0.6)",
            borderColor: "rgba(240, 133, 156, 0.6)",
            fill: true,
            tension: 0.3,
            borderWidth: 3
          },
        ],
      };

    return (
        <Box sx={{ width: 600, margin: "auto", textAlign: "center", boxShadow: 3, backgroundColor: "white", padding: 2, borderRadius: 3 }}>
            {/* Habit Selector */}
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Period</InputLabel>
                <Select value={selectedPeriod} onChange={handleHabitChange}>
                    {periodSelect.map((t) => (
                        <MenuItem key={t.name} value={t.name}>
                            {t.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Chart */}
            {loading ? (
                <CircularProgress />
            ) : user_activity.user_activity ? (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            title: { display: true, text: "User activity and Habits average" },
                            legend: { position: "bottom" },
                        },
                    }}
                />
            ) : (
                <p>Select a habit to view stats</p>
            )}
        </Box>
    );
};

export default HabitActiveUsersChart;
