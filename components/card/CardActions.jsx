import React, { PropTypes, Component } from 'react';
import ClassNames from '../decorators/ClassNames';
import style from './style';

@ClassNames(style)
class CardActions extends Component {

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

    const classes = classNames('cardActions', className);

    return (
      <div className={classes} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default CardActions;
