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

import setState from "../functions/setState";

export default function Key() {
  const [codeData, setCodeData] = useState("");
  const [param, setParam] = useState({
    serverCall: "",
    userInput: "",
  });
  const [states, setStates] = useState({
    loading: true,
    noCode: false,
    showCode: false,
  });

  const { query, isReady } = useRouter();
  useEffect(() => {
    // don't continue evaluating function until certain there's no URL param inbound
    if (!isReady) return;

    // throw param error in two cases:
    // 1. no param at all
    // 2. param does not exist (handle this in async func)
    if (!param.userInput) {
      setState(setStates, "noCode");
      return;
    }

    console.log("checking url");
    checkURL();

    databaseSearch();
    // run the effect on either condition
    // 1. the first time once params are ready from React
    // 2. the input state has changed
  }, [isReady, param.serverCall]);

  // get url param for key
  function checkURL() {
    query["value"] &&
      setParam((prev) => ({ ...prev, serverCall: query["value"] }));
  }

  async function databaseSearch() {
    // fetch object from firestore using the key
    const docRef = doc(db, "globalKeys", param.serverCall);
    const res = await getDoc(docRef);
    if (!res.exists()) return;

    const arrayOfWeekdays = res.data()?.weekdays;

    // end function if no weekday match can be found -- this could mean there wasn't even a matching key
    if (!arrayOfWeekdays) setNeedInput(true);

    const qrCodeValue = getCodeFromWeekdays(arrayOfWeekdays);
    setCodeData(qrCodeValue);
    setState(setStates, "showCode");
  }

  function inputSubmitted() {
    Router.push({ pathname: "/key", query: { value: param.userInput } });
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
        {states.noCode && (
          <>
            <WelcomeText />
            <TextField
              fullWidth
              label="Enter your key name"
              value={param.userInput}
              onChange={(e) =>
                setParam((prev) => ({ ...prev, userInput: e.target.value }))
              }
            />
            <Button onClick={inputSubmitted}>Search</Button>
          </>
        )}

        {states.loading && codeData && (
          <>
            <CodeOfDay value={codeData.code} />
            {!codeData && <NoCodeToday />}
            <WelcomeText />
          </>
        )}
      </Grid>

      <Loading loaded={!states.loading} />
    </MarginProvider>
  );
}
