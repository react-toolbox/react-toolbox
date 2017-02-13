import cloneDate from './cloneDate';

export default function addMonths(date, months) {
  const newDate = cloneDate(date);
  newDate.setMonth(date.getMonth() + months, 1);
  return newDate;
}
