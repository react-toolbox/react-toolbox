import { themr } from 'react-css-themr';
import { TIME_PICKER } from '../identifiers.js';
import { timePickerFactory } from './TimePicker.js';
import timePickerDialogFactory from './TimePickerDialog.js';
import Dialog from '../dialog';
import Input from '../input';
import theme from './theme.scss';

const TimePickerDialog = timePickerDialogFactory(Dialog);
const ThemedTimePicker = themr(TIME_PICKER, theme)(timePickerFactory(TimePickerDialog, Input));
export default ThemedTimePicker;
export { ThemedTimePicker as TimePicker };
