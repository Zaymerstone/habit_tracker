import {
  Box,
  Button,
  Snackbar,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";
import { useState } from "react";
function Register(): JSX.Element {
  const [message, setMessage] = useState();
  const [open, setOpen] = useState<boolean>();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    console.log(data);
    const newData = Object.fromEntries(data);
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    const text = await response.json();
    console.log(text);
    setMessage(text.message);
    setOpen(true);
    console.log(data);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <Box flexDirection={"column"}>
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            name="username"
          />

          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            name="password"
          />

          <Button variant="outlined" type="submit">
            submit
          </Button>
        </Box>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={message}
        onClose={handleClose}
      />
    </>
  );
}
export default Register;
