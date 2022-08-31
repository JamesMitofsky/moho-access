import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { QRCodeSVG } from "qrcode.react";

export default function CodeOfDay({ loaded, setLoaded }) {
  const [codes, setCodes] = useState([]);
  const [codeOfDay, setCodeOfDay] = useState();

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const d = new Date();
  // subtract 1 from day to get correct day of week (because JS starts at 0)
  const day = weekdays[d.getDay() - 1];
  const isWeekday = weekdays.includes(day);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, "loginCodes"));
    onSnapshot(taskColRef, (snapshot) => {
      setCodes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          code: doc.data().code,
          weekday: doc.data().weekday,
        }))
      );
    });
  }, []);

  useEffect(() => {
    currentCode();
  }, [codes]);

  const currentCode = () => {
    if (codes.length === 0) return;
    const code = codes.find((code) => code.weekday === day);
    setCodeOfDay(code.code.toString());
    setLoaded(true);
  };

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
      {isWeekday && loaded && (
        <QRCodeSVG
          style={{
            height: "auto",
            width: 230,
            marginTop: 100,
            marginBottom: 100,
          }}
          level="H"
          value={codeOfDay}
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
