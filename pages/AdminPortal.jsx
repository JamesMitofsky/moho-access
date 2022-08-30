import { useEffect, useState } from "react";
// firebase library
import { collection, query, onSnapshot, doc, setDoc } from "firebase/firestore";
// local db config
import { db } from "../services/firebase";

import {
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
} from "@mui/material";
export default function AdminPortal() {
  const [loaded, setLoaded] = useState(false);
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState("");

  // TODO:
  // add drop down list for type of access to be provisioned (admin, resident, etc) (maybe functions can be used for day pass)
  // check database to make sure use exists before giving them access

  /* get all user roles to render on screen */
  useEffect(() => {
    const taskColRef = query(collection(db, "userRoles"));
    onSnapshot(taskColRef, (snapshot) => {
      // todo: spread roles into an array that can be flattened.
      setRoles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          roles: doc.data().roles,
          email: doc.data().email,
        }))
      );
      setLoaded(true);
    });
  }, []);

  async function giveUserAccess() {
    await setDoc(doc(db, "userRoles", "USER_ID_HERE"), {
      uid: "USER_ID_HERE",
      email: "EMAIL",
      roles: { resident: true },
    });
  }

  return (
    <>
      {!loaded && <CircularProgress />}
      {loaded && (
        <>
          <Typography variant="h2">Give Resident Status</Typography>
          <ul>
            {roles.map((role) => (
              <ul key={role.id}>
                <li>{role.uid}</li>
                <li>{role.email}</li>
              </ul>
            ))}
          </ul>
          <Grid component="form">
            <TextField
              fullWidth
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={giveUserAccess} variant="contained">
              Add Resident
            </Button>
          </Grid>
        </>
      )}
    </>
  );
}
