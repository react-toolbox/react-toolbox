import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Checkbox from '../checkbox';
import ListItemContent from './ListItemContent';

const ListCheckbox = ({ caption, checked, className, disabled, legend, name, onBlur, onChange, onFocus, theme }) => {
  const _className = classnames(theme.item, theme.checkboxItem, {
    [theme.disabled]: disabled
  }, className);

  return (
    <li className={_className}>
      <Checkbox
        checked={checked}
        className={theme.checkbox}
        disabled={disabled}
        label={<ListItemContent caption={caption} legend={legend} />}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      />
    </li>
  );
};

ListCheckbox.propTypes = {
  caption: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  legend: React.PropTypes.string,
  name: React.PropTypes.string,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  theme: React.PropTypes.shape({
    checkbox: React.PropTypes.string.isRequired,
    checkboxItem: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.string.isRequired,
    item: React.PropTypes.string.isRequired
  })
};

ListCheckbox.defaultProps = {
  checked: false,
  disabled: false
};

export default themr('ToolboxList')(ListCheckbox);
