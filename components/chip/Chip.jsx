import React, {PropTypes} from 'react';
import FontIcon from '../font_icon';
import style from './style';
import ClassNames from 'classnames';

const Chip = ({className, deletable, avatar, label, onDeleteClick, ...other}) => {
  const classes = ClassNames(style.chip, {
      [style.deletable]: !!deletable,
      [style.contactChip]: !!avatar
  }, className);

  return (
    <div data-react-toolbox='chip' className={classes} {...other}>
      {avatar ? avatar : null}
      <span className={style.label}>{label}</span>
      {
        deletable ? (
          <span className={style.delete} onClick={onDeleteClick}>
            <FontIcon value="close" />
          </span>
        ) : null
      }
    </div>
  );
};

Chip.propTypes = {
  avatar: PropTypes.element,
  className: PropTypes.string,
  deletable: PropTypes.bool,
  label: PropTypes.string,
  onDeleteClick: PropTypes.func
};

Chip.defaultProps = {
  avatar: null,
  className: '',
  deletable: false,
  label: ''
};

export default Chip;
