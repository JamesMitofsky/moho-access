import CodeOfDay from "../components/CodeOfDay";
import WelcomeText from "../components/WelcomeText";
import NoCodeToday from "../components/NoCodeToday";
import Loading from "../components/Loading";
import MarginProvider from "../components/layouts/MarginProvider";

import getCodeFromWeekdays from "../functions/getCodeFromWeekdays";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

import { Grid } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Key() {
  const [loaded, setLoaded] = useState(false);
  const [codeData, setCodeData] = useState(null);
  const [error, setError] = useState(false);

  // get url param for key
  const { query, isReady } = useRouter();
  const keyParam = query["value"];

  useEffect(() => {
    if (!keyParam) return;
    async function asyncFunc() {
      // fetch object from firestore using the key
      const docRef = doc(db, "globalKeys", keyParam);
      const res = await getDoc(docRef);
      const arrayOfWeekdays = res.data()?.weekdays;

      // end function if no weekday match can be found
      if (!arrayOfWeekdays) {
        setLoaded(true);
        return;
      }

      const qrCodeValue = getCodeFromWeekdays(arrayOfWeekdays);
      setCodeData(qrCodeValue);
      setLoaded(true);
    }
    asyncFunc();
  }, [isReady]);

  return (
    <MarginProvider>
      {error && "We ran into a problem. Sorry about that."}
      <Loading loaded={loaded} />
      {codeData ? (
        <CodeOfDay
          loaded={loaded}
          setLoaded={setLoaded}
          value={codeData.code}
        />
      ) : (
        <NoCodeToday />
      )}
      {loaded && (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <WelcomeText />
        </Grid>
      )}
    </MarginProvider>
  );
}
