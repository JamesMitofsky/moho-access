import { createContext, useContext, useState, useEffect } from "react";
import firebase from "../services/firebase";
import isUserAuthorized from "../functions/isUserAuthorized";
import Router from "next/router";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (userObj) => {
      const pathName = Router.pathname;
      if (pathName === "/key" || pathName === "/about") return;

      // if no user is logged in, empty the user obj
      if (!userObj) {
        setUser("empty");
        return;
      }

      // if user is already saved to system, exit logging function
      if (user) return;

      // if user signs in for first time, record their info
      const userWithAuth = await isUserAuthorized(userObj.uid);

      setUser(userWithAuth);
    });
  }, []);

  // handle routing
  useEffect(() => {
    // exit if user has not yet been assigned to state
    if (!user) return;

    // exit if user has not authenticated (regardless of authroization status)
    if (user === "empty") {
      Router.push("/new-user-welcome");
      return;
    }

    // if user is not authorized, redirect to key page
    console.log(user);
  }, [user]);

  return <AppContext.Provider value={user}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
