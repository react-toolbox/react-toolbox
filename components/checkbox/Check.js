import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Ripple from '../ripple';

const Check = ({checked, children, onMouseDown, theme}) => (
  <div
    data-react-toolbox='check'
    className={classnames(theme.check, { [theme.checked]: checked })}
    onMouseDown={onMouseDown}
  >
    {children}
  </div>
);

Check.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.any,
  onMouseDown: PropTypes.func,
  theme: React.PropTypes.shape({
    check: React.PropTypes.string.isRequired,
    checked: React.PropTypes.string.isRequired
  })
};

const RawCheck = themr('ToolboxCheckbox')(Check);
export default themr('ToolboxCheckbox')(Ripple({
  spread: 2.6,
  centered: true
})(Check));

export {RawCheck as RawCheck};
