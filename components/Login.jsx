import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../services/firebase";
import { useState } from "react";
import { Typography, TextField, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GoogleIcon from "@mui/icons-material/Google";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loading, setLoading] = useState({
    register: false,
    loginEmail: false,
    loginGoogle: false,
  });

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

        <LoadingButton
          startIcon={<MailOutlineIcon />}
          variant="contained"
          loading={loading.loginEmail}
          onClick={() => {
            setLoading({ ...loading, loginEmail: true });
            signInWithEmailAndPassword(loginEmail, loginPassword);
          }}
        >
          Login
        </LoadingButton>
        <LoadingButton
          startIcon={<GoogleIcon />}
          variant="contained"
          loading={loading.loginGoogle}
          onClick={() => {
            setLoading({ ...loading, loginGoogle: true });
            signInWithGoogle();
          }}
        >
          Sign-in with Google
        </LoadingButton>
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
        <LoadingButton
          loading={loading.register}
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setLoading({ ...loading, register: true });
            registerWithEmailAndPassword(name, email, password);
          }}
        >
          Register
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default Login;
