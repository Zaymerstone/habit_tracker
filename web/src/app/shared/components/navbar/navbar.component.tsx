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

function NavBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
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
            <Box>
              <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
