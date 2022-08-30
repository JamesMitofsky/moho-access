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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
export default function AdminPortal() {
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");

  // TODO:
  // add drop down list for type of access to be provisioned (admin, resident, etc) (maybe functions can be used for day pass)
  // check database to make sure use exists before giving them access

  /* get all user roles to render on screen */
  useEffect(() => {
    const taskColRef = query(collection(db, "userRoles"));
    onSnapshot(taskColRef, (snapshot) => {
      // todo: spread roles into an array that can be flattened.
      setUsers(
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

  // useEffect(() => {
  //   setGroupedRoles(() => {
  //     const groupedRoles = {
  //       residents: [],
  //       admins: [],
  //     };
  //     users.forEach((user) => {
  //       if (user.roles.includes("admin")) {
  //         groupedRoles.admins.push(role);
  //       } else {
  //         groupedRoles.residents.push(role);
  //       }
  //     });
  //     return groupedRoles;
  //   });

  //   setLoaded(true);
  // }, [groupedRoles]);

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
          <Typography variant="h2">Authorized Users</Typography>
          <List>
            {users.map((role) => (
              <ListItem divider key={role.id}>
                <ListItemText primary={role.email} secondary={role.uid} />
              </ListItem>
            ))}
          </List>
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
