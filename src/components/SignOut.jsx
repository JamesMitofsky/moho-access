import { Button } from "@mui/material";
import { auth } from "../firebase";

export default function SignOut() {
  console.log(auth);

  return (
    <Button
      style={{ margin: "5%" }}
      variant="outline-danger"
      type="submit"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </Button>
  );
}
