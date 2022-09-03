import { useEffect, useState } from "react";
// firebase library
import {
  setDoc,
  doc,
  getDocs,
  Timestamp,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
// local db config
import { db } from "../../services/firebase";
import WelcomeText from "../../components/WelcomeText.jsx";
import { Link as NextLink } from "next/link";

import {
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Loading from "../../components/Loading.jsx";

export default function ManageKeys() {
  const [loaded, setLoaded] = useState(false);
  const [keys, setKeys] = useState([]);
  const [codes, setCodes] = useState([]);
  const [requestedName, setRequestedName] = useState("");

  // TODO:
  // add drop down list for type of access to be provisioned (admin, resident, etc) (maybe functions can be used for day pass)
  // check database to make sure use exists before giving them access

  useEffect(() => {
    async function getKeys() {
      const q = query(collection(db, "globalKeys"));
      onSnapshot(q, (querySnapshot) => {
        const keysArray = [];
        querySnapshot.forEach((doc) => {
          keysArray.push(doc.data());
        });
        setKeys(keysArray);
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
    const alreadyExists = keys.find((doc) => doc.name === requestedName);

    if (!alreadyExists) {
      setRequestedName("");
      await setDoc(doc(db, "globalKeys", requestedName), {
        name: requestedName,
        urlSafe: requestedName
          // remove all non-alphanumeric values except for spaces
          .replace(/[^a-zA-Z0-9- ]/g, "")
          // replace spaces with dashes
          .replace(/\s+/g, "-")
          // set to lowercase
          .toLowerCase(),
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

  const listItems = keys.map((doc) => {
    const constructedURL = `https://moho-auth.vercel.app/key?value=${doc.urlSafe}`;
    return (
      <ListItem divider key={doc.id}>
        <ListItemText primary={doc.name} />
        <Link component={NextLink} href={constructedURL}>
          {constructedURL}
        </Link>
      </ListItem>
    );
  });

  return (
    <>
      <Loading loaded={loaded} />
      {loaded && (
        <>
          <WelcomeText />
          <Typography variant="h2">Global Access Keys</Typography>
          <Typography variant="subtitle1">
            The key-words listed below are active, and anyone who knows them can
            access Moho .{" "}
          </Typography>
          <List>{listItems}</List>
          <Grid component="form">
            <TextField
              fullWidth
              label="Enter the name for a key"
              value={requestedName}
              onChange={(e) => setRequestedName(e.target.value)}
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
