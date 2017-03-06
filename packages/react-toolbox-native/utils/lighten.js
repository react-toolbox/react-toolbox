import color from 'color';

export default (colorString, lightenValue) =>
  color(colorString).lighten(lightenValue).string();
