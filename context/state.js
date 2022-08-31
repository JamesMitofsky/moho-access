import { createContext, useContext, useState, useEffect } from "react";
import firebase from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import isUserAuthorized from "../functions/isUserAuthorized";
import Router from "next/router";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);

  async function getUserInfo(userObj, userAuthorized) {
    const docRef = doc(db, "users", userObj.uid);
    const docSnap = await getDoc(docRef);
    const userWithAuth = { ...docSnap.data(), authorized: userAuthorized };
    return userWithAuth;
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (userObj) => {
      // if no user is logged in, empty the user obj
      if (!userObj) {
        Router.push("/");
        setUser(null);
        return;
      }

      // if user is already saved to system, exit logging function
      if (user) return;
      // otherwise, process user info
      const isAuthorized = await isUserAuthorized(userObj.uid, [
        "admin",
        "resident",
      ]);
      const userWithAuthStatus = await getUserInfo(userObj, isAuthorized);
      setUser(userWithAuthStatus);
    });
  }, []);

  return <AppContext.Provider value={user}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
