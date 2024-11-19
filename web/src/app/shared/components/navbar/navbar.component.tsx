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
import { Modal, TextField } from "@mui/material";
import { useState } from "react";

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
      <AppBar position="static">
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

      {/* Modal for Adding Habit */}
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="add-habit-modal"
        aria-describedby="add-habit-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography id="add-habit-modal" variant="h6" component="h2">
            Add New Habit
          </Typography>
          <TextField
            label="Habit Name"
            placeholder="Habit name"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Description"
            placeholder="Description"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalClose}
          >
            Add Habit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default NavBar;
