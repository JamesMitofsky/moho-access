import { useEffect, useState } from "react";
// firebase library
import { collection, getDocs, Timestamp } from "firebase/firestore";
// local db config
import { db } from "../../services/firebase";
import WelcomeText from "../../components/WelcomeText.jsx";

import {
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
export default function ManageKeys() {
  const [loaded, setLoaded] = useState(false);
  const [keys, setKeys] = useState([]);
  const [requestedKey, setRequestedKey] = useState("");

  // TODO:
  // add drop down list for type of access to be provisioned (admin, resident, etc) (maybe functions can be used for day pass)
  // check database to make sure use exists before giving them access

  useEffect(() => {
    async function getKeys() {
      const keys = await getDocs(collection(db, "globalKeys"));
      keys.forEach((doc) => {
        setKeys((prev) => [...prev, doc.data()]);
      });
    }
    getKeys();
    setLoaded(true);
  }, []);

  console.log(keys);

  async function giveUserAccess() {
    // set conditions to be used in if-statement
    const alreadyExists = keys.find((doc) => doc.key === requestedKey);

    if (!alreadyExistsAsAuthorized && existsInGlobalUsers) {
      await setDoc(doc(db, "globalKeys", existsInGlobalUsers.uid), {
        uid: existsInGlobalUsers.uid,
        email: existsInGlobalUsers.email,
        roles: { resident: true },
        Timestamp,
      });
    } else {
      alert(
        `Sorry, we couldn't add this user.\n${
          alreadyExistsAsAuthorized ? "User is already authorized." : ""
        }${
          !existsInGlobalUsers
            ? "This user has not yet registered themselves."
            : ""
        }`
      );
    }
  }

  return (
    <>
      {!loaded && <CircularProgress />}
      {loaded && (
        <>
          <WelcomeText />
          <Typography variant="h2">Manage Keys</Typography>
          <List>{keys.map((doc) => doc.key)}</List>
          <Grid component="form">
            <TextField
              fullWidth
              type="email"
              name="email"
              placeholder="Enter email"
              value={requestedKey}
              onChange={(e) => setRequestedKey(e.target.value)}
            />
            <Button onClick={giveUserAccess} variant="contained">
              Add Key
            </Button>
          </Grid>
        </>
      )}
    </>
  );
}
