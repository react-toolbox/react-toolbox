import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { CARD } from '../identifiers.js';

const CardMedia = ({ aspectRatio, children, className, color, contentOverlay, image, theme, ...other }) => {
  const classes = classnames(theme.cardMedia, {
    [theme[aspectRatio]]: aspectRatio
  }, className);

  const innerClasses = classnames(theme.content, {
    [theme.contentOverlay]: contentOverlay
  });

  const bgStyle = {
    backgroundColor: color ? color : undefined,
    backgroundImage: typeof image === 'string' ? `url('${image}')` : undefined
  };

  return (
    <div style={bgStyle} className={classes} {...other}>
      <div className={innerClasses}>
        {children}
      </div>
    </div>
  );
};

CardMedia.propTypes = {
  aspectRatio: PropTypes.oneOf([ 'wide', 'square' ]),
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.string,
  contentOverlay: PropTypes.bool,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  theme: React.PropTypes.shape({
    cardMedia: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    contentOverlay: React.PropTypes.string.isRequired,
    square: React.PropTypes.string.isRequired,
    wide: React.PropTypes.string.isRequired
  })
};

export default themr(CARD)(CardMedia);
export { CardMedia };
