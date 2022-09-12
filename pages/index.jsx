import WelcomeText from "../components/WelcomeText.jsx";
import Login from "../components/Login.jsx";
import Loading from "../components/Loading.jsx";
import MarginProvider from "../components/layouts/MarginProvider.jsx";

import { useState, useEffect } from "react";
import { useAppContext } from "../context/state";
import Router from "next/router";

export default function UserLogin() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const user = useAppContext();
  useEffect(() => {
    // has user been evaluated by state.js?
    if (!user) return;

    // has state.js determined no user is logged in?
    const notLoggedIn = user.roles.unregistered;
    if (notLoggedIn) {
      setPageLoaded(true);
      return;
    }
  }, [user]);

  // todo: run UID search to return if user is authorized before doing any screen changes.
  // also, forward user to a new page /QRCode or something

  return (
    <MarginProvider>
      <Loading loaded={pageLoaded} />
      {pageLoaded && (
        <>
          <WelcomeText />
          <Login />
        </>
      )}
    </MarginProvider>
  );
}
