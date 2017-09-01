import getLocale, { Locales, Locale } from './dateLocales';
import hasOwnProperty from '../../../utils/hasOwnProperty';

export default function getShortMonth(
  date: Date,
  locale: keyof Locales | Locale = 'en',
): string {
  const month = date.getMonth();
  const localeObject = getLocale(locale);
  return hasOwnProperty(localeObject, 'months') && localeObject.monthsShort
    ? localeObject.monthsShort[month] || 'Unknown'
    : 'Unknown';
}
