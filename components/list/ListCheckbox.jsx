import React from 'react';
import Checkbox from '../checkbox';
import ListItemContent from './ListItemContent';
import style from './style';

const ListCheckbox = (props) => {
  let className = `${style.item} ${style['checkbox-item']}`;
  if (props.legend) className += ` ${style['with-legend']}`;
  if (props.disabled) className += ` ${style.disabled}`;
  if (props.className) className += ` ${props.className}`;

  return (
    <li className={className}>
      <Checkbox
        checked={props.checked}
        className={style.checkbox}
        disabled={props.disabled}
        label={<ListItemContent caption={props.caption} legend={props.legend} />}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
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
  onFocus: React.PropTypes.func
};

ListCheckbox.defaultProps = {
  checked: false,
  disabled: false
};

export default ListCheckbox;
