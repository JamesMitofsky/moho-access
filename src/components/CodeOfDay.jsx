import { useEffect, useState } from "react";
// firebase library
import { collection, query, onSnapshot } from "firebase/firestore";
// local db config
import { db } from "../firebase";

import { QRCodeSVG } from "qrcode.react";
import { Typography } from "@mui/material";

export default function CodeOfDay() {
  const [codes, setCodes] = useState([]);

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const d = new Date();
  const day = weekdays[d.getDay()];
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

  return (
    <>
      {isWeekday && (
        <QRCodeSVG
          style={{ height: "auto", width: "70%", maxWidth: "250px" }}
          value={codes.filter((item) => item.weekday === day)}
        />
      )}
      {!isWeekday && (
        <Typography sx={{ textAlign: "center", mt: 7 }} variant="h2">
          🚧 No codes on the weekend — profitez!
        </Typography>
      )}
    </>
  );
}
