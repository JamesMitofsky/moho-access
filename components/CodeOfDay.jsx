import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

export default function CodeOfDay({ value }) {
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
      {value && (
        <QRCodeSVG
          style={{
            height: "auto",
            width: 230,
            marginTop: 100,
            marginBottom: 100,
          }}
          level="H"
          value={value}
        />
      )}
    </Grid>
  );
}
