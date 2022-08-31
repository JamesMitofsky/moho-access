import { createContext, useContext, useState, useEffect } from "react";
import firebase from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import isUserAuthorized from "../functions/isUserAuthorized";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);

  async function getUserInfo(userObj) {
    const docRef = doc(db, "users", userObj.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (userObj) => {
      console.log(
        "isuserauthorized",
        await isUserAuthorized(userObj.uid, ["admin", "resident"])
      );
      // getUserInfo(userObj);
      // setUser(user);
    });
  }, []);

  return <AppContext.Provider value={user}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
