/* eslint-disable */

import { themr } from 'react-css-themr';
import { autocompleteFactory } from '../autocomplete';
import { Chip } from '../chip';
import { Input } from '../input';

import theme from '../autocomplete/theme.css';
import overrides from './overrides.css';

const overriddenTheme = { ...theme, inputInputElement: theme.inputInputElement+' '+overrides.inputInputElement };

const Autocomplete = autocompleteFactory(Chip, Input);
const ThemedAutocomplete = themr(AUTOCOMPLETE, overriddenTheme, { withRef: true })(Autocomplete);

export const Dropdown = (props) => <Autocomplete
  readOnly
  multiple={false}
  keepFocusOnChange={false}
  allowCreate={false}
  showSelectedWhenNotInSource={false}
  suggestionMatch="disabled"
  {...props}
/>;

export default Dropdown;
