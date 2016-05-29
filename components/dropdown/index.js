import { themr } from 'react-css-themr';
import { DROPDOWN } from '../identifiers.js';
import { dropdownFactory } from './Dropdown.js';
import { Input } from '../input';
import theme from './theme.scss';

const Dropdown = dropdownFactory(Input);
const ThemedDropdown = themr(DROPDOWN, theme)(Dropdown);

export default ThemedDropdown;
export { ThemedDropdown as Dropdown };
