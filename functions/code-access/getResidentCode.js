import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import getCodeFromWeekdays from "../getCodeFromWeekdays";
import { useEffect } from "react";

export default function getResidentCode() {
  useEffect(() => {
    async function wrapperFunc() {
      // get codes from server
      const querySnapshot = await getDocs(collection(db, "loginCodes"));
      // move server data into an object
      const arrayOfWeekdays = querySnapshot.docs.map((doc) => doc.data());
      // get the code for the current day
      const codeOfDay = getCodeFromWeekdays(arrayOfWeekdays);

      // save to local for later consumption
      localStorage.setItem("code", JSON.stringify(codeOfDay));

      // move the string value of today's code to the actual QR code
      if (!codeOfDay) return;
      return codeOfDay.code.toString();
    }
    wrapperFunc();
  }, []);
}
