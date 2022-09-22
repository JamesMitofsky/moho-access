import { Grid, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

export default function CodeOfDay({ value }) {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1,
        marginTop: 3,
        gap: 7,
      }}
    >
      {value && (
        <QRCodeSVG
          style={{
            height: "auto",
            width: 230,
            margin: 0,
          }}
          level="H"
          value={value.toString()}
        />
      )}
      <Typography variant="subtitle2">Actif de 9h à 19h</Typography>
    </Grid>
  );
}
