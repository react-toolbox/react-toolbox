import { formFactory } from './Form.js';
import Autocomplete from '../autocomplete';
import Button from '../button';
import Checkbox from '../checkbox';
import DatePicker from '../date_picker';
import Dropdown from '../dropdown';
import Input from '../input';
import RadioGroup from '../radio';
import Slider from '../slider';
import Switch from '../switch';
import TimePicker from '../time_picker';

const ThemedForm = formFactory(
  Autocomplete, Button, Checkbox, DatePicker, Dropdown,
  Input, RadioGroup, Slider, Switch, TimePicker
);

export default ThemedForm;
export { ThemedForm as Form };
