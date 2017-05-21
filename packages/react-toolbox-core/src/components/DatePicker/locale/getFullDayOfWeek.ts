import getLocale from './dateLocales';
import hasOwnProperty from '../../../utils/hasOwnProperty';

export default function getFullDayOfWeek(weekDay: number, locale: string | object = 'en'): string {
  const localeObject = getLocale(locale);
  return hasOwnProperty(localeObject, 'weekdays') && localeObject.weekdays
    ? localeObject.weekdays[weekDay] || 'Unknown'
    : 'Unknown';
}
