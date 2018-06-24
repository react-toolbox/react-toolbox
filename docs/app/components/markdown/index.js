import PropTypes from 'prop-types';
import React from 'react';
import style from './style';

const Markdown = (props) => {
  let className = style.markdown;
  if (props.className) className += ` ${props.className}`;

  const html = {
    __html: props.markdown
  };

  return <article className={className} dangerouslySetInnerHTML={html} />;
};

Markdown.propTypes = {
  className: PropTypes.string,
  markdown: PropTypes.string.isRequired
};

Markdown.defaultProps = {
  className: ''
};


export default Markdown;
