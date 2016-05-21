import React, {PropTypes} from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Avatar from '../avatar';

const Chip = ({children, className, deletable, onDeleteClick, theme, ...other}) => {
  let hasAvatar = false;
  if (React.Children.count(children)) {
    const firstChild = children[0];
    hasAvatar = firstChild && firstChild.type && firstChild.type === Avatar;
  }

  const classes = classnames(theme.chip, {
      [theme.deletable]: !!deletable,
      [theme.avatar]: !!hasAvatar
  }, className);

  return (
    <div data-react-toolbox='chip' className={classes} {...other}>
      {typeof children === 'string' ? <span>{children}</span> : children}
      {
        deletable ? (
          <span className={theme.delete} onClick={onDeleteClick}>
            <svg viewBox="0 0 40 40" className={theme.deleteIcon}>
              <path className={theme.deleteX} d="M 12,12 L 28,28 M 28,12 L 12,28" />
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
  onDeleteClick: PropTypes.func,
  theme: React.PropTypes.shape({
    avatar: React.PropTypes.string.isRequired,
    chip: React.PropTypes.string.isRequired,
    deletable: React.PropTypes.string.isRequired,
    delete: React.PropTypes.string.isRequired,
    deleteIcon: React.PropTypes.string.isRequired,
    deleteX: React.PropTypes.string.isRequired
  })
};

Chip.defaultProps = {
  className: '',
  deletable: false
};

export default themr('ToolboxChip')(Chip);
