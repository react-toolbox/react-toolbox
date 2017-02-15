import getFirstDayOfMonth from './getFirstDayOfMonth';

export default function getDaysInMonth(date) {
  const resultDate = getFirstDayOfMonth(date);
  resultDate.setMonth(resultDate.getMonth() + 1);
  resultDate.setDate(resultDate.getDate() - 1);
  return resultDate.getDate();
}
