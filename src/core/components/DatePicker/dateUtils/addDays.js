export default function addDays(date, days) {
  const newDate = this.clone(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}
