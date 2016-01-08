import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import style from './style';

class CardMedia extends Component {
  static propTypes = {
    aspectRatio: PropTypes.oneOf([ 'wide', 'square' ]),
    children: PropTypes.any,
    className: PropTypes.string,
    color: PropTypes.string,
    contentOverlay: PropTypes.bool,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  };

  render () {
    const { aspectRatio, children, className, color, contentOverlay, image, ...other } = this.props;
    const classes = ClassNames(style.cardMedia, {
      [style[aspectRatio]]: aspectRatio
    }, className);

    const innerClasses = ClassNames(style.content, {
      [style.contentOverlay]: contentOverlay
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
  }
}

export default CardMedia;
