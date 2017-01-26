import { themr } from 'react-css-themr';
import { DROPDOWN } from '../identifiers';
import { dropdownFactory } from './Dropdown';
import { Input } from '../input';
import theme from './theme.css';

const Dropdown = dropdownFactory(Input);
const ThemedDropdown = themr(DROPDOWN, theme)(Dropdown);

export default ThemedDropdown;
export { ThemedDropdown as Dropdown };
