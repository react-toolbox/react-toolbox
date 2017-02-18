import { themr } from 'react-css-themr';
import { AUTOCOMPLETE } from '../identifiers';
import { autocompleteFactory } from './Autocomplete';
import { Chip } from '../chip';
import { Input } from '../input';
import theme from './theme.css';

const Autocomplete = autocompleteFactory(Chip, Input);
const ThemedAutocomplete = themr(AUTOCOMPLETE, theme, { withRef: true })(Autocomplete);

export default ThemedAutocomplete;
export { ThemedAutocomplete as Autocomplete };
