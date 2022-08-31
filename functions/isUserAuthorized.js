// firebase library
import { collection, query, where, getDocs } from "firebase/firestore";
// local db config
import { db } from "../services/firebase";

export default async function isUserAuthorized(uidInquiry, authTypes) {
  if (!uidInquiry) return false;
  const q = query(collection(db, "userRoles"), where("uid", "==", uidInquiry));

  const querySnapshot = await getDocs(q);
  const response = querySnapshot.docs[0].data();
  const isAuthorized = authTypes.some((authType) => {
    return response.roles[authType] === true;
  });
  //   const isAuthorized = response.roles[authType] === true ? true : false;
  return isAuthorized;
}
