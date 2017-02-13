import getFirstDayOfMonth from './getFirstDayOfMonth';

export default function getFirstWeekDay(date) {
  return getFirstDayOfMonth(date).getDay();
}
