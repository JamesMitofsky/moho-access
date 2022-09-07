import CodeOfDay from "../components/CodeOfDay";
import WelcomeText from "../components/WelcomeText";
import NoCodeToday from "../components/NoCodeToday";
import Loading from "../components/Loading";
import MarginProvider from "../components/layouts/MarginProvider";

import getCodeFromWeekdays from "../functions/getCodeFromWeekdays";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

import { Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

export default function Key() {
  const [loaded, setLoaded] = useState(false);
  const [codeData, setCodeData] = useState(null);
  const [param, setParam] = useState(null);
  const [needInput, setNeedInput] = useState(false);

  // get url param for key
  const { query, isReady } = useRouter();
  useEffect(() => {
    query["value"] && setParam(query["value"]);
  }, []);

  async function databaseSearch() {
    if (!param) {
      setNeedInput(true);
      setLoaded(true);
      return;
    }

    // fetch object from firestore using the key
    const docRef = doc(db, "globalKeys", param);
    const res = await getDoc(docRef);
    if (!res.exists()) {
      setNeedInput(true);
      setLoaded(true);
      return;
    }
    const arrayOfWeekdays = res.data()?.weekdays;

    // end function if no weekday match can be found -- this could mean there wasn't even a matching key
    if (!arrayOfWeekdays) setNeedInput(true);

    const qrCodeValue = getCodeFromWeekdays(arrayOfWeekdays);
    setCodeData(qrCodeValue);
    setLoaded(true);
  }
  useEffect(() => {
    databaseSearch();

    // run the effect on either condition
    // 1. the first time once params are ready from React
    // 2. the input state has changed
  }, [isReady, needInput]);

  function searchForParam() {
    setNeedInput(false);
    databaseSearch();
  }

  function inputSubmitted() {
    Router.push({ pathname: "/key", query: { value: param } });
    setNeedInput(false);
    searchForParam();
  }

  return (
    <MarginProvider>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}
      >
        {needInput && (
          <>
            <WelcomeText />
            <TextField
              fullWidth
              label="Enter your key name"
              value={param}
              onChange={(e) => setParam(e.target.value)}
            />
            <Button onClick={inputSubmitted}>Search</Button>
          </>
        )}

        {loaded && !needInput && codeData && (
          <>
            <CodeOfDay value={codeData.code} />
            {!codeData && <NoCodeToday />}
            <WelcomeText />
          </>
        )}
      </Grid>

      <Loading loaded={loaded} />
    </MarginProvider>
  );
}
