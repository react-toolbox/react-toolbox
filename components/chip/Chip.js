import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { CHIP } from '../identifiers';
import InjectAvatar from '../avatar/Avatar';

const factory = (Avatar) => {
  const Chip = ({ children, className, deletable, onDeleteClick, theme, ...other }) => {
    let hasAvatar = false;
    if (React.Children.count(children)) {
      const flatChildren = React.Children.toArray(children);
      const firstChild = flatChildren[0];
      hasAvatar = firstChild && firstChild.type && firstChild.type === Avatar;
    }

    const classes = classnames(theme.chip, {
      [theme.deletable]: !!deletable,
      [theme.avatar]: !!hasAvatar,
    }, className);

    return (
      <div data-react-toolbox="chip" className={classes} {...other}>
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
    theme: PropTypes.shape({
      avatar: PropTypes.string,
      chip: PropTypes.string,
      deletable: PropTypes.string,
      delete: PropTypes.string,
      deleteIcon: PropTypes.string,
      deleteX: PropTypes.string,
    }),
  };

  Chip.defaultProps = {
    className: '',
    deletable: false,
  };

  return Chip;
};

const Chip = factory(InjectAvatar);
export default themr(CHIP)(Chip);
export { factory as chipFactory };
export { Chip };
