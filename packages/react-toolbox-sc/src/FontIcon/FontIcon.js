import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withStyled from '../utils/withStyled';

const FontIcon = ({ alt, children, className, value, ...other }) => (
  <SpanNode
    aria-label={alt}
    className={
      typeof value === 'string' || typeof children === 'string'
        ? `material-icons ${className}`
        : className
    }
    {...other}
  >
    {value}
    {children}
  </SpanNode>
);

FontIcon.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const SpanNode = styled.span``;

FontIcon.defaultProps = {
  alt: '',
};

export default withStyled()(FontIcon);
