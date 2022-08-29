import { Button } from "@mui/material";
import { auth } from "../services/firebase";

export default function SignOut() {
  ``;
  return (
    <Button
      variant="outlined"
      fullWidth
      type="submit"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </Button>
  );
}
