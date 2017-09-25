import React from 'react';
import styled from 'styled-components';
import withStyled from '../utils/withStyled';

const FontIcon = ({ alt, children, className, theme, value, ...other }) => (
  <SpanNode
    aria-label={alt}
    className={
      typeof value === 'string' || typeof children === 'string' ? (
        `material-icons ${className}`
      ) : (
        className
      )
    }
  >
    {value}
    {children}
  </SpanNode>
);

const SpanNode = styled.span``;

FontIcon.defaultProps = {
  alt: '',
};

export default withStyled()(FontIcon);
