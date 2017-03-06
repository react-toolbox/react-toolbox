import { themr } from 'react-css-themr';
import { TIME_PICKER } from '../identifiers';
import { timePickerFactory } from './TimePicker';
import timePickerDialogFactory from './TimePickerDialog';
import { Dialog } from '../dialog';
import { Input } from '../input';
import theme from './theme.css';

const TimePickerDialog = timePickerDialogFactory(Dialog);
const ThemedTimePicker = themr(TIME_PICKER, theme)(timePickerFactory(TimePickerDialog, Input));
export default ThemedTimePicker;
export { ThemedTimePicker as TimePicker };
