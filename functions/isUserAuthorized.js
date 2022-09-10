// firebase library
import { collection, query, where, getDocs } from "firebase/firestore";
// local db config
import { db } from "../services/firebase";

export default async function isUserAuthorized(uidInquiry, userObj) {
  if (!uidInquiry) return false;

  const q = query(collection(db, "userRoles"), where("uid", "==", uidInquiry));

  try {
    const querySnapshot = await getDocs(q);
    const response = querySnapshot.docs[0].data();

    const completeUser = {
      ...response,
      displayName: userObj.displayName,
      photoURL: userObj.photoURL,
    };
    return response ? completeUser : false;
  } catch {
    console.warn("Not authorized to request user auth status");
  }
}
