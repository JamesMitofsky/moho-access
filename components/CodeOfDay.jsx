import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { QRCodeSVG } from "qrcode.react";
import getCodeFromWeekdays from "../functions/getCodeFromWeekdays";
import existsLocally from "../functions/checkLocalStorage";

export default function CodeOfDay({ loaded, setLoaded }) {
  const [code, setCode] = useState("");

  useEffect(() => {
    async function getCodeOfDay() {
      // return true if it exists, skipping server call
      const code = existsLocally();
      if (code) {
        setCode(code);
        return;
      }

      // get codes from server
      const querySnapshot = await getDocs(collection(db, "loginCodes"));
      // move server data into an object
      const arrayOfWeekdays = querySnapshot.docs.map((doc) => doc.data());
      // get the code for the current day
      const codeOfDay = getCodeFromWeekdays(arrayOfWeekdays);

      // save to local for later consumption
      localStorage.setItem("code", JSON.stringify(codeOfDay));

      // move the string value of today's code to the actual QR code
      setCode(codeValue.code.toString());
    }
    getCodeOfDay();
    setLoaded(true);
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
      {loaded && code && (
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
      {!code && loaded && (
        <Typography sx={{ textAlign: "center", mt: 7 }} variant="h2">
          🚧 No codes on the weekend — profitez!
        </Typography>
      )}
    </Grid>
  );
}
