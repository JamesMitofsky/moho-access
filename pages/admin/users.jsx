import { useEffect, useState } from "react";
// firebase library
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
// local db config
import { db } from "../../services/firebase";
import { useAppContext } from "../../context/state";

import {
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import AdminLayout from "../../components/layouts/AdminLayout";
import Loading from "../../components/Loading";

export default function ManageUsers() {
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [globalUsers, setGlobalUsers] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const user = useAppContext();

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
      // setLoaded(true);
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
      setEmailInput("");
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

  async function deleteRole(user) {
    // get document from database which matches key
    await deleteDoc(doc(db, "userRoles", user.id));
  }

  return (
    <AdminLayout>
      {!loaded && <Loading />}
      {loaded && (
        <>
          <Typography variant="h2">Authorized Users</Typography>
          <List>
            {users.map((role) => {
              const notCurrentUser = role.email !== user?.email;
              return (
                <ListItem divider key={role.id}>
                  <ListItemText
                    primary={role.email}
                    secondary={`Type: ${objToString(role.roles)}`}
                  />
                  {notCurrentUser && (
                    <IconButton onClick={() => deleteRole(role)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
                </ListItem>
              );
            })}
          </List>
          <Grid component="form">
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Enter email"
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
