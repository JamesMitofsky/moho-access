import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import existsLocally from "../functions/checkLocalStorage";

export default function CodeOfDay({ loaded, setLoaded, value }) {
  const [code, setCode] = useState("");

  useEffect(() => {
    async function getCodeOfDay() {
      // return true if it exists, skipping server call
      const localCode = existsLocally();
      if (localCode) {
        setCode(localCode);
        return;
      }
      setCode(value);
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
    </Grid>
  );
}
