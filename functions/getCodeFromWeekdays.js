export default function getCodeFromWeekdays(arrayOfWeekdays) {
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

  const response = arrayOfWeekdays.find((item) => {
    return item.weekday === day;
  });
  return response;
}
