import React, {PropTypes} from 'react';
import ClassNames from 'classnames';
import Avatar from '../avatar';
import style from './style';

const Chip = ({children, className, deletable, onDeleteClick, ...other}) => {
  let hasAvatar = false;
  if (React.Children.count(children)) {
    const firstChild = children[0];
    hasAvatar = firstChild && firstChild.type && firstChild.type === Avatar;
  }

  const classes = ClassNames(style.chip, {
      [style.deletable]: !!deletable,
      [style.avatar]: !!hasAvatar
  }, className);

  return (
    <div data-react-toolbox='chip' className={classes} {...other}>
      {typeof children === 'string' ? <span>{children}</span> : children}
      {
        deletable ? (
          <span className={style.delete} onClick={onDeleteClick}>
            <svg viewBox="0 0 40 40" className={style.deleteIcon}>
              <path className={style.deleteX} d="M 12,12 L 28,28 M 28,12 L 12,28" />
            </svg>
          </span>
        ) : null
      }
    </div>
  );
};

Chip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  deletable: PropTypes.bool,
  onDeleteClick: PropTypes.func
};

Chip.defaultProps = {
  className: '',
  deletable: false
};

export default Chip;
