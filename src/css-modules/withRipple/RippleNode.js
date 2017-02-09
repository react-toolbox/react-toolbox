import createComponent from '../utils/createComponent';
import theme from './withRipple.css';

export default createComponent('span', {
  name: 'rippleNode',
  modifiers: [
    'active',
    'restarting',
  ],
  theme,
});
