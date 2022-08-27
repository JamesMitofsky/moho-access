import Footer from "./components/footer.jsx";
import ExistingData from "./components/ExistingData.jsx";
import firebase from "./firebase";
import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      {user ? `Our user is: ${user}` : <Login />}
      <main>
        <h1>Welcome to Moho Login</h1>
      </main>
      <ExistingData />
      <Footer />
    </>
  );
}
