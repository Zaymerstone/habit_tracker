import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";
import { Box, CircularProgress, Typography } from "@mui/material";
import { fetchGlobalHabitStats } from "../../../../entitites/statistics/models/statistics.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GlobalHabitComparisonChart = () => {
    const dispatch = useAppDispatch();
    const { globalHabitStats: stats, globalStatsStatus: status } = useAppSelector((state) => state.statistics);
    const loading = status === "loading";

    useEffect(() => {
        dispatch(fetchGlobalHabitStats());
    }, [dispatch]);

    // Prepare chart data
    const chartData = {
        labels: stats.map(stat => stat.name),
        datasets: [
            {
                label: "Your Streak",
                data: stats.map(stat => stat.userStreak),
                backgroundColor: "rgba(75, 192, 192, 0.8)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Average Streak",
                data: stats.map(stat => parseFloat(stat.avgStreak)),
                backgroundColor: "rgba(234, 80, 113, 0.8)",
                borderColor: "rgba(234, 80, 113, 1)",
                borderWidth: 1,
            }
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            title: {
                display: true,
                text: "Your Streak vs. Community Average",
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    afterBody: function (context: any) {
                        const index = context[0].dataIndex;
                        const stat = stats[index];
                        return [
                            `Participants: ${stat.userCount}`,
                            `Your percentile: ${stat.percentile}%`,
                            `(Better than ${stat.percentile}% of users)`
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Current Streak'
                }
            }
        }
    };

    return (
        <Box sx={{ width: 600, height: 450, margin: "auto", textAlign: "center", boxShadow: 3, backgroundColor: "white", padding: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Global Habits Comparison</Typography>

            {/* Chart container with fixed height */}
            <Box sx={{ height: 350 }}>
                {loading ? (
                    <CircularProgress />
                ) : stats.length > 0 ? (
                    <Bar
                        data={chartData}
                        options={{
                            ...chartOptions,
                            maintainAspectRatio: false
                        }}
                    />
                ) : (
                    <Typography>No global habit data available</Typography>
                )}
            </Box>

            <Typography variant="body2" sx={{ mt: 2, fontSize: '0.8rem', color: 'text.secondary' }}>
                This chart compares your current streaks with the community average for each global habit
            </Typography>
        </Box>
    );
};

export default GlobalHabitComparisonChart; 