import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../../app/shared/hooks/redux";
import { registerUser } from "../../../entitites/user/models/user.slice";

export default function Register() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Box>
        <Typography component="h2" variant="h4" textAlign="center">
          Sign up
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 4,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const user = Object.fromEntries(formData);
            void dispatch(registerUser(user));
          }}
        >
          <FormControl>
            <FormLabel>Username</FormLabel>
            <TextField
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="email@example.com"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            sx={{ height: "48px" }}
            type="submit"
          >
            Sign up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?
            <Link sx={{ alignSelf: "center" }} type="button" component="button">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
