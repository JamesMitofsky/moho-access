import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../firebase";
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  return (
    <Grid
      display="flex"
      justifyContent="space-around"
      alignItems="space-around"
    >
      <Card>
        <CardContent>
          <Typography variant="h5">User Login</Typography>
          <Typography variant="subtitle1">
            We'll never share your email with anyone else.
          </Typography>
          <form>
            <TextField
              type="email"
              placeholder="Enter email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </form>

          <form>
            <TextField
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </form>

          <Button
            variant="outline-success"
            type="submit"
            onClick={() => {
              signInWithEmailAndPassword(loginEmail, loginPassword);
            }}
          >
            Login
          </Button>
          <Button onClick={signInWithGoogle}>Sign-in with Goolge</Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5">User Registration</Typography>
          <Typography variant="subtitle1">
            First time visiting? register Here
          </Typography>
          <form>
            <TextField
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
          <form>
            <TextField
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>

          <form>
            <TextField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>

          <Button
            type="submit"
            onClick={() => {
              registerWithEmailAndPassword(name, email, password);
            }}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;