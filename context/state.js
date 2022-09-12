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
      // if the server finds no user, empty the local representation
      if (!thisUser) {
        setUser({ roles: { unregistered: true } });
        return;
      }

      const userObj = thisUser._delegate;

      // if user signs in for first time, record their info (returns false if no auth is returned)
      const userWithAuth = await isUserAuthorized(thisUser.uid, userObj);

      if (userWithAuth) {
        setUser(userWithAuth);
        return;
      } else {
        // if server returned the user has no roles object attached, redirect to non-resident page
        setUser({ ...userObj, roles: { reg_nonresident: true } });
        return;
      }
    });
  }, []);

  console.log(user);

  // handle routing
  useEffect(() => {
    // exit if user has not yet been assigned to state
    if (!user) return;

    // PUBLIC ROUTES; do not respect auth rules for these paths
    const pathName = Router.pathname;
    if (pathName === "/key" || pathName === "/about") return;

    // if server has user
    const userHasRole = user.roles.admin || user.roles.resident;
    console.log(userHasRole);

    // send authorized users to code from the login page
    if (userHasRole) {
      // exit if not located on "login" or "welcome" pages
      if (pathName !== "/" && pathName !== "/new-user") return;

      // push to the code view
      Router.push("/code");
      return;
    }

    // exit if user has not authenticated (regardless of authroization status)
    if (user.roles.reg_nonresident) {
      Router.push("/new-user");
      return;
    }

    if (user.roles.unregistered) {
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
