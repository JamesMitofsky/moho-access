import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../firebase";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  return (
    <>
      <div>
        <Card>
          <CardHeader>User Login</CardHeader>
          <CardContent>
            <div>
              <form>
                <TextField
                  type="email"
                  placeholder="Enter email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <Typography>
                  We'll never share your email with anyone else.
                </Typography>
              </form>

              <form>
                <TextField
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </form>

              <div>
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardContent>
            <CardHeader>User Registration</CardHeader>
            <Card.Text>First time visiting? register Here</Card.Text>
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

            <div>
              <Button
                type="submit"
                onClick={() => {
                  registerWithEmailAndPassword(name, email, password);
                }}
              >
                Register
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
