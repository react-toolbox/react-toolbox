import createComponent from '../utils/createComponent';

export default createComponent('a', {
  name: 'buttonNode',
  modifiers: [
    'flat',
    'inverse',
    'floating',
    'disabled',
    'primary',
    'accent',
    'raised',
    'mini',
    'neutral',
  ],
});
