import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";

export default function Login() {
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
          <Button variant="contained" fullWidth sx={{ height: "48px" }}>
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
