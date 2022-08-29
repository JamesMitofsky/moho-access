import { useEffect, useState } from "react";
// firebase library
import { collection, query, onSnapshot } from "firebase/firestore";
// local db config
import { db } from "../firebase";

import { QRCodeSVG } from "qrcode.react";
import { Typography, CircularProgress, Box } from "@mui/material";

export default function CodeOfDay() {
  const [codes, setCodes] = useState([]);
  const [codeOfDay, setCodeOfDay] = useState();
  const [loaded, setLoaded] = useState(false);

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
    <>
      {!loaded && <CircularProgress />}
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
    </>
  );
}
