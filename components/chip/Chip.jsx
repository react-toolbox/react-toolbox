import React, {PropTypes} from 'react';
import FontIcon from '../font_icon';
import style from './style';
import ClassNames from 'classnames';

const Chip = ({children, className, deletable, onDeleteClick, ...other}) => {
  let hasAvatar = false;
  if (React.Children.count(children)) {
    const firstChild = children[0];
    hasAvatar = firstChild && firstChild.type && firstChild.type.name === 'Avatar';
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
            <FontIcon value="close" />
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
