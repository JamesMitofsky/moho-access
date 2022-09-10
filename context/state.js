import { createContext, useContext, useState, useEffect } from "react";
import firebase from "../services/firebase";
import isUserAuthorized from "../functions/isUserAuthorized";
import Router from "next/router";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);

  // assign user to state
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (thisUser) => {
      const userObj = thisUser._delegate;

      // if the server finds no user, empty the local representation
      if (!userObj) {
        setUser("notLoggedIn");
        return;
      }

      // if user signs in for first time, record their info (returns false if no auth is returned)
      const userWithAuth = await isUserAuthorized(thisUser.uid, userObj);

      if (userWithAuth) {
        setUser(userWithAuth);
        return;
      } else {
        // if server returned the user has no roles object attached, redirect to non-resident page
        setUser({ ...userObj, status: "reg_nonresident" });
        return;
      }
    });
  }, []);

  // handle routing
  useEffect(() => {
    // exit if user has not yet been assigned to state
    if (!user) return;

    // PUBLIC ROUTES; do not respect auth rules for these paths
    const pathName = Router.pathname;
    if (pathName === "/key" || pathName === "/about") return;

    // if server has user
    const userHasRole =
      user.roles?.admin === true || user.roles?.resident === true;

    // send authorized users to code from the login page
    if (userHasRole) {
      // if located on the login page, redirect logged in user to the code
      if (pathName !== "/") return;
      Router.push("/code");
      return;
    }

    // exit if user has not authenticated (regardless of authroization status)
    if (user.status === "reg_nonresident") {
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
