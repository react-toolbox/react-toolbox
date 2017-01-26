import withTheme from '../withTheme';
import theme from './withRipple.css';

const enhance = withTheme({
  name: 'rippleWrapper',
  modifiers: ['active', 'restarting'],
  theme,
});

export default enhance('span');
