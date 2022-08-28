import Footer from "./components/footer.jsx";
import CodeOfDay from "./components/CodeOfDay.jsx";
import "./App.css";
import logo from "./assets/moho-logo.png";

import { useState, useEffect } from "react";

import firebase from "./firebase";

import Login from "./components/Login.jsx";
import SignOut from "./components/Signout.jsx";
import { Container, Grid } from "@mui/material";

export default function App() {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {user ? (
        <Grid
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>
            Welcome to <img src={logo} alt="Moho Logo" /> Login
          </h1>
          <CodeOfDay />
          <SignOut />
        </Grid>
      ) : (
        <Login />
      )}

      <Footer />
    </Container>
  );
}
