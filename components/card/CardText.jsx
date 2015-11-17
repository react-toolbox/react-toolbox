import React, { PropTypes, Component } from 'react';
import ClassNames from '../decorators/ClassNames';
import style from './style';

@ClassNames(style)
class CardText extends Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    classNames: PropTypes.func
  }

  render () {
    const {
      children,
      className,
      classNames,
      ...otherProps
    } = this.props;

    const classes = classNames('cardText', className);

    return (
      <div className={classes} {...otherProps}>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    );
  }
}

export default CardText;
