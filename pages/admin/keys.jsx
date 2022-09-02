import { useEffect, useState } from "react";
// firebase library
import {
  setDoc,
  doc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
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
  const [codes, setCodes] = useState([]);
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
    async function getCodes() {
      const codes = await getDocs(collection(db, "loginCodes"));
      codes.forEach((doc) => {
        setCodes((prev) => [...prev, doc.data()]);
      });
    }
    getKeys();
    getCodes();
    setLoaded(true);
  }, []);

  async function giveUserAccess() {
    const alreadyExists = keys.find((doc) => doc.key === requestedKey);
    console.log(requestedKey);

    if (!alreadyExists) {
      await setDoc(doc(db, "globalKeys", requestedKey), {
        key: requestedKey,
        weekdays: codes,
        created: Timestamp.now(),
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
          <Typography variant="h2">Existing Keys</Typography>
          <List>{keys.map((doc) => doc.key)}</List>
          <Grid component="form">
            <Typography variant="h2">Create a Key</Typography>

            <TextField
              fullWidth
              placeholder="Enter desired key"
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
