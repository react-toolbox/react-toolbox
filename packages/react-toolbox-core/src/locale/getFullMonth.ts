import getLocale, { Locales, Locale } from './dateLocales';
import hasOwnProperty from '../utils/hasOwnProperty';

export default function getFullMonth(date: Date, locale: keyof Locales | Locale = 'en'): string {
  const month = date.getMonth();
  const localeObject = getLocale(locale);
  return hasOwnProperty(localeObject, 'months') && !!localeObject.months
    ? localeObject.months[month] || 'Unknown'
    : 'Unknown';
}
