import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames';
import style from './style';

class CardActions extends Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }

  render () {
    const {
      children,
      className,
      ...otherProps
    } = this.props;

    const classes = ClassNames(style.cardActions, className);

    return (
      <div className={classes} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default CardActions;
