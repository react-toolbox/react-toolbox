import withTheme from '../withTheme';
import theme from './withRipple.css';

const enhance = withTheme({
  name: 'rippleNode',
  modifiers: ['active', 'restarting'],
  theme,
});

export default enhance('span');
