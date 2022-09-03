import { useEffect, useState } from "react";
// firebase library
import {
  collection,
  query,
  onSnapshot,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
// local db config
import { db } from "../../services/firebase";

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

import AdminLayout from "../../components/layouts/AdminLayout";

export default function ManageUsers() {
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [globalUsers, setGlobalUsers] = useState([]);
  const [emailInput, setEmailInput] = useState("");

  // TODO:
  // add drop down list for type of access to be provisioned (admin, resident, etc) (maybe functions can be used for day pass)
  // check database to make sure use exists before giving them access

  useEffect(() => {
    /* get all user roles to render on screen */
    const userRolesColRef = query(collection(db, "userRoles"));
    onSnapshot(userRolesColRef, (snapshot) => {
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

    // get all users in database
    const usersColRef = query(collection(db, "users"));
    onSnapshot(usersColRef, (snapshot) => {
      setGlobalUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          email: doc.data().email,
        }))
      );
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
    // set conditions to be used in if-statement
    const existsInGlobalUsers = globalUsers.find(
      (user) => user.email === emailInput
    );
    const alreadyExistsAsAuthorized = users.find(
      (user) => user.email === emailInput
    );

    if (!alreadyExistsAsAuthorized && existsInGlobalUsers) {
      await setDoc(doc(db, "userRoles", existsInGlobalUsers.uid), {
        uid: existsInGlobalUsers.uid,
        email: existsInGlobalUsers.email,
        roles: { resident: true },
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

  function objToString(roles) {
    return Object.keys(roles).join(", ");
  }

  return (
    <AdminLayout>
      {!loaded && <CircularProgress />}
      {loaded && (
        <>
          <Typography variant="h2">Authorized Users</Typography>
          <List>
            {users.map((role) => (
              <ListItem divider key={role.id}>
                <ListItemText
                  primary={role.email}
                  secondary={objToString(role.roles)}
                />
              </ListItem>
            ))}
          </List>
          <Grid component="form">
            <TextField
              fullWidth
              type="email"
              name="email"
              placeholder="Enter email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Button onClick={giveUserAccess} variant="contained">
              Add Resident
            </Button>
          </Grid>
        </>
      )}
    </AdminLayout>
  );
}
