import getLocale from './dateLocales';
import hasOwnProperty from '../../../utils/hasOwnProperty';

export default function getFullMonth(date, locale = 'en') {
  const month = date.getMonth();
  const localeObject = getLocale(locale);
  return hasOwnProperty(localeObject, 'months')
    ? localeObject.months[month] || 'Unknown'
    : 'Unknown';
}
