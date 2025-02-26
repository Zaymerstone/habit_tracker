import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/shared/hooks/redux";
import { formatDate } from "../../../utils";
import { useState } from "react";
import { changeAvatar, checkUser } from "../../../entitites/user/models/user.slice";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const habitsSteaks = user.habits.map((h) => (h.max_streak))
  const habitWithHighestStreak = Math.max(...habitsSteaks, 0)

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadPicture, setUploadPicture] = useState<File | null>(null);

  const handlePictureSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create a preview of the selected image
      setUploadPicture(file)
    }
  };

  const handleButtonClick = async () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput && !uploadPicture) {
      fileInput.click();
    }

    if (uploadPicture) {
      console.log(uploadPicture)
      const formData = new FormData;
      formData.append("image", uploadPicture)
      try {
        await dispatch(changeAvatar(formData)).unwrap();
        dispatch(checkUser()).unwrap();
        setUploadPicture(null)
      } catch (error) {
        console.error("Error changing avatar or checking user:", error);
      }
    }

  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "91%",
        backgroundColor: "#E8F9FF", // Optional background color for the page
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
            src={selectedImage || user.image || "/static/images/avatar/1.jpg"} // Replace with your profile image URL
            sx={{ width: 120, height: 120, margin: "0 auto", mb: 2 }}
          />
          {/* Change Picture Button */}
          <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={handleButtonClick}>
            {uploadPicture ? "Save" : "Change Picture"}
          </Button>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePictureSelect}
          />
          {/* Stats Section */}
          <Box>
            <Typography variant="h6">Active since: {formatDate(user.createdAt)}</Typography>
            <Typography variant="h6">Current Level: {user.level}</Typography>
            <Typography variant="h6">Habits Count: {user.habits.length}</Typography>
            <Typography variant="h6">Max Habit Streak: {habitWithHighestStreak}</Typography>
            <Typography variant="h6">Masteries achieved: {user.achievements.length}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
