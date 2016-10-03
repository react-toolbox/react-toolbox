import { themr } from 'react-css-themr';
import { DATE_PICKER, DIALOG } from '../identifiers.js';
import { datePickerFactory } from './DatePicker.js';
import datePickerDialogFactory from './DatePickerDialog.js';
import calendarFactory from './Calendar.js';

import { IconButton } from '../button';
import Input from '../input';
import Dialog from '../dialog';
import theme from './theme.scss';

const Calendar = calendarFactory(IconButton);
const DatePickerDialog = datePickerDialogFactory(Dialog, Calendar);
const DatePicker = datePickerFactory(Input, DatePickerDialog);

const ThemedDatePicker = themr(DATE_PICKER, theme)(DatePicker);
export default ThemedDatePicker;
export { ThemedDatePicker as DatePicker };

const ThemedDatePickerDialog = themr(DIALOG, theme)(DatePickerDialog);
export { ThemedDatePickerDialog as DatePickerDialog };
