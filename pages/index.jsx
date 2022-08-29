import Footer from "../components/Footer.jsx";
import CodeOfDay from "../components/CodeOfDay.jsx";
import WelcomeText from "../components/WelcomeText.jsx";

// import "./App.css";

import { useState, useEffect } from "react";

import firebase, { db } from "../services/firebase";

import { doc, getDoc } from "firebase/firestore";

import Login from "../components/Login.jsx";
import SignOut from "../components/SignOut.jsx";
import { Container, Grid, Typography } from "@mui/material";

export default function App() {
  const [user, setUser] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);
  // const [userRef, setUserRef] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setPageLoaded(true);
    });
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Grid
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {pageLoaded && user && (
            <>
              <CodeOfDay />
              <WelcomeText />
              <SignOut />
            </>
          )}

          {pageLoaded && !user && (
            <>
              <WelcomeText />
              <Login />
            </>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
