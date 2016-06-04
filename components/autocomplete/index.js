import { AUTOCOMPLETE } from '../identifiers.js';
import { themr } from 'react-css-themr';
import { autocompleteFactory } from './Autocomplete.js';
import Chip from '../chip';
import Input from '../input';
import theme from './theme.scss';

const Autocomplete = autocompleteFactory(Chip, Input);
const ThemedAutocomplete = themr(AUTOCOMPLETE, theme)(Autocomplete);

export default ThemedAutocomplete;
export { ThemedAutocomplete as Autocomplete };
