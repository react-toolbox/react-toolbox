import { themr } from 'react-css-themr';
import { DATE_PICKER, DIALOG } from '../identifiers';
import { datePickerFactory } from './DatePicker';
import datePickerDialogFactory from './DatePickerDialog';
import calendarFactory from './Calendar';

import { IconButton } from '../button';
import { Input } from '../input';
import { Dialog } from '../dialog';
import theme from './theme.css';

const Calendar = calendarFactory(IconButton);
const DatePickerDialog = datePickerDialogFactory(Dialog, Calendar);
const DatePicker = datePickerFactory(Input, DatePickerDialog);

const ThemedDatePicker = themr(DATE_PICKER, theme)(DatePicker);
export default ThemedDatePicker;
export { ThemedDatePicker as DatePicker };

const ThemedDatePickerDialog = themr(DIALOG, theme)(DatePickerDialog);
export { ThemedDatePickerDialog as DatePickerDialog };
