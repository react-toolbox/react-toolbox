import { createComponent } from 'react-fela';
import getFilterProps from '../utils/getFilterProps';
import buttonStyle from './style';

export default createComponent(
  buttonStyle,
  'button',
  getFilterProps([
    'accent',
    'flat',
    'floating',
    'mini',
    'neutral',
    'primary',
    'raised',
  ]),
);
