import React, { PropTypes, Component } from 'react';
import ClassNames from '../decorators/ClassNames';
import style from './style';

@ClassNames(style)
class CardMedia extends Component {

  static propTypes = {
    aspectRatio: PropTypes.oneOf([ 'wide', 'square' ]),
    children: PropTypes.node,
    className: PropTypes.string,
    classNames: PropTypes.func,
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
      classNames,
      color,
      image,
      ...otherProps
    } = this.props;

    const classes = classNames('cardMedia', aspectRatio, className);

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
