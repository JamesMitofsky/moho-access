import Footer from "./components/Footer.jsx";
import CodeOfDay from "./components/CodeOfDay.jsx";
import "./App.css";
import logo from "./assets/moho-logo.png";

import { useState, useEffect } from "react";

import firebase, { db } from "./firebase";

import { doc, getDoc } from "firebase/firestore";

import Login from "./components/Login.jsx";
import SignOut from "./components/SignOut.jsx";
import { Container, Grid } from "@mui/material";

export default function App() {
  const [user, setUser] = useState({});
  // const [userRef, setUserRef] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  // useEffect(() => {
  //   const getInfo = async () => {
  //     // only run if the UID is accessible
  //     if (!user.uid) return;
  //     console.log("User Uid:", user.uid);

  //     // describe location of user object
  //     const userRef = doc(db, "users", user.uid);

  //     // retrieve user info
  //     const docSnap = await getDoc(userRef);

  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   };
  //   getInfo();
  // }, [user]);

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
            mt: 6,
          }}
        >
          <CodeOfDay />
          <h1>
            Welcome to <img src={logo} alt="Moho Logo" /> Login
          </h1>
          <SignOut />
        </Grid>
      ) : (
        <Login />
      )}

      <Footer />
    </Container>
  );
}
