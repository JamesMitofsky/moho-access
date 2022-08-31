import { Grid, CircularProgress } from "@mui/material";

export default function Loading({ loaded }) {
  return (
    !loaded && (
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <CircularProgress />
      </Grid>
    )
  );
}
