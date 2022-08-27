import { useEffect, useState } from "react";
// firebase library
import { collection, query, onSnapshot } from "firebase/firestore";
// local db config
import { db } from "../firebase";

export default function CodeOfDay() {
  const [codes, setCodes] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, "loginCodes"));
    onSnapshot(taskColRef, (snapshot) => {
      setCodes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          code: doc.data().code,
          weekday: doc.data().weekday,
        }))
      );
    });
  }, []);
  console.log(codes);

  return <div>live</div>;
}
