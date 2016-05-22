import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import Ripple from '../ripple';

const Radio = ({checked, onMouseDown, theme, ...other}) => (
  <div
    data-react-toolbox='radio'
    className={theme[checked ? 'radioChecked' : 'radio']}
    onMouseDown={onMouseDown}
    {...other}
  />
);

Radio.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.any,
  onMouseDown: PropTypes.func,
  theme: PropTypes.shape({
    radio: PropTypes.string.isRequired,
    radioChecked: PropTypes.string.isRequired,
    ripple: PropTypes.string.isRequired
  })
};

const RawRadio = themr('ToolboxRadio')(Radio);
export default themr('ToolboxRadio')(Ripple({
  spread: 2.6,
  centered: true
})(Radio));
export {RawRadio as RawRadio};
