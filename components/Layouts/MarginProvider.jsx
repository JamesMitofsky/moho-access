import { Container } from "@mui/material";
export default function MarginProvider({ children }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {children}
    </Container>
  );
}
