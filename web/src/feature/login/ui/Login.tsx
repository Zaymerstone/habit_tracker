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
import { loginUser } from "../../../entitites/user/models/user.slice";

export default function Login() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Box>
        <Typography component="h2" variant="h4" textAlign="center">
          Sign in
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
            const user = {
              email: formData.get("email") as string,
              password: formData.get("password") as string,
            };

            void dispatch(loginUser(user)); // Dispatch loginUser thunk
          }}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>

            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="email@example.com"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel>Password</FormLabel>
              <Link
                component="button"
                type="button"
                sx={{ alignSelf: "baseline" }}
              >
                Forgot Password?
              </Link>
            </Box>
            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoFocus
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
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            No account?
            <Link sx={{ alignSelf: "center" }} type="button" component="button">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
