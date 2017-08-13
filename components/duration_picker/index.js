import { themr } from 'react-css-themr';
import { TIME_PICKER } from '../identifiers';
import { durationPickerFactory } from './DurationPicker';
import durationPickerDialogFactory from './DurationPickerDialog';
import { Dialog } from '../dialog';
import { Input } from '../input';
import theme from './theme.css';

const DurationPickerDialog = durationPickerDialogFactory(Dialog);
const ThemedDurationPicker = themr(TIME_PICKER, theme)(
    durationPickerFactory(DurationPickerDialog, Input));
export default ThemedDurationPicker;
export { ThemedDurationPicker as DurationPicker };
