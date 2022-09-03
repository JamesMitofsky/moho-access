// before looking for code, check if it exists locally
export default function existsLocally() {
  const rawLocalObj = localStorage.getItem("code");
  if (rawLocalObj === "undefined") return;
  const localObj = JSON.parse(rawLocalObj);

  // get day & subtract 1 to correct for JS starting at 0
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const day = weekdays[d.getDay() - 1];

  // if the object exists & the day is the same, use this local version
  if (!localObj?.weekday === day) return false;
  return localObj.code.toString();
}
