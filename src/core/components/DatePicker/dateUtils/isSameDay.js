export default function isSameDay(dateA, dateB) {
  if (!(dateA instanceof Date) || !(dateB instanceof Date)) return false;
  return dateA.getFullYear() === dateB.getFullYear()
    && dateA.getMonth() === dateB.getMonth()
    && dateA.getDate() === dateB.getDate();
}
