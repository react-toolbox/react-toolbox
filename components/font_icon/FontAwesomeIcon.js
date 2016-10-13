import React, { PropTypes } from 'react';
import classnames from 'classnames';

const FontAwesomeIcon = ({name, modifiers, className, ...rest}) => {
  const modifierClasses = modifiers ? modifiers.split(',').map((m) => (`fa-${m}`)) : null;
  return (
    <span
      className={classnames(className, 'fa', `fa-${name}`, modifierClasses)}
      {...rest}
    />
  );
};


FontAwesomeIcon.propTypes = {
  className: PropTypes.className,
  modifiers: PropTypes.string,
  name: PropTypes.string
};

export default FontAwesomeIcon;
