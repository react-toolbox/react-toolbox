import React, { PropTypes } from 'react';
import MaterialIcon from './MaterialIcon';
import FontAwesomeIcon from './FontAwesomeIcon';

const IconSpecRegExp = /(?:([^:]+):|)([^:]+)(?::(.*)|)/;

const FontIcon = ({ value, ...rest}) => {
  if (typeof value === 'string') {
      const valueParts = value.match(IconSpecRegExp),
            provider = valueParts[1],
            name = valueParts[2],
            modifiers = valueParts[3];

      switch (provider) {
        case 'fa':
          return <FontAwesomeIcon name={name} modifiers={modifiers} {...rest} />;
        case 'material':
        default:
          return <MaterialIcon value={name} {...rest} />;
      }
  } else {
    return <MaterialIcon value={value} {...rest} />;
  }
};

FontIcon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

FontIcon.defaultProps = {
  className: ''
};

export default FontIcon;
export { FontIcon };
