import {
    Avatar,
    Box,
    Card,
    Typography,
} from "@mui/material";
import Bronze from "../../../../assets/bronze.png"
import Silver from "../../../../assets/silver.png"
import Gold from "../../../../assets/gold.png"
import { AchievementData } from "../../../../entitites/user/models/user.slice";
import { formatDate } from "../../../../utils";

interface AchievementProps {
    achievement: AchievementData
}

const masteryImages = [Bronze, Silver, Gold]

function Achievement({ achievement }: AchievementProps) {
    console.log(achievement)
    return (
        <Card
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
                <img width={40} height={40} src={masteryImages[achievement.Mastery.id - 1]} alt="Mastery"/>
            </Avatar>
            <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    {achievement.Mastery.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <Typography component="span">
                        {"Was achieved for having streak of "}
                    </Typography>
                    <Typography component="span" fontWeight={600} fontSize="1.2rem">
                        {achievement.Mastery.streak_target}
                    </Typography>
                    <Typography component="span">
                        {" on "}
                    </Typography>
                    <Typography component="span" fontWeight={600} fontSize="1.2rem">
                        {achievement.Habit.name}
                    </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={500} fontSize="1.1rem">
                    Date: {formatDate(achievement.createdAt)}
                </Typography>
            </Box>
        </Card>
    )
}

export default Achievement