import getLocale from './dateLocales';
import hasOwnProperty from '../../../utils/hasOwnProperty';

export default function getShortMonth(date, locale = 'en') {
  const month = date.getMonth();
  const localeObject = getLocale(locale);
  return (hasOwnProperty(localeObject, 'months'))
    ? localeObject.monthsShort[month] || 'Unknown'
    : 'Unknown';
}
