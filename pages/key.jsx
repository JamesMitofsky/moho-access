import CodeOfDay from "../components/CodeOfDay";
import WelcomeText from "../components/WelcomeText";
import { Grid } from "@mui/material";
import { useState } from "react";
import Loading from "../components/Loading";
import { getDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../services/firebase";
import getCodeFromWeekdays from "../functions/getCodeFromWeekdays";

export default function Key() {
  const [loaded, setLoaded] = useState(false);
  const [codeData, setCodeData] = useState([]);

  // get url param for key
  const router = useRouter();
  const keyParam = router.query["value"];
  console.log("myparam", keyParam);

  // fetch object from firestore using the key
  useEffect(() => {
    if (!keyParam) return;

    async function getCode() {
      const docRef = doc(db, "globalKeys", keyParam);
      const res = await getDoc(docRef);
      setCodeData(res.data());
    }
    const qrCodeValue = getCodeFromWeekdays(codeData.weekdays);
    getCode();
  });

  return (
    <>
      <h1>User KEYS PAGE</h1>
      <Loading loaded={loaded} />
      {/* <CodeOfDay loaded={loaded} setLoaded={setLoaded} /> */}
      {loaded && (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          {/* <WelcomeText /> */}
        </Grid>
      )}
    </>
  );
}
