import Footer from "./components/footer.jsx";
import ExistingData from "./components/ExistingData.jsx";
import firebase from "./firebase";
import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import SignOut from "./components/Signout.jsx";
import "./App.css";
import { Container } from "@mui/material";

export default function App() {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Container>
      {user ? (
        <main>
          <h1>Welcome to Moho Login</h1>
          <SignOut />
          <ExistingData />
        </main>
      ) : (
        <Login />
      )}

      <Footer />
    </Container>
  );
}
