import Footer from "../components/Footer.jsx";
import CodeOfDay from "../components/CodeOfDay.jsx";
import WelcomeText from "../components/WelcomeText.jsx";

import { useState, useEffect } from "react";

import firebase from "../services/firebase";

import Login from "../components/Login.jsx";
import SignOut from "../components/SignOut.jsx";
import { Container, Grid } from "@mui/material";

export default function App() {
  const [user, setUser] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);

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
