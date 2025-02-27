import React, { useEffect, useState } from "react";
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
import { MenuItem, Select, FormControl, InputLabel, Box, CircularProgress } from "@mui/material";
import { fetchPersonalStatistics } from "../../../../entitites/statistics/models/statistics.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

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
    const [selectedHabit, setSelectedHabit] = useState<number | "">("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleHabitChange = (event: any) => {
        setSelectedHabit(event.target.value);
    };

    useEffect(() => {
        setLoading(true);
        if (selectedHabit) {
            dispatch(fetchPersonalStatistics(Number(selectedHabit)));
        }
        setLoading(false);
    }, [selectedHabit, dispatch]);

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
        <Box sx={{width: 600, margin: "auto", textAlign: "center", boxShadow: 3, backgroundColor: "white", padding: 2, borderRadius: 3}}>
            {/* Habit Selector */}
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Habit</InputLabel>
                <Select value={selectedHabit} onChange={handleHabitChange}>
                    {habits.map((habit) => (
                        <MenuItem key={habit.id} value={habit.id}>
                            {habit.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Chart */}
            {loading ? (
                <CircularProgress />
            ) : statistics.statistics ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            title: { display: true, text: "Habit Completion Stats (Last 3 Months)" },
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

export default HabitCompletedChart;
