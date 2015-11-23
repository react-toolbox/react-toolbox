import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import style from './style';

/**
 * Used for displaying media such as images or videos
 * on a card. Can also be used with a solid background
 * color instead of an image.
 */
class CardMedia extends Component {

  static propTypes = {
    /**
     * Forces a 16:9 or 1:1 aspect ratio respectively. Unset, the media area will have a flexible height.
     */
    aspectRatio: PropTypes.oneOf([ 'wide', 'square' ]),
    /**
     * Usually an image/video element or a `<CardTitle>` component.
     */
    children: PropTypes.any,
    className: PropTypes.string,
    /** Sets the background color */
    color: PropTypes.string,
    /**
     * Creates a dark overlay underneath the child components.
     */
    contentOverlay: PropTypes.bool,
    /**
     * Can be used instead of children. Accepts an element or a URL string.
     */
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  }

  render () {
    const {
      aspectRatio,
      children,
      className,
      color,
      contentOverlay,
      image,
      ...otherProps
    } = this.props;

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
      <div style={bgStyle} className={classes} {...otherProps}>
        <div className={innerClasses}>
          {children}
        </div>
      </div>
    );
  }
}

export default CardMedia;
