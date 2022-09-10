// firebase library
import { collection, query, where, getDocs } from "firebase/firestore";
// local db config
import { db } from "../services/firebase";

export default async function isUserAuthorized(uidInquiry) {
  if (!uidInquiry) return false;
  const possibleRoles = ["admin", "resident"];

  const q = query(collection(db, "userRoles"), where("uid", "==", uidInquiry));

  const querySnapshot = await getDocs(q);
  const response = querySnapshot.docs[0].data();

  // // iterate through all possible user roles
  // const userRoles = possibleRoles.map((role) => {
  //   // check all existing roles from the server object
  //   const roleStatus = response.role.find((serverRole) => serverRole === role);
  //   return roleStatus;
  // });
  return response;
}
