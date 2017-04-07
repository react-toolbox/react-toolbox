import hasOwnProperty from '../../../utils/hasOwnProperty';

export default function isDateRange(selection) {
  if (!selection) return false;
  return hasOwnProperty(selection, 'from') || hasOwnProperty(selection, 'to');
}
