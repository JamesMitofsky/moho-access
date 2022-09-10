import { createContext, useContext, useState, useEffect } from "react";
import firebase from "../services/firebase";
import isUserAuthorized from "../functions/isUserAuthorized";
import Router from "next/router";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (userObj) => {
      // PUBLIC ROUTES; do not respect auth rules for these paths
      const pathName = Router.pathname;
      if (pathName === "/key" || pathName === "/about") return;

      // if user is already saved to local, exit logging function
      if (user) return;

      // if the server finds no user, empty the local representation
      if (!userObj) {
        setUser("notLoggedIn");
        return;
      }

      // if server has user but user is not a resident
      if (userObj && userObj.roles?.admin === true) {
        setUser(userObj);
        return;
      }

      // if server has user but user is not a resident
      if (userObj && userObj.roles?.resident === true) {
        setUser(userObj);
        return;
      }

      // if server has user but user is not a resident
      if (userObj && userObj.roles?.resident !== true) {
        setUser("reg_nonresident");
        return;
      }

      // if user signs in for first time, record their info
      const userWithAuth = await isUserAuthorized(userObj.uid);

      setUser(userWithAuth);
    });
  }, []);

  // handle routing
  useEffect(() => {
    // exit if user has not yet been assigned to state
    if (!user) return;
    console.log(user);

    if (user.roles?.resident === true || user.roles?.admin === true) {
      Router.push("/code");
      return;
    }

    // exit if user has not authenticated (regardless of authroization status)
    if (user === "reg_nonresident") {
      Router.push("/new-user");
      return;
    }

    if (user === "notLoggedIn") {
      Router.push("/");
      return;
    }

    // if user is not authorized, redirect to key page
  }, [user]);

  return <AppContext.Provider value={user}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
