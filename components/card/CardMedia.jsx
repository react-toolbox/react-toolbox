import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import style from './style';

class CardMedia extends Component {

  static propTypes = {
    aspectRatio: PropTypes.oneOf([ 'wide', 'square' ]),
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ])
  }

  render () {
    const {
      aspectRatio,
      children,
      className,
      color,
      image,
      ...otherProps
    } = this.props;

    const classes = ClassNames(style.cardMedia, {
      [style[aspectRatio]]: aspectRatio
    }, className);

    const bgStyle = {
      backgroundColor: color ? color : undefined,
      backgroundImage: typeof image === 'string' ? `url('${image}')` : undefined
    };

    return (
      <div style={bgStyle} className={classes} {...otherProps}>
        <div className={style.content}>
          {children}
        </div>
      </div>
    );
  }
}

export default CardMedia;
