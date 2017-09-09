import color from 'color';

export default (colorString, alphaValue) =>
  color(colorString)
    .alpha(alphaValue)
    .string();
