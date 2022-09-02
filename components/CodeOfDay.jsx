import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { QRCodeSVG } from "qrcode.react";

export default function CodeOfDay({ loaded, setLoaded }) {
  const [code, setCode] = useState(null);

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const d = new Date();
  // subtract 1 from day to get correct day of week (because JS starts at 0)
  const day = weekdays[d.getDay() - 1];
  const isWeekday = weekdays.includes(day);

  useEffect(() => {
    async function getCodeOfDay() {
      const code = checkLocalStorage();
      // if the code was received locally, skip server request
      if (code) return;

      const querySnapshot = await getDocs(collection(db, "loginCodes"));

      // loop through the server documents and return the current code
      querySnapshot.forEach((doc) => {
        if (doc.data().weekday !== day) return;
        const codeObj = doc.data();

        // save to local for later consumption
        localStorage.setItem("code", JSON.stringify(codeObj));

        const codeValue = codeObj.code.toString();
        setCode(codeValue);
      });
    }

    // before looking for code, check if it exists locally
    function checkLocalStorage() {
      const localObj = JSON.parse(localStorage.getItem("code"));

      // if the object exists & the day is the same, use this local version
      if (localObj?.weekday === day) {
        const codeValue = localObj.code.toString();
        setCode(codeValue);

        // exit function, returning true to prevent further execution in getCodeOfDay() context
        return true;
      }
    }
    getCodeOfDay();
    setLoaded(true);
  }, [code, loaded]);

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {isWeekday && loaded && code && (
        <QRCodeSVG
          style={{
            height: "auto",
            width: 230,
            marginTop: 100,
            marginBottom: 100,
          }}
          level="H"
          value={code}
        />
      )}
      {!isWeekday && loaded && (
        <Typography sx={{ textAlign: "center", mt: 7 }} variant="h2">
          🚧 No codes on the weekend — profitez!
        </Typography>
      )}
    </Grid>
  );
}
