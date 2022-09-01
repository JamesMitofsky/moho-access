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

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    async function getCodeOfDay() {
      const querySnapshot = await getDocs(collection(db, "loginCodes"));

      // loop through the server documents and return the current code
      querySnapshot.forEach((doc) => {
        if (doc.data().weekday !== day) return;
        const currentCode = doc.data().code.toString();
        setCode(currentCode);
      });
      setLoaded(true);
    }
    getCodeOfDay();
  }, []);

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
