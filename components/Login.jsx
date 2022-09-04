import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../services/firebase";
import { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  return (
    <Grid
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="space-around"
      gap={4}
    >
      <Grid component="form">
        <Typography sx={{ mb: 1 }} variant="h2">
          Login
        </Typography>
        <TextField
          fullWidth
          type="email"
          name="email"
          autoComplete="email"
          label="Enter email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          autoComplete="current-password"
          label="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={() => {
            signInWithEmailAndPassword(loginEmail, loginPassword);
          }}
        >
          Login
        </Button>
        <Button variant="contained" onClick={signInWithGoogle}>
          Sign-in with Google
        </Button>
      </Grid>
      <Grid component="form">
        <Typography sx={{ mb: 1 }} variant="h2">
          Register
        </Typography>
        <TextField
          fullWidth
          type="name"
          label="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          type="email"
          label="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => {
            registerWithEmailAndPassword(name, email, password);
          }}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
