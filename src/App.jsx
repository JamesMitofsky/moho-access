import Footer from "./components/footer.jsx";
import ExistingData from "./components/ExistingData.jsx";
import firebase from "./firebase";
import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import SignOut from "./components/Signout.jsx";
import "./App.css";
import { Container } from "@mui/material";
import CodeOfDay from "./components/CodeOfDay.jsx";

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
          <CodeOfDay />
          <ExistingData />
          <SignOut />
        </main>
      ) : (
        <Login />
      )}

      <Footer />
    </Container>
  );
}
