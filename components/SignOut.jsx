import { Button } from "@mui/material";
import { auth } from "../services/firebase";

export default function SignOut() {
  ``;
  return (
    <Button
      size="small"
      variant="outlined"
      type="submit"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </Button>
  );
}
