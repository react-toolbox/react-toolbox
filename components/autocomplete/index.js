import { themr } from 'react-css-themr';
import { AUTOCOMPLETE } from '../identifiers';
import { autocompleteFactory } from './Autocomplete';
import { Chip } from '../Chip';
import { Input } from '../Input';
import theme from './theme.css';

const Autocomplete = autocompleteFactory(Chip, Input);
const ThemedAutocomplete = themr(AUTOCOMPLETE, theme)(Autocomplete);

export default ThemedAutocomplete;
export { ThemedAutocomplete as Autocomplete };
