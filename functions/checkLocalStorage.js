// before looking for code, check if it exists locally
export default function existsLocally() {
  const localObj = JSON.parse(localStorage.getItem("code"));

  // get day & subtract 1 to correct for JS starting at 0
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const d = new Date();
  const day = weekdays[d.getDay() - 1];

  // if the object exists & the day is the same, use this local version
  if (!localObj?.weekday === day) return false;
  return localObj.code.toString();
}
