import CodeOfDay from "../components/CodeOfDay";
import WelcomeText from "../components/WelcomeText";
import SignOut from "../components/SignOut";
import Loading from "../components/Loading";
import NoCodeToday from "../components/NoCodeToday";
import MarginProvider from "../components/layouts/MarginProvider";

import getCodeFromWeekdays from "../functions/getCodeFromWeekdays";

import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

import Head from "next/head";

export default function Code() {
  const [loaded, setLoaded] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    async function asyncFunc() {
      // get codes from server & move those into an object
      const querySnapshot = await getDocs(collection(db, "loginCodes"));
      const arrayOfWeekdays = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      // return today's code
      const codeOfDay = getCodeFromWeekdays(arrayOfWeekdays);

      // move string value of today's code to the actual QR code
      if (!codeOfDay) {
        setCode("empty");
        return;
      }
      setCode(codeOfDay.code.toString());
    }
    asyncFunc();
    setLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Code</title>
      </Head>
      <MarginProvider>
        <Loading loaded={loaded} />
        {code !== "empty" ? (
          <CodeOfDay loaded={loaded} setLoaded={setLoaded} value={code} />
        ) : (
          <NoCodeToday />
        )}
        {loaded && (
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <WelcomeText />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SignOut />
            </Box>
          </Grid>
        )}
      </MarginProvider>
    </>
  );
}
