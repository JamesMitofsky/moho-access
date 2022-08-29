import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../firebase";
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
        <Typography variant="h2">Login</Typography>
        <TextField
          fullWidth
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <Button
          variant="contained"
          type="submit"
          onClick={(e) => {
            e.prevetDefault();
            signInWithEmailAndPassword(loginEmail, loginPassword);
          }}
        >
          Login
        </Button>
        <Button variant="contained" onClick={signInWithGoogle}>
          Sign-in with Goolge
        </Button>
      </Grid>
      <Grid component="form">
        <Typography variant="h2">Register</Typography>
        <TextField
          fullWidth
          type="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          type="submit"
          onClick={(e) => {
            e.prevetDefault();
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
