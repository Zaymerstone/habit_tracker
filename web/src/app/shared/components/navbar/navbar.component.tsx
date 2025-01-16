import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { RouterPath } from "../../router/pathes";
import { useDispatch } from "react-redux";
import { logout } from "../../../../entitites/user/models/user.slice"; // Adjust the path accordingly

import { useState } from "react";
import HabitModal from "../habitModal/habitModal.component";

function NavBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static" sx={{height: "6%"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Typography>
                  <Link to={RouterPath.HomePage}> Home </Link>
                </Typography>

                <Typography>
                  <Link to={RouterPath.UserProfile}> Profile </Link>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "10px" }}>
                {/* Add Habit Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleModalOpen}
                >
                  Add Habit
                </Button>

                {/* Logout Button */}
                <Button variant="outlined" color="error" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <HabitModal open={open} onClose={handleModalClose} title="Add" />
    </>
  );
}
export default NavBar;
