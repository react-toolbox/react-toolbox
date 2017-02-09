import createComponent from '../utils/createComponent';

export default createComponent('button', {
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
