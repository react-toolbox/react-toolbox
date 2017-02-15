export default function fromDateWithDay(date, day) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    day,
  );
}
