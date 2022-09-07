import { Button } from "@mui/material";
import { auth } from "../services/firebase";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SignOut() {
  ``;
  return (
    <Button
      size="small"
      variant="outlined"
      type="submit"
      onClick={() => auth.signOut()}
      startIcon={<LogoutIcon />}
    >
      Sign Out
    </Button>
  );
}
